import { Badge, Button, Divider, Pill } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import BinanceLogo from 'url:../../assets/binance-pay.png';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import MethodIcon from '../../components/MethodIcon';
import {
  useCreateBinanceOrderMutation,
  useQueryBinanceOrderLazyQuery,
} from '../../generated/apollo-gql';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';

const BinancePayFinalStatuses = [
  'PAID',
  'CANCELED',
  'ERROR',
  'REFUNDING',
  'REFUNDED',
  'EXPIRED',
];

const BinancePay: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [
    createBinanceOrder,
    { data, error, loading },
  ] = useCreateBinanceOrderMutation();
  const [isPolling, setIsPolling] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useModalSize(ref);

  const [
    queryBinanceOrder,
    { data: queryData, stopPolling },
  ] = useQueryBinanceOrderLazyQuery();

  const stopPoll = () => {
    setIsPolling(false);
    stopPolling();
  };

  const run = async () => {
    await createBinanceOrder({
      variables: {
        assetId: state.asset!.id!,
        orderAmount: Number(state.tx.amount),
        userId: state.userId,
      },
    });
  };

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    const poll = async () => {
      if (data?.createBinanceOrder?.data?.prepayId) {
        await queryBinanceOrder({
          pollInterval: 1500,
          variables: {
            prepayId: data.createBinanceOrder.data.prepayId,
          },
        });
        setIsPolling(true);
      }
    };

    poll();
  }, [data?.createBinanceOrder?.data?.prepayId]);

  useEffect(() => {
    if (queryData?.queryBinanceOrder?.status === 'FAILED') {
      stopPoll();
    }
    if (
      queryData?.queryBinanceOrder?.data?.status &&
      BinancePayFinalStatuses.includes(
        queryData?.queryBinanceOrder?.data?.status
      )
    ) {
      stopPoll();
    }
  }, [queryData?.queryBinanceOrder]);

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center" ref={ref}>
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
      {data?.createBinanceOrder?.data?.qrContent ? (
        <InnerWrapper className="flex h-full flex-col justify-between">
          {data?.createBinanceOrder?.data?.qrContent ? (
            <div className="flex h-full flex-col justify-between">
              <div className="flex w-full flex-col items-center justify-between gap-2 text-sm">
                <div className="mb-2 px-8 text-center text-xs font-bold text-neutral-400">
                  Scan the QR code with the Binance app to pay.
                </div>
                {isPolling && (
                  <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                  >
                    <Pill
                      color="yellow"
                      icon={<i className="fa fa-spinner animate-spin" />}
                    >
                      Monitoring for deposits.
                    </Pill>
                  </motion.div>
                )}
                <QRCodeSVG
                  bgColor={state.theme === 'dark' ? '#000000' : '#FFFFFF'}
                  className="rounded-lg"
                  fgColor={state.theme === 'dark' ? '#FFFFFF' : '#000000'}
                  imageSettings={{
                    excavate: true,
                    height: 20,
                    src: BinanceLogo,
                    width: 20,
                  }}
                  includeMargin={true}
                  size={width ? width - 160 : 0}
                  style={{
                    border:
                      state.theme === 'dark'
                        ? '1px solid #404040'
                        : '1px solid #e5e5e5',
                  }}
                  value={data?.createBinanceOrder?.data?.qrContent}
                />
              </div>
              <div>
                <div className="mb-1 flex items-center justify-center">
                  <span className="text-xs font-bold text-neutral-400">Or</span>
                </div>
                <a
                  href={data.createBinanceOrder.data.checkoutUrl!}
                  target="_blank"
                >
                  <Button block size="medium" type={'default'}>
                    <span className="flex items-center gap-2">
                      <MethodIcon method={state.method} /> Pay on Binance.com
                    </span>
                  </Button>
                </a>
              </div>
            </div>
          ) : null}
        </InnerWrapper>
      ) : loading ? (
        <InnerWrapper className="h-full">
          <LoadingWrapper message="Creating Order..." />
        </InnerWrapper>
      ) : null}
    </div>
  );
};

type Props = {};

export default BinancePay;
