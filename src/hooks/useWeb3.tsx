import { ethers } from 'ethers';
import { Maybe } from 'graphql/jsutils/Maybe';
import { useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { Context } from '../providers/Store';
import { erc20Abi } from '../utils/abis/erc20';
import { toHex } from '../utils/toHex';
import { buildTx, PrebuiltTx } from '../utils/transactions/evm';

export const useWeb3 = () => {
  const [state, _, { authorizeTransaction }] = useContext(Context);
  const [providers, setProviders] = useState<
    {
      [key in string]: boolean;
    }
  >({});

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

  // TODO: move this to a separate hook
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

  const getChainId = async () => {
    const chainId = await state.provider?.data?.send?.('eth_chainId', []);
    return Number(chainId);
  };

  const getTransaction = async (hash: string) => {
    if (!state.provider?.data) {
      throw new Error('No provider.');
    }

    return await state.provider?.data?.getTransaction(hash);
  };

  const getFeeData = async () => {
    if (!state.provider?.data) {
      throw new Error('No provider.');
    }

    return await state.provider.data.getFeeData();
  };

  const switchChain = async (chainId: number) => {
    await state.provider?.data?.send?.('wallet_switchEthereumChain', [
      {
        chainId: toHex(chainId),
      },
    ]);
  };

  const addChain = async () => {
    if (!state.network) {
      throw new Error('No network selected.');
    }

    if (!state.network.identifiers?.chainId) {
      throw new Error('No chainId.');
    }

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
        rpcUrls: [
          `${process.env.CONSOLE_API_URL}/rpcProxy?chainId=${state.network.identifiers?.chainId}`,
        ],
      },
    ];

    await state.provider?.data?.send?.('wallet_addEthereumChain', params);
  };

  const sendTransaction = async (amount: string, assetContract?: string) => {
    if (!state.account.data) {
      throw new Error('No account');
    }

    let hash;

    const decimals = state.asset?.decimals;

    if (!decimals) {
      throw new Error('No decimals.');
    }

    if (!state.prebuiltTx.data?.tx.to) {
      throw new Error('No recipient address.');
    }

    let finalTx = buildTx({
      address: state.prebuiltTx.data.tx.to,
      amount,
      assetContract,
      decimals,
      from: state.account.data,
      memo: state.prebuiltTx.data.memo,
    });

    try {
      if (isMobile && state.method?.walletConnect?.mobile?.native) {
        window.location.href = state.method?.walletConnect?.mobile?.native;
      }

      const gasParams =
        state.prebuiltTx.data?.maxFeePerGas &&
        state.prebuiltTx.data?.maxPriorityFeePerGas
          ? {
              maxFeePerGas: state.prebuiltTx.data?.maxFeePerGas.toHexString(),
              maxPriorityFeePerGas: state.prebuiltTx.data?.maxPriorityFeePerGas.toHexString(),
            }
          : {
              gasPrice: state.prebuiltTx.data?.gasPrice.toHexString(),
            };

      hash = await state.provider?.data?.send?.('eth_sendTransaction', [
        {
          ...finalTx,
          ...gasParams,
          gas: state.prebuiltTx.data?.gasLimit.toHexString(),
        },
      ]);
      if (!hash) {
        throw new Error('No transaction hash.');
      }

      return hash;
    } catch (e: any) {
      throw e;
    }
  };

  const waitForTransaction = async (hash: string, confirmations: number) => {
    if (!state.provider?.data) {
      throw new Error('No provider.');
    }

    const tx = await state.provider?.data?.waitForTransaction(
      hash,
      confirmations
    );
    return tx;
  };

  const estimateGas = async (tx: PrebuiltTx) => {
    if (!state.provider?.data) {
      throw new Error('No provider.');
    }

    return await state.provider.data.estimateGas(tx);
  };

  return {
    addChain,
    authorizeTransactionProxy,
    estimateGas,
    getBalance,
    getChainId,
    getFeeData,
    getTransaction,
    providers,
    sendTransaction,
    switchChain,
    waitForTransaction,
  };
};
