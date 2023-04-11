import { Badge, Button } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import { posthog } from 'posthog-js';
import React, {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';
import BinancePayButton from 'url:../../../assets/binance-pay-button.png';

import { useCreateBinanceOrderMutation } from '../../../generated/apollo-gql';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context, Steps } from '../../../providers/Store';
import { DECIMAL_FALLBACK, SubmitHandler } from '../../../steps/EnterAmount';

const BinancePay = forwardRef<SubmitHandler, Props>(
  (
    { amount, isConfirming, setFormError, setIsConfirming, usdRate, usdtRate },
    submitRef
  ) => {
    const { t } = useTranslation();
    const [
      state,
      dispatch,
      { handleOrderFeeCalculation, onOrderCreated },
    ] = useContext(Context);
    const [isFeeLoading, setIsFeeLoading] = useState(false);
    const [feeData, setFeeData] = useState<{
      fixedFee?: number;
      message?: string;
      totalAmountMinusFee?: number;
      totalFee?: number;
      variableFee?: number;
    }>({});
    const [
      createBinanceOrder,
      { error, loading },
    ] = useCreateBinanceOrderMutation();
    const ref = useRef<HTMLDivElement>(null);
    useOnClickOutside(ref, () => setIsConfirming(false));

    const handleSubmit = async (e?: React.MouseEvent<HTMLButtonElement>) => {
      if (!isConfirming) {
        setIsFeeLoading(true);
        const feeData = await handleOrderFeeCalculation?.(
          state.asset!.symbol!,
          state.network!.networkCode!,
          amount
        );
        try {
          if (
            feeData &&
            (feeData.message || feeData.fixedFee || feeData.variableFee)
          ) {
            if (feeData.fixedFee && typeof feeData.fixedFee !== 'number') {
              throw new Error('Fixed fee is not a number');
            }
            if (
              feeData.variableFee &&
              typeof feeData.variableFee !== 'number'
            ) {
              throw new Error('Variable fee is not a number');
            }
            if (feeData.message && typeof feeData.message !== 'string') {
              throw new Error('Message is not a string');
            }
            const variableFee = Number(amount) * (feeData.variableFee || 0);
            const totalFee = (feeData.fixedFee || 0) + variableFee;
            const totalAmountMinusFee = Number(amount) - totalFee;

            setFeeData({ ...feeData, totalAmountMinusFee, totalFee });
            setIsFeeLoading(false);
            setIsConfirming(true);
            return;
          }
        } catch (e) {
          console.error(e);
        }

        setIsFeeLoading(false);
      }

      // triangulate amount to usd to usdt
      const usdAmount = Number(amount) * usdRate;
      const usdtAmount = usdAmount * usdtRate;
      const usdtString = usdtAmount.toFixed(6);

      if (isMobile) {
        e?.preventDefault();
        e?.stopPropagation();

        const { data } = await createBinanceOrder({
          variables: {
            assetId: state.asset!.id!,
            orderAmount: usdtString,
            userId: state.userId,
          },
        });

        posthog.capture('BINANCE_PAY_ORDER_CREATED', {
          amount: usdtString,
          asset: state.asset!.symbol,
        });

        if (data?.createBinanceOrder?.id) {
          onOrderCreated?.(data?.createBinanceOrder.id, 'binance-pay');
        }

        if (data?.createBinanceOrder?.universalUrl) {
          window.location.href = data.createBinanceOrder.universalUrl;
        }
      } else {
        dispatch({ payload: usdtString, type: 'SET_TX_AMOUNT' });
        dispatch({ payload: Steps.BinancePay, type: 'SET_STEP' });
      }
    };

    useEffect(() => {
      if (error?.message) {
        setFormError(error.message);
      }
    }, [error?.message]);

    useEffect(() => {
      setIsConfirming(false);
    }, [amount]);

    useImperativeHandle(submitRef, () => ({
      submit: () => {
        handleSubmit();
      },
    }));

    if (!state.method) {
      return null;
    }

    const feeIsGreaterThanReceiveAmount = feeData.totalAmountMinusFee
      ? feeData.totalAmountMinusFee <= 0
      : false;

    return (
      <div className="relative z-40 w-full" ref={ref}>
        <AnimatePresence>
          {isConfirming && (
            <motion.div
              animate={{ transform: 'translateY(calc(-100%)' }}
              className="absolute flex w-full flex-col items-center justify-center gap-1 py-2 text-sm font-normal dark:bg-primary-900 sm:text-xs"
              exit={{ opacity: 0, transform: 'translateY(100%)' }}
              initial={{ transform: 'translateY(100%)' }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <div
                className="mb-2 flex items-center justify-center"
                draggable
                onClick={() => setIsConfirming(false)}
                onDragEnd={() => setIsConfirming(false)}
              >
                <span className="h-1.5 w-8 rounded-lg bg-primary-200 dark:bg-primary-400"></span>
              </div>
              {feeData.message && (
                <div className="mb-1 flex w-full font-bold dark:text-primary-400">
                  {feeData.message}
                </div>
              )}
              <div className="flex w-full items-center justify-between">
                <div>{t('copy.amount_to_pay')}:</div>
                <div>
                  {Number(amount).toFixed(
                    Math.min(6, state.asset?.decimals || DECIMAL_FALLBACK)
                  )}{' '}
                  {state.asset?.symbol}
                </div>
              </div>
              {(feeData.fixedFee || feeData.variableFee) && (
                <div className="flex w-full items-center justify-between">
                  <div>
                    {t('copy.payment_fee')}
                    {feeData.fixedFee && feeData.variableFee ? (
                      <>
                        {' '}
                        <span
                          aria-label={`(${
                            (feeData.variableFee || 0) * 100
                          }% + ${feeData.fixedFee} ${state.asset?.symbol})`}
                          className="hint--top"
                        >
                          <i className="fa-solid fa-circle-info dark:text-white"></i>
                        </span>
                      </>
                    ) : null}
                    :
                  </div>
                  <div>
                    {feeData.totalFee?.toFixed(
                      Math.min(6, state.asset?.decimals || DECIMAL_FALLBACK)
                    )}{' '}
                    {state.asset?.symbol}
                  </div>
                </div>
              )}
              {feeData.totalAmountMinusFee !== undefined ? (
                <>
                  {feeData.fixedFee || feeData.variableFee ? (
                    <div
                      className={`flex w-full items-center justify-between font-bold ${
                        feeData.totalAmountMinusFee! <= 0 ? 'text-red-600' : ''
                      }`}
                    >
                      <div>{t('copy.receive_amount')}:</div>
                      <div>
                        {feeData.totalAmountMinusFee?.toFixed(
                          Math.min(6, state.asset?.decimals || DECIMAL_FALLBACK)
                        )}{' '}
                        {state.asset?.symbol}
                      </div>
                    </div>
                  ) : null}
                  {feeData.totalAmountMinusFee <= 0 ? (
                    // @ts-ignore
                    <div className="my-1">
                      <Badge color="red" dot>
                        {t('copy.total_receive_less_than_zero')}
                      </Badge>
                    </div>
                  ) : null}
                </>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          block
          data-testid="binance-pay-button"
          disabled={
            loading ||
            isFeeLoading ||
            !!error?.message ||
            amount === '0' ||
            feeIsGreaterThanReceiveAmount
          }
          htmlType="submit"
          loading={
            loading || isFeeLoading || state.account.status === 'loading'
          }
          size="large"
          type={'default'}
        >
          <img className="h-4" src={BinancePayButton} />
        </Button>
      </div>
    );
  }
);

type Props = {
  amount: string;
  isConfirming: boolean;
  setFormError: (error: string) => void;
  setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
  usdRate: number;
  usdtRate: number;
};

export default BinancePay;
