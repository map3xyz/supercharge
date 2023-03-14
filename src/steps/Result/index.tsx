import lottie from 'lottie-web';
import React, { useContext, useEffect, useState } from 'react';

import tadaAnimation from '../../assets/lottie/tada.json';
import InnerWrapper from '../../components/InnerWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import { useBridgeProgress } from '../../hooks/useBridgeTransactionProgress';
import { useProviderTransactionProgress } from '../../hooks/useProviderTransactionProgress';
import { Context, TxSteps } from '../../providers/Store';
import BridgeQuoteTransactionDetails from './BridgeQuoteTransactionDetails';
import TransactionDetails from './TransactionDetails';

const Result: React.FC<Props> = () => {
  const [state, dispatch, { onFailure, onSuccess }] = useContext(Context);
  const [toggleDetails, setToggleDetails] = useState(false);
  const { run: runBridge } = useBridgeProgress();
  const { run: runProvider } = useProviderTransactionProgress();

  if (!state.asset || !state.network) {
    dispatch({ type: 'RESET_STATE' });
    return null;
  }

  useEffect(() => {
    if (
      state.tx.progress.DestinationNetwork.status === 'success' ||
      state.tx.progress.Confirmed.status === 'success'
    ) {
      onSuccess?.(
        state.tx.hash || '',
        state.network?.networkCode || '',
        state.asset?.address || undefined
      );

      const animation = lottie?.loadAnimation({
        animationData: tadaAnimation,
        autoplay: false,
        container: document.getElementById('tada')!,
        loop: false,
        renderer: 'svg',
      });
      animation?.play();
    } else if (
      state.tx.progress.DestinationNetwork.status === 'error' ||
      state.tx.progress.Confirmed.status === 'error'
    ) {
      onFailure?.(
        state.tx.progress.DestinationNetwork.data ||
          state.tx.progress.Confirmed.data ||
          '',
        state.network?.networkCode || '',
        state.asset?.address || undefined
      );
    }
  }, [state.tx.progress.DestinationNetwork, state.tx.progress.Confirmed]);

  useEffect(() => {
    if (state.network?.bridged) {
      runBridge();
    } else if (state.provider?.status === 'success' && state.account.data) {
      runProvider();
    }

    return () => {
      dispatch({
        type: 'RESET_TX',
      });
    };
  }, []);

  return (
    <div
      className="flex h-full flex-col items-center pt-3"
      data-testid="result"
    >
      <StateDescriptionHeader />
      <InnerWrapper
        className={`relative h-full transition-all ${
          toggleDetails ? 'h-0 p-0' : ''
        }`}
      >
        {state.tx.steps.map((step, i) => {
          return (
            <div
              className={`relative flex min-h-[56px] flex-col ${
                TxSteps[step] <= state.tx.step ? '' : 'opacity-50'
              }`}
              key={step}
            >
              <div className="flex flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-5 min-h-[1.25rem] w-5 items-center justify-center rounded-full border ${
                      state.tx.progress[step].status === 'success'
                        ? 'border-green-300 bg-green-300/50 text-green-700 dark:border-green-800 dark:bg-green-900/50 dark:text-green-500'
                        : state.tx.progress[step].status === 'error'
                        ? 'border-red-300 bg-red-300/50 text-red-700 dark:border-red-800 dark:bg-red-900/50 dark:text-red-500'
                        : 'border-gray-300 bg-gray-300/50 text-gray-700 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-500'
                    }`}
                  >
                    {state.tx.progress[step].status === 'success' && (
                      <i className="fas fa-check-circle text-xs" />
                    )}
                    {state.tx.progress[step].status === 'error' && (
                      <i className="fas fa-times-circle text-xs" />
                    )}
                    {state.tx.progress[step].status === 'loading' && (
                      <i className="fas fa-spinner animate-spin text-xs" />
                    )}
                  </div>
                  <div
                    className={`relative my-1 h-full w-[1px] opacity-50 ${
                      i === state.tx.steps.length - 1 ? 'hidden' : ''
                    } ${
                      TxSteps[step] < state.tx.step
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  ></div>
                </div>
                <div className="ml-2 mb-2 w-full">
                  <div className="flex items-center gap-1 text-sm font-semibold dark:text-white">
                    {state.tx.progress[step].title || step}
                  </div>
                  {state.tx.progress[step].status === 'success' ||
                  state.tx.progress[step].status === 'loading' ? (
                    <div className="whitespace-pre-wrap text-xs text-primary-500">
                      {state.tx.progress[step].data}
                    </div>
                  ) : state.tx.progress[step].status === 'error' ? (
                    <div className="text-xs text-red-500">
                      {state.tx.progress[step].data}
                    </div>
                  ) : null}
                </div>
              </div>
              <div
                className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
                id="tada"
              />
            </div>
          );
        })}
      </InnerWrapper>
      <div
        className={`relative w-full border-t border-primary-200 bg-primary-100 transition-all dark:border-primary-700 dark:bg-primary-800 ${
          toggleDetails && state.tx.hash
            ? 'layout-scrollbar h-full'
            : state.tx.hash
            ? 'h-[45px]'
            : 'hidden'
        }`}
        data-testid="transaction-details"
      >
        <div className="flex h-full flex-col justify-between">
          <InnerWrapper className="sticky top-0 z-20 border-b border-primary-200 bg-primary-100 dark:border-primary-700 dark:bg-primary-800">
            <div
              className={`flex cursor-pointer items-center justify-between text-sm font-semibold dark:text-white ${
                state.tx.hash ? 'opacity-100' : 'cursor-not-allowed opacity-20'
              }`}
              onClick={() =>
                state.tx.hash ? setToggleDetails((toggle) => !toggle) : null
              }
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
          </InnerWrapper>
          <InnerWrapper className="pt-0">
            {state.bridgeQuote ? (
              <BridgeQuoteTransactionDetails />
            ) : (
              <TransactionDetails />
            )}
          </InnerWrapper>
          <InnerWrapper className="w-full text-center">
            {state.tx.hash ? (
              <a
                className="text-xs text-blue-600 underline"
                href={`${state.network?.links?.explorer}/tx/${state.tx.hash}`}
                target="_blank"
              >
                View on Explorer
              </a>
            ) : null}
          </InnerWrapper>
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default Result;
