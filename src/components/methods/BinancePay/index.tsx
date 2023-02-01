import { Button } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';
import { isMobile } from 'react-device-detect';

import { useCreateBinanceOrderMutation } from '../../../generated/apollo-gql';
import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const BinancePay: React.FC<Props> = ({ amount, setFormError }) => {
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
          orderAmount: Number(amount),
        },
      });

      if (data?.createBinanceOrder?.data?.deeplink) {
        window.location.href = data.createBinanceOrder.data?.deeplink;
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
        <MethodIcon method={state.method} /> Pay via Binance
      </span>
    </Button>
  );
};

type Props = {
  amount: string;
  setFormError: (error: string) => void;
};

export default BinancePay;
