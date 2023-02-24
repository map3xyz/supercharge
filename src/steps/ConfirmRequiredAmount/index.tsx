import { Button } from '@map3xyz/components';
import React, { useContext, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import InnerWrapper from '../../components/InnerWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import { Context, Steps } from '../../providers/Store';

const ConfirmRequiredAmount: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const { t } = useTranslation();

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="border-b border-primary-200 dark:border-primary-700 dark:bg-primary-900">
        <InnerWrapper>
          <h3 className="text-lg font-semibold dark:text-white">
            {t('title.confirm_amount')}
          </h3>
        </InnerWrapper>

        <StateDescriptionHeader />
      </div>
      <InnerWrapper>
        <div className="flex flex-col items-center justify-center dark:text-white">
          <span className="text-lg">🎯</span>
          <h3 className="text-xl font-semibold">{t('title.attention')}</h3>
          <div className="mt-2 text-center text-sm leading-4">
            <Trans
              components={{
                bold: <b />,
                italic: <i />,
              }}
              defaults="You must send <italic>exactly</italic> <bold>{{amount}} {{symbol}}</bold> on the <bold>{{network}}</bold> or your payment may be
            delayed, returned or lost."
              values={{
                amount: state.requiredAmount,
                network: state.network?.networkName,
                symbol: state.asset?.symbol,
              }}
            />
          </div>
        </div>
      </InnerWrapper>
      <form
        onSubmit={() => {
          dispatch({
            payload: [
              'AssetSelection',
              'NetworkSelection',
              'PaymentMethod',
              'ShowAddress',
              'Result',
            ],
            type: 'SET_STEPS',
          });
          dispatch({ payload: Steps.ShowAddress, type: 'SET_STEP' });
        }}
      >
        <InnerWrapper>
          <div className="flex gap-2">
            <input
              data-testid="acknowledge-checkbox"
              id="checkbox"
              onChange={(e) => {
                setAcknowledged(e.target.checked);
              }}
              type="checkbox"
            />
            <label
              className="text-xs leading-3 text-primary-400"
              htmlFor="checkbox"
            >
              <Trans
                components={{
                  bold: <b />,
                }}
                defaults="By clicking this checkbox I acknowledge I must send exactly <bold>{{amount}} {{symbol}}</bold> on the <bold>{{networkName}}</bold>."
                values={{
                  amount: state.requiredAmount,
                  networkName: state.network?.networkName,
                  symbol: state.asset?.symbol,
                }}
              />
            </label>
          </div>
          <Button
            block
            className="mt-2"
            disabled={!acknowledged}
            htmlType="submit"
            type="default"
          >
            {t('copy.acknowledge_amount')}
          </Button>
        </InnerWrapper>
      </form>
    </div>
  );
};

type Props = {};

export default ConfirmRequiredAmount;
