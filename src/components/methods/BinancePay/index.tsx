import { Button } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const BinancePay: React.FC<Props> = ({ amount }) => {
  const [state] = useContext(Context);

  if (!state.method) {
    return null;
  }

  return (
    <Button
      block
      disabled={amount === '0'}
      htmlType="submit"
      loading={state.account.status === 'loading'}
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
};

export default BinancePay;
