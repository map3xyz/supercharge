import { ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';

import {
  useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery,
  useSubscribeToBridgeTransactionMutation,
} from '../../../generated/apollo-gql';
import { useWeb3 } from '../../../hooks/useWeb3';
import { Context, Steps } from '../../../providers/Store';
import { iso8601ToDate } from '../../../utils/iso8601';
import { listenToBridgeTransaction } from '../../../utils/supabase';
import { FinalTx } from '../../../utils/transactions/evm';
import { timeToExpiration } from '../utils';

export const useBridgeProgress = () => {
  const [state, dispatch] = useContext(Context);
  const [timer, setTimer] = useState<NodeJS.Timer | undefined>(undefined);

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

  const startCountdown = () => {
    if (
      state.bridgeQuote?.estimate?.executionDurationSeconds &&
      state.tx.progress.DestinationNetwork.status !== 'success' &&
      state.tx.progress.DestinationNetwork.status !== 'error'
    ) {
      const created = state.bridgeTransaction?.created
        ? iso8601ToDate(state.bridgeTransaction?.created)
        : new Date();
      const originalTime = created.getTime();
      setTimer(
        setInterval(() => {
          if (
            state.tx.progress.DestinationNetwork.status === 'success' ||
            state.tx.progress.DestinationNetwork.status === 'error'
          )
            return;

          if (state.bridgeQuote?.estimate?.executionDurationSeconds) {
            const timeString = timeToExpiration(
              originalTime,
              state.bridgeQuote.estimate.executionDurationSeconds
            );
            dispatch({
              payload: {
                data: `Bridge transaction pending.${
                  timeString === '00:00'
                    ? ''
                    : `\nEstimated time remaining: ${timeString}`
                }`,
                status: 'loading',
                step: 'DestinationNetwork',
                title: 'Processing Deposit',
              },
              type: 'SET_TX',
            });
          }
        }, 1000)
      );
    }
  };

  const run = async () => {
    try {
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
          startCountdown();
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
            data: 'Transaction included in block ' + receipt.blockNumber + '.',
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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return { run };
};
