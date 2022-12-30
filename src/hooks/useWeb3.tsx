import { ethers } from 'ethers';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { CONSOLE_API_URL, GAS_LIMIT } from '../constants';
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

  useEffect(() => {
    if (state.provider?.status !== 'success') return;

    // @ts-ignore
    state.provider.data?.provider.on('chainChanged', (chainId) => {
      dispatch({ payload: chainId, type: 'SET_PROVIDER_CHAIN_ID' });
    });
  }, [state.provider?.data]);

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
    const currentChainId = await getChainID();

    if (
      state.network?.identifiers?.chainId &&
      Number(currentChainId) !== state.network?.identifiers?.chainId
    ) {
      throw new Error('Wrong network');
    }

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
    const chainId = await state.provider?.data?.provider?.request!({
      method: 'eth_chainId',
      params: [],
    });
    return chainId;
  };

  const switchChain = async (chainId: number) => {
    await state.provider?.data?.provider.request!({
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
      throw new Error('No network');
    }

    if (!state.network.identifiers?.chainId) {
      throw new Error('No chainId');
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

    await state.provider?.data?.provider.request!({
      method: 'wallet_addEthereumChain',
      params,
    });
  };

  const sendTransaction = async (
    amount: string,
    address: string,
    memo?: string,
    isErc20?: boolean,
    assetContract?: string | null
  ) => {
    if (!state.account.data) {
      throw new Error('No account');
    }

    if (isErc20 && !assetContract) {
      throw new Error('No asset contract');
    }

    const extraGas = memo ? (memo.length / 2) * 16 : 0;

    const txParams = {
      data: memo || '0x',
      from: state.account.data,
      gas: ethers.utils.hexlify(GAS_LIMIT + extraGas),
      to: address,
      value: ethers.utils.parseEther(amount).toHexString(),
    };

    if (isErc20) {
      txParams.data =
        new ethers.utils.Interface(erc20Abi).encodeFunctionData('transfer', [
          address,
          ethers.utils.parseUnits(amount, state.asset?.decimals!),
        ]) +
        (typeof memo === 'string' ? (memo as string).replace('0x', '') : '');

      txParams.to = assetContract!;
      txParams.value = '0x0';
      txParams.gas = ethers.utils.hexlify(100_000 + extraGas);
    }

    // @ts-ignore
    if (!isMobile && !state.method?.value === 'isWalletConnect') {
      dispatch({ type: 'SET_TRANSACTION_LOADING' });
    }
    let hash;
    try {
      hash = await state.provider?.data?.provider.request!({
        method: 'eth_sendTransaction',
        params: [txParams],
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
