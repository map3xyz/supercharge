import { ReadOnlyText } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { Context, Steps } from '../../providers/Store';

const Result: React.FC<Props> = () => {
  const [state, dispatch, { onFailure, onSuccess }] = useContext(Context);

  useEffect(() => {
    if (state.transaction?.status === 'success' && onSuccess) {
      onSuccess(
        state.asset?.symbol || '',
        state.network?.networkCode || '',
        state.transaction?.hash || ''
      );
    }
    if (state.transaction?.status === 'error') {
      onFailure?.(
        state.asset?.symbol || '',
        state.network?.networkCode || '',
        state.transaction.error || ''
      );
    }
  }, [state.transaction?.status]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      {state.transaction?.status === 'loading' ? (
        <LoadingWrapper message="Submitting Transaction..." />
      ) : state.transaction?.status === 'error' ? (
        <ErrorWrapper
          description="There was a problem submitting your transaction."
          header="Transaction Error"
          retry={() => {
            dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
          }}
          stacktrace={state.transaction?.error}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div></div>
          <div className="flex flex-col items-center gap-2 text-sm font-semibold text-neutral-500">
            <div>
              <i className="fa fa-check-circle text-green-600"></i>
            </div>
            <div>Transaction Submitted</div>
            <div className="w-full">
              <ReadOnlyText
                copyButton
                value={state.transaction?.hash || '0x1'}
              />
            </div>
          </div>
          <div>
            <a
              className="mb-2 block text-xs text-blue-600 underline"
              href=""
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: 'RESET_STATE' });
              }}
            >
              Start Over
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {};

export default Result;
