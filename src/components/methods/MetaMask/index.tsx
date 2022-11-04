import { Button } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';

import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const MetaMask: React.FC<Props> = ({ amount, disabled, setFormError }) => {
  const [state, dispatch] = useContext(Context);

  if (!state.method) return null;

  const connect = async () => {
    if (window.ethereum) {
      dispatch({ type: 'SET_ACCOUNT_LOADING' });
      const accounts: string[] | undefined = await window.ethereum.request({
        method: 'eth_accounts',
      });

      if (accounts && accounts[0]) {
        dispatch({ payload: accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
      } else {
        try {
          await window.ethereum.request({
            method: 'eth_requestAccounts',
          });
        } catch (e: any) {
          if (e.message !== 'User rejected the request.') return;

          dispatch({ payload: e.message, type: 'SET_ACCOUNT_ERROR' });
          setFormError(e.message);
        }
      }
    }
  };

  useEffect(() => {
    connect();

    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'mm_connect') {
        connect();
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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
        disabled ||
        (state.account.status === 'success' && Number(amount) === 0) ||
        state.account.status === 'loading'
      }
      htmlType="submit"
      loading={
        state.account.status === 'loading' ||
        state.depositAddress.status === 'loading'
      }
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
  disabled: boolean;
  setFormError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default MetaMask;
