import { Badge, CryptoAddress, ReadOnlyText } from '@map3xyz/components';
import React, { useContext, useEffect, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import MethodIcon from '../../components/MethodIcon';
import { Context, Steps, TransactionSteps } from '../../providers/Store';

const Result: React.FC<Props> = () => {
  const [state, dispatch, { onFailure, onSuccess }] = useContext(Context);
  const [toggleDetails, setToggleDetails] = useState(false);

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  useEffect(() => {
    const success = Object.keys(state.transaction.progress).every(
      (key) =>
        state.transaction.progress[key as unknown as TransactionSteps]
          ?.status === 'success'
    );
    const error = Object.keys(state.transaction.progress).find(
      (key) =>
        state.transaction.progress[key as unknown as TransactionSteps]
          ?.status === 'error'
    );

    if (success) {
      onSuccess?.(
        state.transaction.hash || '',
        state.network?.networkCode || '',
        state.asset?.address || undefined
      );
    } else if (error) {
      onFailure?.(
        state.transaction.progress[error as unknown as TransactionSteps].data ||
          '',
        state.network?.networkCode || '',
        state.asset?.address || undefined
      );
    }
  }, [state.transaction?.progress.Submitted?.status]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'RESET_TRANSACTION',
      });
    };
  }, []);

  return (
    <div className="flex h-full flex-col items-center">
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send{' '}
          <Badge color="blue" size="large">
            {state.asset?.symbol || ''}
          </Badge>{' '}
          on the {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.network?.name || ''} Network
          </Badge>{' '}
          via
          <Badge
            color={
              state.account.status === 'loading' ||
              state.account.status === 'idle'
                ? 'yellow'
                : state.account.status === 'error'
                ? 'red'
                : 'green'
            }
            dot
            size="large"
          >
            {/* @ts-ignore */}
            <span className="flex items-center gap-1">
              <MethodIcon method={state.method} /> {state.method.name}{' '}
              {state.account.status === 'success' && state.account.data ? (
                <CryptoAddress hint={false}>{state.account.data}</CryptoAddress>
              ) : (
                ''
              )}
            </span>
          </Badge>
        </div>
      </div>
      <InnerWrapper
        className={`h-full transition-all ${toggleDetails ? 'h-0 p-0' : ''}`}
      >
        {state.transaction.steps.map((step, i) => {
          return (
            <div
              className={`flex min-h-[42px] flex-col ${
                TransactionSteps[step] <= state.transaction.step
                  ? ''
                  : 'opacity-50'
              }`}
              key={step}
            >
              <div className="flex flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-5 min-h-[1.25rem] w-5 items-center justify-center rounded-full border ${
                      state.transaction.progress[step].status === 'success'
                        ? 'border-green-800 bg-green-900/50 text-green-500'
                        : state.transaction.progress[step].status === 'error'
                        ? 'border-red-800 bg-red-900/50 text-red-500'
                        : 'border-gray-600 bg-gray-600/50 text-gray-400'
                    }`}
                  >
                    {state.transaction.progress[step].status === 'success' && (
                      <i className="fas fa-check-circle text-xs" />
                    )}
                    {state.transaction.progress[step].status === 'error' && (
                      <i className="fas fa-times-circle text-xs" />
                    )}
                    {state.transaction.progress[step].status === 'loading' && (
                      <i className="fas fa-spinner animate-spin text-xs" />
                    )}
                  </div>
                  <div
                    className={`relative my-1 h-full w-[1px] opacity-50 ${
                      i === state.transaction.steps.length - 1 ? 'hidden' : ''
                    } ${
                      TransactionSteps[step] < state.transaction.step
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  ></div>
                </div>
                <div className="ml-2 mb-2 w-full">
                  <div className="text-sm font-semibold dark:text-white">
                    {step}
                  </div>
                  {state.transaction.progress[step].status === 'success' ||
                  state.transaction.progress[step].status === 'loading' ? (
                    <div className="text-xs text-neutral-500">
                      {state.transaction.progress[step].data}
                    </div>
                  ) : state.transaction.progress[step].status === 'error' ? (
                    <div className="text-xs text-red-500">
                      {state.transaction.progress[step].error}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </InnerWrapper>
      <InnerWrapper
        className={`relative border-t border-neutral-200 bg-neutral-100 transition-all dark:border-neutral-700 dark:bg-neutral-800 ${
          toggleDetails ? 'h-full' : 'h-[48px]'
        } ${
          state.transaction.response
            ? 'visible opacity-100'
            : 'invisible opacity-0'
        }`}
      >
        <>
          <div
            className="flex cursor-pointer items-center justify-between text-sm font-semibold dark:text-white"
            onClick={() => setToggleDetails((toggle) => !toggle)}
          >
            <div className="flex items-center gap-1">
              <i className="fa fa-receipt" />
              Transaction Details
            </div>
            <i
              className={`fa fa-chevron-up transition-transform ${
                toggleDetails ? 'rotate-180' : ''
              }`}
            />
          </div>
          <div className="mt-3 mb-0.5 text-xs font-semibold dark:text-white">
            Amount
          </div>
          <div className="text-xs font-medium dark:text-white">
            {state.transaction.amount}
          </div>
          <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
            From
          </div>
          <ReadOnlyText copyButton value={state.transaction.response?.from} />
          <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
            To
          </div>
          <ReadOnlyText copyButton value={state.transaction.response?.to} />
          {state.transaction.hash ? (
            <>
              <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
                Hash
              </div>
              <ReadOnlyText copyButton value={state.transaction.hash} />
            </>
          ) : null}
        </>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default Result;
