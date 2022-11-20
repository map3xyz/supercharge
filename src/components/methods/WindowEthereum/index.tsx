import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
} from 'react';

import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

export type ConnectHandler = {
  connect: () => void;
};

const WindowEthereum = forwardRef<ConnectHandler, Props>(
  ({ amount, disabled, setFormError }, connectRef) => {
    const [state, dispatch] = useContext(Context);

    const connect = async () => {
      dispatch({ type: 'SET_PROVIDER_LOADING' });
      const providers = window.ethereum?.providers;
      const selectedProvider = providers?.find(
        (x: any) => x[state.method!.value!]
      );

      if (
        (!window.ethereum || !window.ethereum[state.method!.value!]) &&
        !selectedProvider
      ) {
        dispatch({ payload: 'No provider found.', type: 'SET_ACCOUNT_ERROR' });
        dispatch({ payload: 'No provider found.', type: 'SET_PROVIDER_ERROR' });
        setFormError(`Please download the ${state.method!.name} extension.`);

        return;
      }

      const web3Provider = new ethers.providers.Web3Provider(
        selectedProvider || window.ethereum
      );
      dispatch({ payload: web3Provider, type: 'SET_PROVIDER_SUCCESS' });

      if (web3Provider?.provider) {
        dispatch({ type: 'SET_ACCOUNT_LOADING' });
        // @ts-ignore
        web3Provider.provider.on(
          'accountsChanged',
          async (accounts: string[]) => {
            if (accounts && accounts[0]) {
              dispatch({ payload: accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
            } else {
              dispatch({ type: 'SET_ACCOUNT_IDLE' });
            }
          }
        );

        const accounts = await web3Provider.send('eth_accounts', []);

        if (accounts && accounts[0]) {
          dispatch({ payload: accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
        } else {
          try {
            const requestedAccounts = await web3Provider.send(
              'eth_requestAccounts',
              []
            );
            if (requestedAccounts && requestedAccounts[0]) {
              dispatch({
                payload: requestedAccounts[0],
                type: 'SET_ACCOUNT_SUCCESS',
              });
            }
          } catch (e: any) {
            if (
              e.message === 'User rejected the request.' ||
              e.message === 'User denied account authorization'
            ) {
              dispatch({ payload: e.message, type: 'SET_ACCOUNT_ERROR' });
              setFormError(e.message);
            } else {
              console.log(e);
            }
          }
        }
      }
    };

    useImperativeHandle(connectRef, () => ({
      connect: () => {
        connect();
      },
    }));

    useEffect(() => {
      connect();

      return () => dispatch({ type: 'SET_PROVIDER_IDLE' });
    }, []);

    if (!state.method || !state.method.value) return null;

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
          (state.account.status === 'error' &&
            state.account.data === 'No provider found.') ||
          (state.account.status === 'success' && amount === 0) ||
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
  }
);

type Props = {
  amount: number;
  disabled: boolean;
  setFormError: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default WindowEthereum;
