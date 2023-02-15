import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import { AnimatePresence, motion } from 'framer-motion';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useTranslation } from 'react-i18next';

import { ISO_4217_TO_SYMBOL } from '../../../constants/iso4217';
import { CreateBridgeQuoteMutation } from '../../../generated/apollo-gql';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context } from '../../../providers/Store';
import {
  DECIMAL_FALLBACK,
  DOWNLOAD_EXTENSION,
  SubmitHandler,
} from '../../../steps/EnterAmount';
import MethodIcon from '../../MethodIcon';

const WindowEthereum = forwardRef<SubmitHandler, Props>(
  (
    {
      amount,
      bridgeQuote,
      disabled,
      isConfirming,
      loading,
      setFormError,
      setIsConfirming,
    },
    submitRef
  ) => {
    const { t } = useTranslation();
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
          {isConfirming && bridgeQuote && (
            <motion.div
              animate={{ transform: 'translateY(calc(-100%)' }}
              className="absolute flex w-full flex-col items-center justify-center gap-1 py-2 text-xs font-normal dark:bg-primary-900"
              exit={{ opacity: 0, transform: 'translateY(100%)' }}
              initial={{ transform: 'translateY(100%)' }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div
                className="mb-2 flex items-center justify-center"
                draggable
                onClick={() => setIsConfirming(false)}
                onDragEnd={() => setIsConfirming(false)}
              >
                <span className="h-1.5 w-8 rounded-lg bg-primary-200 dark:bg-primary-400"></span>
              </div>
              <div className="flex w-full items-center justify-between">
                <div>{t('copy.amount_to_pay')}:</div>
                <div>
                  {Number(amount).toFixed(
                    Math.min(6, state.asset?.decimals || DECIMAL_FALLBACK)
                  )}{' '}
                  {state.asset?.symbol} (~{ISO_4217_TO_SYMBOL['USD']}
                  {bridgeQuote.prepareBridgeQuote?.estimate?.fromAmountUsd?.toFixed(
                    2
                  )}
                  )
                </div>
              </div>
              {bridgeQuote.prepareBridgeQuote?.transaction?.gasPrice &&
                bridgeQuote.prepareBridgeQuote.transaction.gasLimit && (
                  <div className="flex w-full items-center justify-between">
                    <div>{t('copy.gas_cost')}:</div>
                    <div>
                      <>
                        {Number(
                          ethers.utils.formatUnits(
                            ethers.BigNumber.from(
                              // TODO: format on backend
                              bridgeQuote.prepareBridgeQuote.estimate?.gasCosts?.toString()
                            ).toString(),
                            state.network?.decimals || DECIMAL_FALLBACK
                          )
                        ).toFixed(6)}{' '}
                        {state.network?.symbol} (~{ISO_4217_TO_SYMBOL['USD']}
                        {bridgeQuote.prepareBridgeQuote.estimate?.gasCostsUsd?.toFixed(
                          2
                        )}
                        )
                      </>
                    </div>
                  </div>
                )}
              {bridgeQuote.prepareBridgeQuote?.estimate?.amountToReceive ? (
                <div className="flex w-full items-center justify-between">
                  <div>{t('copy.receive_amount')}:</div>
                  <div>
                    {ethers.utils.formatUnits(
                      ethers.BigNumber.from(
                        bridgeQuote.prepareBridgeQuote.estimate.amountToReceive
                      ),
                      state.asset?.decimals || DECIMAL_FALLBACK
                    )}{' '}
                    {state.asset?.symbol} (~{ISO_4217_TO_SYMBOL['USD']}
                    {bridgeQuote.prepareBridgeQuote.estimate.toAmountUsd?.toFixed(
                      2
                    )}
                    )
                  </div>
                </div>
              ) : null}
            </motion.div>
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

type Props = {
  amount: string;
  bridgeQuote: CreateBridgeQuoteMutation | null | undefined;
  disabled: boolean;
  isConfirming: boolean;
  loading?: boolean;
  setFormError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
};

export default WindowEthereum;
