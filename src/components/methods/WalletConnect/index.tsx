import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import { AnimatePresence } from 'framer-motion';
import React, { useContext, useEffect, useRef } from 'react';

import useOnClickOutside from '../../../hooks/useOnClickOutside';
import { Context } from '../../../providers/Store';
import { DECIMAL_FALLBACK } from '../../../steps/EnterAmount';
import BridgeQuoteConfirmation from '../../confirmations/BridgeQuoteConfirmation';
import MethodIcon from '../../MethodIcon';
import { EvmMethodProviderProps } from '../types';

const WalletConnect: React.FC<Props> = ({
  amount,
  disabled,
  isConfirming,
  loading,
  setIsConfirming,
}) => {
  const [state] = useContext(Context);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setIsConfirming(false));

  useEffect(() => {
    setIsConfirming(false);
  }, [amount]);

  if (!state.method || !state.method.value) return null;

  let cta = isConfirming ? 'Finalize Payment' : 'Confirm Payment';

  return (
    <div className="relative z-40 w-full" ref={ref}>
      <AnimatePresence>
        {isConfirming && state.bridgeQuote && (
          <BridgeQuoteConfirmation
            amount={ethers.utils
              .formatUnits(
                state.bridgeQuote.approval?.amount || 0,
                state.asset?.decimals || DECIMAL_FALLBACK
              )
              .toString()}
            setIsConfirming={setIsConfirming}
          />
        )}
      </AnimatePresence>
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
        loading={loading || state.account.status === 'loading'}
        size="large"
        type={'default'}
      >
        <span className="flex items-center gap-2">
          <MethodIcon method={state.method} />
          {cta}
        </span>
      </Button>
    </div>
  );
};

type Props = EvmMethodProviderProps;

export default WalletConnect;
