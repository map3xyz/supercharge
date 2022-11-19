import { Button } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../../providers/Store';
import MethodIcon from '../../MethodIcon';

const WalletConnect: React.FC<Props> = ({ amount, disabled }) => {
  const [state] = useContext(Context);

  if (!state.method || !state.method.value) return null;

  let cta = 'Confirm Payment';

  switch (state.account.status) {
    case 'loading':
      cta = 'Connecting...';
      break;
    case 'error':
    case 'idle':
      cta = 'Connect Wallet';
      break;
  }

  return (
    <Button
      block
      disabled={
        disabled ||
        (state.account.status === 'error' &&
          state.account.data === 'No provider found.') ||
        (state.account.status === 'success' && amount === 0) ||
        state.account.status === 'loading'
      }
      htmlType="submit"
      loading={
        state.connector?.waiting ||
        state.account.status === 'loading' ||
        state.depositAddress.status === 'loading'
      }
      size="medium"
      type={'default'}
    >
      <span className="flex items-center gap-2">
        <MethodIcon method={state.method} />
        {cta}
      </span>
    </Button>
  );
};

type Props = {
  amount: number;
  disabled: boolean;
};

export default WalletConnect;
