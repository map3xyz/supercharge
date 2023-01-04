import { ethers } from 'ethers';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { CONSOLE_API_URL } from '../constants';
import { Context, Steps } from '../providers/Store';
import { erc20Abi } from '../utils/abis/erc20';
import { toHex } from '../utils/toHex';

export const useWeb3 = () => {
  const [state, dispatch, { authorizeTransaction }] = useContext(Context);
  const [providers, setProviders] = useState<{
    [key in string]: boolean;
  }>({});

  useEffect(() => {
    if (window.ethereum?.providers) {
      return setProviders(
        Object.keys(window.ethereum.providers).reduce((acc, key) => {
          if (window.ethereum.providers[key].isMetaMask) {
            acc.isMetaMask = true;
          }
          if (window.ethereum.providers[key].isCoinbaseWallet) {
            acc.isCoinbaseWallet = true;
          }
          return acc;
        }, {} as { [key in string]: boolean })
      );
    }

    if (window.ethereum?.isMetaMask) {
      return setProviders({ isMetaMask: true });
    }

    if (window.ethereum?.isCoinbaseWallet) {
      return setProviders({ isCoinbaseWallet: true });
    }

    return setProviders({});
  }, []);

  const authorizeTransactionProxy = async (
    fromAddress?: string,
    network?: Maybe<string> | undefined,
    amount?: string
  ) => {
    if (!fromAddress || !network || !amount) {
      throw new Error('Unable to authorize transaction.');
    }
    let isAuth: Boolean = true;
    if (authorizeTransaction && typeof authorizeTransaction === 'function') {
      isAuth = await authorizeTransaction(fromAddress, network, amount);
    }

    if (!isAuth) {
      throw new Error('Unable to authorize transaction.');
    }

    return isAuth;
  };

  const getBalance = async (
    address?: string | null
  ): Promise<{
    assetBalance: ethers.BigNumber;
    chainBalance: ethers.BigNumber;
  }> => {
    let assetBalance = ethers.BigNumber.from(0);
    if (address) {
      const contract = new ethers.Contract(
        address,
        new ethers.utils.Interface(erc20Abi),
        state.provider?.data
      );
      assetBalance = await contract.balanceOf(state.account.data);
    }
    const chainBalance =
      (await state.provider?.data?.getBalance(state.account.data || '')) ||
      ethers.BigNumber.from(0);

    return { assetBalance, chainBalance };
  };

  const getChainID = async () => {
    const chainId = await state.provider?.data?.provider?.request?.({
      method: 'eth_chainId',
      params: [],
    });
    return chainId;
  };

  const switchChain = async (chainId: number) => {
    await state.provider?.data?.provider.request?.({
      method: 'wallet_switchEthereumChain',
      params: [
        {
          chainId: toHex(chainId),
        },
      ],
    });
  };

  const addChain = async () => {
    if (!state.network) {
      throw new Error('No network selected.');
    }

    if (!state.network.identifiers?.chainId) {
      throw new Error('No Chain ID.');
    }

    const rpcs: { [key in number]: any } = await fetch(
      (process.env.CONSOLE_API_URL || CONSOLE_API_URL) + '/chainlistRPCs'
    ).then((res) => res.json());

    const params = [
      {
        blockExplorerUrls: [state.network.links?.explorer],
        chainId: toHex(state.network.identifiers.chainId),
        chainName: state.network.name,
        nativeCurrency: {
          decimals: state.network.decimals,
          name: state.network.name,
          symbol: state.network.symbol,
        },
        rpcUrls: rpcs[state.network.identifiers.chainId].rpcs,
      },
    ];

    await state.provider?.data?.provider.request?.({
      method: 'wallet_addEthereumChain',
      params,
    });
  };

  const sendTransaction = async (amount: string) => {
    if (!state.account.data) {
      throw new Error('No account');
    }

    // @ts-ignore
    if (!isMobile && !state.method?.value === 'isWalletConnect') {
      dispatch({ type: 'SET_TRANSACTION_LOADING' });
    }
    let hash;
    try {
      hash = await state.provider?.data?.provider?.request?.({
        method: 'eth_sendTransaction',
        params: [
          {
            ...state.prebuiltTx.data?.tx,
            gas: state.prebuiltTx.data?.gasLimit.toString(16),
            gasPrice: state.prebuiltTx.data?.gasPrice.toString(16),
            value: ethers.utils.parseEther(amount).toHexString(),
          },
        ],
      });
      if (!hash) {
        throw new Error('No transaction hash.');
      }

      dispatch({ type: 'SET_TRANSACTION_LOADING' });
      dispatch({ payload: Steps.Result, type: 'SET_STEP' });
      await state.provider?.data?.waitForTransaction(hash, 1);
    } catch (e: any) {
      dispatch({ payload: e.message, type: 'SET_TRANSACTION_ERROR' });
      throw e;
    }
    dispatch({ payload: hash, type: 'SET_TRANSACTION_SUCCESS' });
  };

  return {
    addChain,
    authorizeTransactionProxy,
    getBalance,
    getChainID,
    providers,
    sendTransaction,
    switchChain,
  };
};
