import { ReadOnlyText } from '@map3xyz/components';
import { ethers } from 'ethers';
import lottie from 'lottie-web';
import React, { useContext, useEffect, useState } from 'react';

import tadaAnimation from '../../assets/lottie/tada.json';
import InnerWrapper from '../../components/InnerWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import { MIN_CONFIRMATIONS } from '../../constants';
import { useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery } from '../../generated/apollo-gql';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps, TxSteps } from '../../providers/Store';
import { FinalTx } from '../../utils/transactions/evm';

const Result: React.FC<Props> = () => {
  const [state, dispatch, { onFailure, onSuccess }] = useContext(Context);
  const [toggleDetails, setToggleDetails] = useState(false);

  const {
    approveTokenAllowance,
    getTokenAllowance,
    getTransaction,
    sendFinalTransaction,
    waitForTransaction,
  } = useWeb3();

  const [
    getAssetMappedAssetIdAndNetworkCodeQueryLazy,
  ] = useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery();

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  useEffect(() => {
    const success = Object.keys(state.tx.progress).every(
      (key) =>
        state.tx.progress[(key as unknown) as TxSteps]?.status === 'success'
    );
    const error = Object.keys(state.tx.progress).find(
      (key) =>
        state.tx.progress[(key as unknown) as TxSteps]?.status === 'error'
    );

    if (success) {
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
    } else if (error) {
      onFailure?.(
        state.tx.progress[(error as unknown) as TxSteps].data || '',
        state.network?.networkCode || '',
        state.asset?.address || undefined
      );
    }
  }, [
    state.tx.progress.Submitted.status,
    state.tx?.progress.Confirmed?.status,
  ]);

  useEffect(() => {
    const run = async () => {
      try {
        if (state.network?.bridged) {
          if (!state.bridgeQuote) {
            // send user back to Enter Amount?
            throw new Error('Bridge quote not found.');
          }

          const {
            data: fromAsset,
          } = await getAssetMappedAssetIdAndNetworkCodeQueryLazy({
            variables: {
              mappedAssetId: state.asset?.id!,
              networkCode: state.network?.networkCode!,
            },
          });

          const allowance = await getTokenAllowance(
            fromAsset?.assetByMappedAssetIdAndNetworkCode?.address,
            state.bridgeQuote.transaction?.to
          );

          if (!state.bridgeQuote.transaction?.to) {
            throw new Error('Bridge contract not found.');
          }

          if (!state.bridgeQuote.approval?.amount) {
            throw new Error('Approval amount not found.');
          }

          if (!fromAsset?.assetByMappedAssetIdAndNetworkCode?.address) {
            throw new Error('Asset address not found.');
          }

          if (allowance.lt(state.bridgeQuote.approval?.amount)) {
            dispatch({
              payload: {
                data: `Please approve the token on ${state.method?.name}.`,
                status: 'loading',
                step: 'ApproveToken',
                title: 'Awaiting Approval',
              },
              type: 'SET_TX',
            });
            try {
              const hash = await approveTokenAllowance(
                fromAsset?.assetByMappedAssetIdAndNetworkCode?.address,
                state.bridgeQuote.transaction?.to,
                ethers.BigNumber.from(state.bridgeQuote.approval?.amount)
              );
              dispatch({
                payload: {
                  data: `Waiting for the approval transaction to complete.`,
                  status: 'loading',
                  step: 'ApproveToken',
                  title: 'Awaiting Approval',
                },
                type: 'SET_TX',
              });
              await waitForTransaction(hash, 1);
              dispatch({
                payload: {
                  data: `Token approved on ${state.method?.name}.`,
                  status: 'success',
                  step: 'ApproveToken',
                  title: 'Token Approved',
                },
                type: 'SET_TX',
              });
            } catch (e: any) {
              dispatch({
                payload: {
                  data: `Action denied on ${state.method?.name}.`,
                  status: 'error',
                  step: 'ApproveToken',
                  title: 'Awaiting Approval',
                },
                type: 'SET_TX',
              });
              return;
            }
          } else {
            dispatch({
              payload: {
                data: `Token approved for spending.`,
                status: 'success',
                step: 'ApproveToken',
                title: 'Token Approved',
              },
              type: 'SET_TX',
            });
          }

          dispatch({
            payload: {
              data: `Please confirm the transaction on ${state.method?.name}.`,
              status: 'loading',
              step: 'Submitted',
              title: 'Awaiting Submission',
            },
            type: 'SET_TX',
          });
          let hash: string;
          try {
            hash = await sendFinalTransaction({
              ...(state.bridgeQuote.transaction as FinalTx),
              gas: state.bridgeQuote.transaction?.gasLimit as string,
            });
            dispatch({ payload: hash, type: 'SET_TX_HASH' });
            dispatch({
              payload: {
                data: `Transaction submitted at ${new Date().toLocaleString()}.`,
                status: 'success',
                step: 'Submitted',
                title: 'Submitted',
              },
              type: 'SET_TX',
            });
          } catch (e: any) {
            dispatch({
              payload: {
                data: 'Action denied.',
                status: 'error',
                step: 'Submitted',
                title: 'Submitted',
              },
              type: 'SET_TX',
            });
            return;
          }

          if (!hash) {
            throw new Error('Transaction hash not found.');
          }

          dispatch({
            payload: {
              data: 'Waiting for transaction to be included in a block.',
              status: 'loading',
              step: 'Confirming',
            },
            type: 'SET_TX',
          });
          let response;
          while (!response) {
            response = await getTransaction(hash);
          }
          dispatch({ payload: response, type: 'SET_TX_RESPONSE' });
          const receipt = await waitForTransaction(hash, 1);
          dispatch({
            payload: {
              data:
                'Transaction included in block ' + receipt.blockNumber + '.',
              status: 'success',
              step: 'Confirming',
            },
            type: 'SET_TX',
          });
          dispatch({
            payload: {
              data: `Waiting for ${MIN_CONFIRMATIONS} confirmations.`,
              status: 'loading',
              step: 'Confirmed',
            },
            type: 'SET_TX',
          });
          await waitForTransaction(hash, MIN_CONFIRMATIONS);
          dispatch({
            payload: {
              data: 'From Transaction confirmed.',
              status: 'success',
              step: 'Confirmed',
            },
            type: 'SET_TX',
          });
        }
      } catch (e) {
        console.error(e);
      }
    };

    run();

    return () => {
      dispatch({
        type: 'RESET_TX',
      });
    };
  }, []);

  return (
    <div className="flex h-full flex-col items-center">
      <div className="border-b border-primary-200 dark:border-primary-700 dark:bg-primary-900">
        <StateDescriptionHeader />
      </div>
      <InnerWrapper
        className={`relative h-full transition-all ${
          toggleDetails ? 'h-0 p-0' : ''
        }`}
      >
        {state.tx.steps.map((step, i) => {
          return (
            <div
              className={`flex min-h-[56px] flex-col ${
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
                    <div className="text-xs text-primary-500">
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
      <InnerWrapper
        className={`relative border-t border-primary-200 bg-primary-100 transition-all dark:border-primary-700 dark:bg-primary-800 ${
          toggleDetails && state.tx.hash
            ? 'h-full'
            : state.tx.hash
            ? 'h-[48px]'
            : 'hidden'
        }`}
        data-testid="transaction-details"
      >
        <div className="flex h-full flex-col justify-between">
          <div>
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
            <div className="mt-3 mb-0.5 text-xs font-semibold dark:text-white">
              Amount
            </div>
            <div className="text-xs font-medium dark:text-white">
              <ReadOnlyText value={state.tx.amount} />
            </div>
            {state.tx.response ? (
              <>
                <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
                  From
                </div>
                <ReadOnlyText copyButton value={state.tx.response?.from} />
                <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
                  To
                </div>
                <ReadOnlyText copyButton value={state.tx.response?.to} />
              </>
            ) : null}
            {state.tx.hash ? (
              <>
                <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
                  Hash
                </div>
                <ReadOnlyText copyButton value={state.tx.hash} />
              </>
            ) : null}
          </div>
          <div className="w-full text-center">
            {state.tx.hash ? (
              <a
                className="text-xs text-blue-600 underline"
                href={`${state.network?.links?.explorer}/tx/${state.tx.hash}`}
                target="_blank"
              >
                View on Explorer
              </a>
            ) : null}
          </div>
        </div>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default Result;
