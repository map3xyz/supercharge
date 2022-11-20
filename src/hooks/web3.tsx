import { ethers } from 'ethers';
import { useContext } from 'react';

import { Context } from '../providers/Store';

export const useWeb3 = () => {
  const [state] = useContext(Context);

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
    if (state.method?.value === 'isWalletConnect') {
      await state.connector?.data?.sendTransaction(txParams);
    } else {
      await state.provider?.data?.send('eth_sendTransaction', [txParams]);
    }
  };

  return { getChainID, sendTransaction, switchChain };
};
