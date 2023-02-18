import React, { useContext } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';

const OrderHistory: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <InnerWrapper>
        <button
          className="group flex items-center gap-2 text-sm dark:text-white"
          onClick={() => {
            dispatch({
              payload: state.prevSteps,
              type: 'SET_STEPS',
            });
            dispatch({
              payload: Steps[state.prevSteps[state.prevStep]],
              type: 'SET_STEP',
            });
          }}
        >
          <i className="fa fa-arrow-left text-primary-400 dark:group-hover:text-white" />
          Go Back
        </button>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default OrderHistory;
