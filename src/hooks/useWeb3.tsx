import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../providers/Store';

export const useWeb3 = () => {
  const [state, dispatch] = useContext(Context);
  const [providers, setProviders] = useState<{
    [key in string]: boolean;
  }>({});

  useEffect(() => {
    if (window.ethereum?.providers) {
      return setProviders(
        Object.keys(window.ethereum.providers).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as { [key in string]: boolean })
      );
    }

    if (window.ethereum?.isMetaMask) {
      return setProviders({ MetaMask: true });
    }

    if (window.ethereum?.isCoinbaseWallet) {
      return setProviders({ CoinbaseWallet: true });
    }

    return setProviders({});
  }, []);

  const getChainID = async () => {
    if (state.method?.value === 'isWalletConnect') {
      return state.connector?.data?.chainId;
    } else {
      return await state.provider?.data?.send('eth_chainId', []);
    }
  };

  const switchChain = async (chainId: number) => {
    if (state.method?.value === 'isWalletConnect') {
      await state.connector?.data?.sendCustomRequest({
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: ethers.utils.hexlify(chainId),
          },
        ],
      });
    } else {
      await state.provider?.data?.send('wallet_switchEthereumChain', [
        {
          chainId: ethers.utils.hexlify(chainId),
        },
      ]);
    }
  };

  const sendTransaction = async (txParams: any) => {
    dispatch({ type: 'SET_TRANSACTION_LOADING' });
    let hash;
    if (state.method?.value === 'isWalletConnect') {
      try {
        hash = await state.connector?.data?.sendTransaction(txParams);
      } catch (e: any) {
        dispatch({ payload: e.message, type: 'SET_TRANSACTION_ERROR' });
      }
    } else {
      try {
        hash = await state.provider?.data?.send('eth_sendTransaction', [
          txParams,
        ]);
      } catch (e: any) {
        dispatch({ payload: e.message, type: 'SET_TRANSACTION_ERROR' });
        throw e;
      }
    }
    dispatch({ payload: hash, type: 'SET_TRANSACTION_SUCCESS' });
  };

  return { getChainID, providers, sendTransaction, switchChain };
};
