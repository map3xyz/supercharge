import { Button, Pill } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { posthog } from 'posthog-js';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BinancePayButton from 'url:../../assets/binance-pay-button.png';
import BinanceLogo from 'url:../../assets/binance-pay-logo.png';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import {
  Map3PlatformOrderStatus,
  useCreateBinanceOrderMutation,
  useQueryBinanceOrderLazyQuery,
} from '../../generated/apollo-gql';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';

const BinancePayFinalStatuses = [
  Map3PlatformOrderStatus.Paid,
  Map3PlatformOrderStatus.Canceled,
  Map3PlatformOrderStatus.Expired,
  Map3PlatformOrderStatus.Refunded,
  Map3PlatformOrderStatus.Refunding,
  Map3PlatformOrderStatus.Error,
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

    posthog.capture('BINANCE_PAY_ORDER_CREATED', {
      amount: state.tx.amount,
      asset: state.asset!.symbol,
    });

    if (data?.createBinanceOrder?.id) {
      onOrderCreated?.(data?.createBinanceOrder.id, 'binance-pay');
    }
  };

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    const poll = async () => {
      if (data?.createBinanceOrder?.id) {
        await queryBinanceOrder({
          pollInterval: 1500,
          variables: {
            id: data.createBinanceOrder.id,
          },
        });
        setIsPolling(true);
      }
    };

    poll();
  }, [data?.createBinanceOrder?.id]);

  useEffect(() => {
    if (
      queryData?.queryBinanceOrder?.status &&
      BinancePayFinalStatuses.includes(queryData?.queryBinanceOrder?.status)
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
        stacktrace={JSON.stringify(error, null, 2)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col items-center" ref={ref}>
      <InnerWrapper>
        <h3
          className="text-center text-lg font-semibold dark:text-white"
          data-testid="show-address-method"
        >
          {t('title.pay_via_binance')}
        </h3>
      </InnerWrapper>
      <InnerWrapper className="h-full">
        {loading && <LoadingWrapper message="Generating Address..." />}
        {data?.createBinanceOrder?.qrContent && (
          <div className="flex h-full w-full flex-col items-center justify-between gap-2 sm:text-sm">
            <div className="px-4 text-center text-sm font-bold text-primary-400 sm:text-xs">
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
                value={data?.createBinanceOrder.qrContent}
              />
            </div>
            <div className="w-full">
              <a
                className="w-full"
                href={data.createBinanceOrder.checkoutUrl!}
                target="_blank"
              >
                <Button block size="large" type={'default'}>
                  <img className="h-4" src={BinancePayButton} />
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
