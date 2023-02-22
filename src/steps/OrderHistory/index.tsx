import React, { useContext } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';

const OrderHistory: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div className="flex h-full flex-col">
      <InnerWrapper className="!pt-0">
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="order-history"
        >
          Order History
        </h3>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default OrderHistory;
