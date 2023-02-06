import { Button } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { useCreateBinanceOrderMutation } from '../../../generated/apollo-gql';
import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const BinancePay: React.FC<Props> = ({ amount, setFormError }) => {
  const { t } = useTranslation();
  const [state] = useContext(Context);
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
  );
};

type Props = {
  amount: string;
  setFormError: (error: string) => void;
};

export default BinancePay;
