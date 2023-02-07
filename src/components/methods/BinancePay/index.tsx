import { Button } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useCreateBinanceOrderMutation } from '../../../generated/apollo-gql';
import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const BinancePay: React.FC<Props> = ({ amount, setFormError }) => {
  const { t } = useTranslation();
  const [state, _dispatch, { onOrderCreated }] = useContext(Context);
  const [
    createBinanceOrder,
    { error, loading },
  ] = useCreateBinanceOrderMutation();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isMobile) {
      e.preventDefault();
      e.stopPropagation();
      const { data } = await createBinanceOrder({
        variables: {
          assetId: state.asset!.id!,
          orderAmount: amount,
          userId: state.userId,
        },
      });

      if (data?.createBinanceOrder?.map3OrderId) {
        onOrderCreated?.(data?.createBinanceOrder.map3OrderId, 'binance-pay');
      }

      if (data?.createBinanceOrder?.data?.universalUrl) {
        window.location.href = data.createBinanceOrder.data?.universalUrl;
      }
    }
  };

  useEffect(() => {
    if (error?.message) {
      setFormError(error.message);
    }
  }, [error?.message]);

  if (!state.method) {
    return null;
  }

  return (
    <div className="relative z-40 w-full">
      <div className="absolute top-[-98px] flex w-full flex-col items-center justify-center gap-1 border-primary-700 pt-2 text-xs font-normal dark:border-t dark:bg-primary-900">
        <div className="flex w-full items-center justify-between">
          <div>Fixed Fee:</div>
          <div>3% (0.30 BUSD)</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>Variable Fee:</div>
          <div>1% (0.10 BUSD)</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>Total Sent:</div>
          <div>100.00 BUSD</div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div>Total Received:</div>
          <div>99.60 BUSD</div>
        </div>
      </div>
      <Button
        block
        disabled={loading || !!error?.message || amount === '0'}
        htmlType="submit"
        loading={loading || state.account.status === 'loading'}
        onClick={handleClick}
        size="medium"
        type={'default'}
      >
        <span className="flex items-center gap-2">
          <MethodIcon method={state.method} /> {t('button.pay_via_binance')}
        </span>
      </Button>
    </div>
  );
};

type Props = {
  amount: string;
  setFormError: (error: string) => void;
};

export default BinancePay;
