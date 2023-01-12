import { Button } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const WalletConnect: React.FC<Props> = ({ amount, disabled }) => {
  const [state] = useContext(Context);

  if (!state.method || !state.method.value) return null;

  return (
    <Button
      block
      disabled={
        disabled ||
        (state.account.status === 'error' &&
          state.account.data === 'No provider found.') ||
        (state.account.status === 'success' && amount === '0') ||
        state.account.status === 'loading'
      }
      htmlType="submit"
      loading={state.account.status === 'loading'}
      size="medium"
      type={'default'}
    >
      <span className="flex items-center gap-2">
        <MethodIcon method={state.method} />
        Confirm Payment
      </span>
    </Button>
  );
};

type Props = {
  amount: string;
  disabled: boolean;
};

export default WalletConnect;
