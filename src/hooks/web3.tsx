import { ethers } from 'ethers';
import { useContext } from 'react';

import { Context, Steps } from '../providers/Store';

const NO_CONNECTOR = 'No connector found.';
const NO_PROVIDER = 'No provider found.';

export const useWeb3 = () => {
  const [state, dispatch] = useContext(Context);

  const getChainID = async () => {
    if (!state.method) {
      dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
      return;
    }
    if (state.method.value === 'isWalletConnect') {
      if (!state.connector?.data) {
        throw new Error(NO_CONNECTOR);
      }
      return state.connector.data.chainId;
    } else {
      if (!state.provider?.data) {
        throw new Error(NO_PROVIDER);
      }
      return await state.provider.data.send('eth_chainId', []);
    }
  };

  const switchChain = async (chainId: number) => {
    if (!state.method) {
      dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
      return;
    }
    if (state.method.value === 'isWalletConnect') {
      if (!state.connector?.data) {
        throw new Error(NO_CONNECTOR);
      }
      await state.connector.data.sendCustomRequest({
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: ethers.utils.hexlify(chainId),
          },
        ],
      });
    } else {
      if (!state.provider?.data) {
        throw new Error(NO_PROVIDER);
      }
      await state.provider.data.send('wallet_switchEthereumChain', [
        {
          chainId: ethers.utils.hexlify(chainId),
        },
      ]);
    }
  };

  const sendTransaction = async (txParams: any) => {
    if (!state.method) {
      dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
      return;
    }
    if (state.method.value === 'isWalletConnect') {
      if (!state.connector?.data) {
        throw new Error(NO_CONNECTOR);
      }
      await state.connector.data.sendTransaction(txParams);
    } else {
      if (!state.provider?.data) {
        throw new Error(NO_PROVIDER);
      }
      await state.provider.data.send('eth_sendTransaction', [txParams]);
    }
  };

  return { getChainID, sendTransaction, switchChain };
};
