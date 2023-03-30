import { ReadOnlyText } from '@map3xyz/components';
import { ethers } from 'ethers';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { ISO_4217_TO_SYMBOL } from '../../../constants/iso4217';
import { Context } from '../../../providers/Store';
import { DECIMAL_FALLBACK } from '../../EnterAmount';

const BridgeQuoteTransactionDetails: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [state] = useContext(Context);

  if (!state.asset) {
    return null;
  }

  return (
    <>
      {state.bridgeQuote?.approval?.amount ? (
        <div>
          <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            {t('copy.amount_to_pay')}
          </div>
          <div className="text-sm font-medium dark:text-white sm:text-xs">
            <ReadOnlyText
              value={`${ethers.utils.formatUnits(
                state.bridgeQuote!.approval.amount,
                state.asset.decimals || DECIMAL_FALLBACK
              )} ${state.asset.symbol} (${
                ISO_4217_TO_SYMBOL['USD']
              }${state.bridgeQuote.estimate?.fromAmountUsd?.toFixed(2)})`}
            />
          </div>
        </div>
      ) : null}
      {state.bridgeQuote?.estimate?.gasCosts ? (
        <div>
          <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            {t('copy.gas_cost')}
          </div>
          <div className="text-sm font-medium dark:text-white sm:text-xs">
            <ReadOnlyText
              value={`${Number(state.bridgeQuote.estimate?.gasCosts)?.toFixed(
                6
              )} ${state.network?.symbol} (${
                ISO_4217_TO_SYMBOL['USD']
              }${state.bridgeQuote.estimate?.gasCostsUsd?.toFixed(2)})`}
            />
          </div>
        </div>
      ) : null}
      {state.bridgeQuote?.estimate?.amountToReceive ? (
        <div>
          <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            {t('copy.receive_amount')}
          </div>
          <div className="text-sm font-medium dark:text-white sm:text-xs">
            <ReadOnlyText
              value={`${state.bridgeQuote.estimate.amountToReceive} ${
                state.asset?.symbol
              } (${
                ISO_4217_TO_SYMBOL['USD']
              }${state.bridgeQuote.estimate.toAmountUsd?.toFixed(2)})`}
            />
          </div>
        </div>
      ) : null}
      {state.bridgeQuote?.id ? (
        <div>
          <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            Order ID
          </div>
          <div className="text-sm font-medium dark:text-white sm:text-xs">
            <ReadOnlyText copyButton value={state.bridgeQuote.id} />
          </div>
        </div>
      ) : null}
      {state.bridgeTransaction?.destinationChainTxId ? (
        <div>
          <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            Destination Chain Tx ID
          </div>
          <div className="text-sm font-medium dark:text-white sm:text-xs">
            <ReadOnlyText
              copyButton
              value={state.bridgeTransaction.destinationChainTxId}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

type Props = {};

export default BridgeQuoteTransactionDetails;
