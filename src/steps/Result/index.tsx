import React, { useContext } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { Context, Steps } from '../../providers/Store';

const Result: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div className="flex flex-col items-center justify-center">
      {state.transaction?.status === 'loading' ? (
        <LoadingWrapper message="Submitting Transaction..." />
      ) : state.transaction?.status === 'error' ? (
        <ErrorWrapper
          description="There was a problem submitting your transaction."
          header="Transaction Failed"
          retry={() => {
            dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
          }}
        />
      ) : state.transaction?.status === 'success' ? (
        <div className="flex flex-col">
          <div>Transaction Submitted</div>
          <div>{state.transaction.hash}</div>
        </div>
      ) : null}
    </div>
  );
};

type Props = {};

export default Result;
