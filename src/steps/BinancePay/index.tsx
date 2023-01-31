import { Badge } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { useCreateOrderMutation } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';

const BinancePay: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    const run = async () => {
      try {
        await createOrder({
          variables: {
            assetId: state.asset!.id!,
            orderAmount: Number(state.tx.amount),
          },
        });
      } catch (e) {
        console.error(e);
      }
    };

    run();
  }, []);

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3 className="text-lg font-semibold dark:text-white">
            Pay via Binance
          </h3>
        </InnerWrapper>

        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.requiredAmount} {state.asset?.symbol || ''}
          </Badge>{' '}
          on the {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.network?.networkName || ''}
          </Badge>
        </div>
      </div>
      <InnerWrapper>Binance Pay Link Here</InnerWrapper>
    </div>
  );
};

type Props = {};

export default BinancePay;
