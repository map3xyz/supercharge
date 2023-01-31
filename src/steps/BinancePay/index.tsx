import { Badge } from '@map3xyz/components';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useCreateOrderMutation } from '../../generated/apollo-gql';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';

const BinancePay: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [createOrder, { data, error, loading }] = useCreateOrderMutation();
  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useModalSize(ref);

  const run = async () => {
    await createOrder({
      variables: {
        assetId: state.asset!.id!,
        orderAmount: Number(state.tx.amount),
      },
    });
  };

  useEffect(() => {
    run();
  }, []);

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  return (
    <div
      className="flex h-full flex-col items-center justify-between"
      ref={ref}
    >
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3 className="text-lg font-semibold dark:text-white">
            Pay via Binance
          </h3>
        </InnerWrapper>

        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.tx.amount} {state.asset?.symbol || ''}
          </Badge>{' '}
          on the {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.network?.networkName || ''}
          </Badge>
        </div>
      </div>
      {error ? (
        <ErrorWrapper
          description="We were unable to create your order. Please try again."
          header="Error Creating Order"
          retry={run}
          stacktrace={error.message}
        />
      ) : null}
      <InnerWrapper className="h-full">
        {data?.createOrder?.data?.qrContent ? (
          <div className="flex w-full justify-center">
            <QRCodeSVG
              bgColor={state.theme === 'dark' ? '#262626' : '#FFFFFF'}
              className="rounded-lg"
              fgColor={state.theme === 'dark' ? '#FFFFFF' : '#000000'}
              includeMargin={true}
              size={width ? width - 160 : 0}
              style={{
                border:
                  state.theme === 'dark'
                    ? '1px solid #404040'
                    : '1px solid #e5e5e5',
              }}
              value={data?.createOrder?.data?.qrContent}
            />
          </div>
        ) : loading ? (
          <LoadingWrapper message="Creating Order" />
        ) : null}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default BinancePay;
