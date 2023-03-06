import { ethers } from 'ethers';
import lottie from 'lottie-web';
import React, { useContext, useEffect, useState } from 'react';

import tadaAnimation from '../../assets/lottie/tada.json';
import InnerWrapper from '../../components/InnerWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import {
  useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery,
  useSubscribeToBridgeTransactionMutation,
} from '../../generated/apollo-gql';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps, TxSteps } from '../../providers/Store';
import { listenToBridgeTransaction } from '../../utils/supabase';
import { FinalTx } from '../../utils/transactions/evm';
import BridgeQuoteTransactionDetails from './BridgeQuoteTransactionDetails';
import TransactionDetails from './TransactionDetails';

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

  const [
    subscribeToBridgeTransaction,
  ] = useSubscribeToBridgeTransactionMutation();

  if (!state.asset || !state.network) {
    dispatch({ type: 'RESET_STATE' });
    return null;
  }

  const startCountdown = () => {
    if (
      state.bridgeQuote?.estimate?.executionDurationSeconds &&
      state.tx.progress.DestinationNetwork.status !== 'success' &&
      state.tx.progress.DestinationNetwork.status !== 'error'
    ) {
      const originalTime = new Date().getTime();
      setInterval(() => {
        if (state.bridgeQuote?.estimate?.executionDurationSeconds) {
          const time = new Date().getTime();
          const executionDurationMilliseconds =
            state.bridgeQuote.estimate.executionDurationSeconds * 1000;
          const expiresAt = new Date(
            originalTime + executionDurationMilliseconds
          ).getTime();
          const millisecondsRemaining = expiresAt - time;

          const seconds = Math.floor((millisecondsRemaining / 1000) % 60);
          const minutes = Math.floor(
            (millisecondsRemaining / (1000 * 60)) % 60
          );
          const hours = Math.floor(
            (millisecondsRemaining / (1000 * 60 * 60)) % 24
          );
          const timeString = `${
            hours ? hours.toString().padStart(2, '0') + ':' : ''
          }${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
          dispatch({
            payload: {
              data: `Bridge transaction pending.${
                minutes > 0 ? `\nEstimated time remaining: ${timeString}` : ''
              }`,
              status: 'loading',
              step: 'DestinationNetwork',
              title: 'Processing Deposit',
            },
            type: 'SET_TX',
          });
        }
      }, 1000);
    }
  };

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
  }, [state.tx.progress]);

  useEffect(() => {
    const run = async () => {
      try {
        if (state.network?.bridged) {
          if (!state.bridgeQuote) {
            dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
            return;
          }

          // Change Step Titles
          dispatch({
            payload: {
              status: 'idle',
              step: 'DestinationNetwork',
              title: 'Processing Deposit',
            },
            type: 'SET_TX',
          });
          dispatch({
            payload: {
              status: 'idle',
              step: 'Confirming',
              title: 'Confirming Transaction',
            },
            type: 'SET_TX',
          });

          const bridgeOrderId = state.bridgeQuote.id as string;
          // If there is already a sourceChainTxId hash, we can skip approvals, and go straight to monitoring the bridge transaction
          if (state.tx.hash) {
            // update states
            dispatch({
              payload: {
                data: 'Token previously approved.',
                status: 'success',
                step: 'ApproveToken',
                title: 'Token Approved',
              },
              type: 'SET_TX',
            });
            dispatch({
              payload: {
                data:
                  'Transaction previously confirmed. Monitoring bridge transaction.',
                status: 'success',
                step: 'Confirming',
                title: 'Transaction Confirmed',
              },
              type: 'SET_TX',
            });
            if (
              state.bridgeTransaction?.state === 'quoted' ||
              state.bridgeTransaction?.state === 'subscribed'
            ) {
              dispatch({
                payload: {
                  status: 'loading',
                  step: 'DestinationNetwork',
                  title: 'Processing Deposit',
                },
                type: 'SET_TX',
              });
            } else if (state.bridgeTransaction?.state === 'completed') {
              dispatch({
                payload: {
                  data: 'Bridge transaction completed.',
                  status: 'success',
                  step: 'DestinationNetwork',
                  title: 'Deposit Complete',
                },
                type: 'SET_TX',
              });
            } else {
              dispatch({
                payload: {
                  data: 'Bridge transaction failed.',
                  status: 'error',
                  step: 'DestinationNetwork',
                  title: 'Deposit Failed',
                },
                type: 'SET_TX',
              });
            }
          } else {
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

            if (!state.bridgeQuote.id) {
              throw new Error('Bridge quote ID not found.');
            }

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
                step: 'Confirming',
                title: 'Confirming Transaction',
              },
              type: 'SET_TX',
            });
            let hash: string;
            try {
              hash = await sendFinalTransaction({
                ...(state.bridgeQuote.transaction as FinalTx),
                gas: state.bridgeQuote.transaction?.gasLimit as string,
              });
              await subscribeToBridgeTransaction({
                variables: { id: bridgeOrderId, txHash: hash },
              });
              dispatch({ payload: hash, type: 'SET_TX_HASH' });
            } catch (e: any) {
              dispatch({
                payload: {
                  data: 'Action denied.',
                  status: 'error',
                  step: 'Confirming',
                  title: 'Confirming Transaction',
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
                data: `Transaction submitted at ${new Date().toLocaleString()}.\nWaiting for transaction to be included in a block.`,
                status: 'loading',
                step: 'Confirming',
                title: 'Confirming Transaction',
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
                title: 'Transaction Confirming',
              },
              type: 'SET_TX',
            });
            startCountdown();
          }

          listenToBridgeTransaction(
            bridgeOrderId,
            (payload: WatchBridgeTransactionPayload) => {
              switch (payload.new.state) {
                // initial
                case 'completed':
                  dispatch({
                    payload: {
                      data: 'Bridge transaction finalized!',
                      status: 'success',
                      step: 'DestinationNetwork',
                      title: 'Deposit Processed',
                    },
                    type: 'SET_TX',
                  });
                  break;
                case 'failed':
                  dispatch({
                    payload: {
                      data: 'Bridge transaction failed.',
                      status: 'error',
                      step: 'DestinationNetwork',
                      title: 'Deposit Failed',
                    },
                    type: 'SET_TX',
                  });
              }
            }
          );
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
    <div className="flex h-full flex-col items-center pt-3">
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
        className={`layout-scrollbar relative w-full border-t border-primary-200 bg-primary-100 transition-all dark:border-primary-700 dark:bg-primary-800 ${
          toggleDetails && state.tx.hash
            ? 'h-full'
            : state.tx.hash
            ? 'h-[64px]'
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
