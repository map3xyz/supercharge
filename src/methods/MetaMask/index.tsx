import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import React, { useContext, useEffect } from 'react';

import MethodIcon from '../../components/MethodIcon';
import { Context } from '../../providers/Store';

const MetaMask: React.FC<Props> = ({ amount }) => {
  const [state, dispatch] = useContext(Context);

  if (!state.method) return null;

  const connect = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      let accounts = await provider.listAccounts();

      if (!accounts.length) {
        try {
          dispatch({ type: 'SET_ACCOUNT_LOADING' });
          await provider.send('eth_requestAccounts', []);
        } catch (e: any) {
          if (e.message !== 'User rejected the request.') return;

          dispatch({
            payload: {
              message: e.message,
              title: 'MetaMask Connection Error',
              variant: 'danger',
            },
            type: 'DISPLAY_ALERT',
          });

          dispatch({ payload: e.message, type: 'SET_ACCOUNT_ERROR' });
        }
      } else {
        dispatch({ payload: accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
      }
    }
  };

  useEffect(() => {
    const listen = async () => {
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', async (accounts: string[]) => {
          if (accounts[0]) {
            dispatch({ payload: accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
          } else {
            dispatch({ type: 'SET_ACCOUNT_IDLE' });
          }
        });
      }
    };
    listen();
  }, []);

  useEffect(() => {
    connect();

    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'mm_connect') {
        connect();
      }
    });

    return () => {
      window.removeEventListener('message', (event) => {
        if (event.data && event.data.type === 'mm_connect') {
          connect();
        }
      });
    };
  }, []);

  let cta = 'Confirm Payment';

  switch (state.account.status) {
    case 'loading':
      cta = 'Connecting...';
      break;
    case 'error':
    case 'idle':
      cta = 'Connect Wallet';
      break;
  }

  return (
    <Button
      block
      disabled={
        (state.account.status === 'success' && Number(amount) === 0) ||
        state.account.status === 'loading'
      }
      htmlType="submit"
      size="medium"
      type={'default'}
    >
      <span className="flex items-center gap-2">
        <MethodIcon method={state.method} />
        {cta}
      </span>
    </Button>
  );
};

type Props = {
  amount: number;
};

export default MetaMask;
