import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../providers/Store';
import { erc20Abi } from '../utils/abis/erc20';

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
    const chainIdHex = '0x' + Number(chainId).toString(16);
    if (state.method?.value === 'isWalletConnect') {
      await state.connector?.data?.sendCustomRequest({
        jsonrpc: '2.0',
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: chainIdHex,
          },
        ],
      });
    } else {
      await state.provider?.data?.send('wallet_switchEthereumChain', [
        { chainId: chainIdHex },
      ]);
    }
  };

  const sendTransaction = async (
    amount: number,
    address: string,
    memo?: string,
    isErc20?: boolean
  ) => {
    if (!state.account.data) {
      throw new Error('No account');
    }

    const extraGas = memo ? (memo.length / 2) * 16 : 0;

    const txParams = {
      data: memo || '0x',
      from: state.account.data,
      gas: ethers.utils.hexlify(21000 + extraGas),
      to: address,
      value: ethers.utils.parseEther(amount.toString()).toHexString(),
    };

    if (isErc20) {
      txParams.data = new ethers.utils.Interface(erc20Abi).encodeFunctionData(
        'transfer',
        [
          address,
          ethers.utils.parseUnits(
            amount.toString().split('.')[0] +
              amount.toString().split('.')[1].slice(0, state.asset?.decimals!),
            state.asset?.decimals!
          ),
        ]
      );
      txParams.value = '0x0';
      txParams.gas = ethers.utils.hexlify(100000 + extraGas);
    }

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

  return {
    getChainID,
    providers,
    sendTransaction,
    switchChain,
  };
};
