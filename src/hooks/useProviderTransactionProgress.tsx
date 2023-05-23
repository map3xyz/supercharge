import { useContext } from 'react';

import { MIN_CONFIRMATIONS } from '../constants';
import { useGetAssetByMappedAssetIdAndNetworkCodeQuery } from '../generated/apollo-gql';
import { Context } from '../providers/Store';
import { useWeb3 } from './useWeb3';

export const useProviderTransactionProgress = () => {
  const [state, dispatch] = useContext(Context);

  const {
    getTransaction,
    prepareFinalTransaction,
    sendFinalTransaction,
    waitForTransaction,
  } = useWeb3();

  const { data } = useGetAssetByMappedAssetIdAndNetworkCodeQuery({
    skip: state.asset?.type !== 'asset',
    variables: {
      mappedAssetId: state.asset?.config?.mappedAssetId,
      networkCode: state.network?.networkCode,
    },
  });

  const run = async () => {
    if (!state.tx.amount) {
      dispatch({
        payload: {
          data: `Unable to prepare final transaction.`,
          status: 'error',
          step: 'Submitted',
          title: 'Awaiting Submission',
        },
        type: 'SET_TX',
      });
      return;
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

    const finalTx = await prepareFinalTransaction(
      state.tx.amount,
      data?.assetByMappedAssetIdAndNetworkCode?.address
    );
    let hash;
    try {
      hash = await sendFinalTransaction(finalTx);
    } catch (e: any) {
      dispatch({
        payload: {
          data: e?.message ? e.message : `Unable to submit transaction.`,
          status: 'error',
          step: 'Submitted',
          title: 'Awaiting Submission',
        },
        type: 'SET_TX',
      });
      return;
    }
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
    await waitForTransaction(hash, 1);
    dispatch({
      payload: {
        data: 'Has reached a block confirmation.',
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
        data: '🚀 Transaction confirmed!',
        status: 'success',
        step: 'Confirmed',
      },
      type: 'SET_TX',
    });
  };

  return { run };
};
