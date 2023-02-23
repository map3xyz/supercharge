import { Badge } from '@map3xyz/components';
import { motion } from 'framer-motion';
import React, { useContext } from 'react';

import { useGetBridgeTransactionsByUserIdQuery } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';
import { ANIMATION_VARIANTS } from '../../steps';
import { BgOffsetWrapper } from '../BgOffsetWrapper';

const OrderHistoryRow: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { prevSteps, step, stepInView, steps } = state;

  const { data, error, loading } = useGetBridgeTransactionsByUserIdQuery({
    variables: {
      id: state.userId,
    },
  });

  if (!data || loading || error) return null;
  if (!data.getBridgeTransactionsByUserId.length) return null;

  return steps[step] !== Steps[Steps.OrderHistory] &&
    prevSteps[stepInView] !== Steps[Steps.OrderHistory] ? (
    <motion.div
      animate="visible"
      exit="exit"
      initial="hidden"
      variants={ANIMATION_VARIANTS}
    >
      {/* create a new component that fetches user id order history for org */}
      <BgOffsetWrapper
        border="y"
        className="group mt-3 cursor-pointer !py-2"
        onClick={() => {
          dispatch({
            payload: [...steps, 'OrderHistory'],
            type: 'SET_STEPS',
          });
          dispatch({
            payload: Steps.OrderHistory,
            type: 'SET_STEP',
          });
        }}
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-normal">Active Orders</div>
          <div className="flex items-center gap-2">
            <Badge color="blue" dot>
              {data.getBridgeTransactionsByUserId?.length.toString()}
            </Badge>
            <i className="fa fa-long-arrow-right transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400 dark:group-hover:text-primary-400" />
          </div>
        </div>
      </BgOffsetWrapper>
    </motion.div>
  ) : null;
};

type Props = {};

export default OrderHistoryRow;
