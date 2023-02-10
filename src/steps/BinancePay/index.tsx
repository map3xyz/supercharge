import { Button, Pill } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  'paid',
  'canceled',
  'error',
  'refunding',
  'refunded',
  'expired',
];

const BinancePay: React.FC<Props> = () => {
  const [state, dispatch, { onOrderCreated }] = useContext(Context);
  const [
    createBinanceOrder,
    { data, error, loading },
  ] = useCreateBinanceOrderMutation();
  const [isPolling, setIsPolling] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const { width } = useModalSize(ref);
  const { t } = useTranslation();

  const [
    queryBinanceOrder,
    { data: queryData, stopPolling },
  ] = useQueryBinanceOrderLazyQuery();

  const stopPoll = () => {
    setIsPolling(false);
    stopPolling();
  };

  const run = async () => {
    if (!state.asset || !state.tx.amount || !state.userId) {
      return;
    }
    const { data } = await createBinanceOrder({
      variables: {
        assetId: state.asset!.id!,
        orderAmount: state.tx.amount,
        userId: state.userId,
      },
    });

    if (data?.createBinanceOrder?.map3OrderId) {
      onOrderCreated?.(data?.createBinanceOrder.map3OrderId, 'binance-pay');
    }
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
    if (queryData?.queryBinanceOrder?.status === 'failed') {
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

  if (error) {
    return (
      <ErrorWrapper
        description="We were unable to create your order. Please try again."
        header="Error Creating Order"
        retry={run}
        stacktrace={JSON.stringify(error)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center" ref={ref}>
      <InnerWrapper className="!pt-0">
        <h3
          className="text-center text-lg font-semibold dark:text-white"
          data-testid="show-address-method"
        >
          {t('title.pay_via_binance')}
        </h3>
      </InnerWrapper>
      <InnerWrapper className="h-full">
        {loading && <LoadingWrapper message="Generating Address..." />}
        {data?.createBinanceOrder?.data?.qrContent && (
          <div className="flex h-full w-full flex-col items-center justify-between gap-2 text-sm">
            <div className="px-4 text-center text-xs font-bold text-primary-400">
              {t('copy.scan_binance_qr_code')}
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
                  {t('copy.monitoring_for_deposits')}
                </Pill>
              </motion.div>
            )}
            <div className="flex w-full justify-center">
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
            <div className="w-full">
              <a
                className="w-full"
                href={data.createBinanceOrder.data.checkoutUrl!}
                target="_blank"
              >
                <Button block size="medium" type={'default'}>
                  <span className="flex items-center gap-2">
                    <MethodIcon method={state.method} />{' '}
                    {t('copy.pay_on_binance_com')}
                  </span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default BinancePay;
