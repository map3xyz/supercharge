import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ISO_4217_TO_SYMBOL } from '../../../constants/iso4217';
import { Context } from '../../../providers/Store';
import { DECIMAL_FALLBACK } from '../../../steps/EnterAmount';

const BridgeQuoteConfirmation: React.FC<Props> = ({
  amount,
  setIsConfirming,
}) => {
  const { t } = useTranslation();
  const [state] = useContext(Context);

  const { bridgeQuote } = state;

  if (!bridgeQuote) return null;

  return (
    <AnimatePresence>
      <motion.div
        animate={{ transform: 'translateY(calc(-100%)' }}
        className="absolute flex w-full flex-col items-center justify-center gap-1 py-2 text-xs font-normal dark:bg-primary-900"
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
        <div className="flex w-full items-center justify-between">
          <div>{t('copy.amount_to_pay')}:</div>
          <div>
            {Number(amount).toFixed(
              Math.min(6, state.asset?.decimals || DECIMAL_FALLBACK)
            )}{' '}
            {state.asset?.symbol} ({ISO_4217_TO_SYMBOL['USD']}
            {bridgeQuote.estimate?.fromAmountUsd})
          </div>
        </div>
        {bridgeQuote.estimate?.gasCosts && (
          <div className="flex w-full items-center justify-between">
            <div>{t('copy.gas_cost')}:</div>
            <div>
              <>
                {Number(bridgeQuote.estimate?.gasCosts)?.toFixed(6)}{' '}
                {state.network?.symbol} ({ISO_4217_TO_SYMBOL['USD']}
                {bridgeQuote.estimate?.gasCostsUsd?.toFixed(2)})
              </>
            </div>
          </div>
        )}
        {bridgeQuote.estimate?.feeCosts && (
          <div className="flex w-full items-center justify-between">
            <div>{t('copy.fee_cost')}:</div>
            <div>
              <>
                {Number(bridgeQuote.estimate?.feeCosts)?.toFixed(6)}{' '}
                {state.network?.symbol} ({ISO_4217_TO_SYMBOL['USD']}
                {bridgeQuote.estimate?.feeCostsUsd?.toFixed(2)})
              </>
            </div>
          </div>
        )}
        {bridgeQuote.estimate?.amountToReceive ? (
          <div className="flex w-full items-center justify-between font-semibold">
            <div>{t('copy.receive_amount')}:</div>
            <div>
              {Number(bridgeQuote.estimate.amountToReceive).toFixed(6)}{' '}
              {state.asset?.symbol} ({ISO_4217_TO_SYMBOL['USD']}
              {bridgeQuote.estimate.toAmountUsd?.toFixed(2)})
            </div>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

type Props = {
  amount: string;
  setIsConfirming: React.Dispatch<React.SetStateAction<boolean>>;
};

export default BridgeQuoteConfirmation;
