import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import { AnimatePresence } from 'framer-motion';
import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context } from '../../../providers/Store';
import {
  DECIMAL_FALLBACK,
  DOWNLOAD_EXTENSION,
  SubmitHandler,
} from '../../../steps/EnterAmount';
import BridgeQuoteConfirmation from '../../confirmations/BridgeQuoteConfirmation';
import MethodIcon from '../../MethodIcon';
import { EvmMethodProviderProps } from '../types';

const WindowEthereum = forwardRef<SubmitHandler, Props>(
  (
    { amount, disabled, isConfirming, loading, setFormError, setIsConfirming },
    submitRef
  ) => {
    const [state, dispatch] = useContext(Context);
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setIsConfirming(false));

    const submit = async () => {
      dispatch({ type: 'SET_PROVIDER_LOADING' });
      const providers = window.ethereum?.providers;
      const selectedProvider = providers?.find(
        (x: any) => x[state.method?.value!]
      );

      if (
        (!window.ethereum || !window.ethereum[state.method?.value!]) &&
        !selectedProvider
      ) {
        dispatch({ payload: 'No provider found.', type: 'SET_ACCOUNT_ERROR' });
        dispatch({ payload: 'No provider found.', type: 'SET_PROVIDER_ERROR' });
        setFormError(DOWNLOAD_EXTENSION);

        return;
      }

      const web3Provider = new ethers.providers.Web3Provider(
        selectedProvider || window.ethereum,
        'any'
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
            }
          }
        }
      }
    };

    useEffect(() => {
      setIsConfirming(false);
    }, [amount]);

    useImperativeHandle(submitRef, () => ({
      submit: () => {
        submit();
      },
    }));

    useEffect(() => {
      submit();
    }, []);

    if (!state.method || !state.method?.value) return null;

    let cta = isConfirming ? 'Finalize Payment' : 'Confirm Payment';

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
      <div className="relative z-40 w-full" ref={ref}>
        <AnimatePresence>
          {isConfirming && state.bridgeQuote && (
            <BridgeQuoteConfirmation
              amount={ethers.utils
                .formatUnits(
                  state.bridgeQuote.approval?.amount || 0,
                  state.asset?.decimals || DECIMAL_FALLBACK
                )
                .toString()}
              setIsConfirming={setIsConfirming}
            />
          )}
        </AnimatePresence>
        <Button
          block
          disabled={
            disabled ||
            (state.account.status === 'error' &&
              state.account.data === 'No provider found.') ||
            (state.account.status === 'success' && amount === '0') ||
            state.account.status === 'loading'
          }
          htmlType="submit"
          loading={loading || state.account.status === 'loading'}
          size="large"
          type={'default'}
        >
          <span className="flex items-center gap-2">
            <MethodIcon method={state.method} />
            {cta}
          </span>
        </Button>
      </div>
    );
  }
);

type Props = EvmMethodProviderProps;

export default WindowEthereum;
