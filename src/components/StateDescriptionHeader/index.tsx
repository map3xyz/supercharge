import { Badge, CryptoAddress } from '@map3xyz/components';
import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Context, Steps } from '../../providers/Store';
import MethodIcon from '../MethodIcon';

export const BgOffsetWrapper = ({
  border,
  children,
  className = '',
}: {
  border: 't' | 'y';
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`${className} ${
      border === 't' ? 'border-t' : 'border-y'
    } w-full border-primary-200 bg-primary-100 px-4 py-3 font-bold leading-6 dark:border-primary-700 dark:bg-primary-800 dark:text-white`}
  >
    {children}
  </div>
);

const StateDescriptionHeader: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [state] = useContext(Context);
  const { stepInView: step, steps } = state;

  switch (true) {
    case steps[step] === Steps[Steps.NetworkSelection]:
      return (
        <BgOffsetWrapper border="t">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Send <badge>{{symbol}}</badge> on"
            values={{
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      );
    case steps[step] === Steps[Steps.WalletConnect]:
      return (
        <BgOffsetWrapper border="y">
          <div className="flex items-center gap-2">
            <img className="h-4" src={state.method?.logo || ''} />
            <div className="font-bold">{state.method?.name}</div>
          </div>
          <div className="text-xs text-primary-500">
            {state.method?.description}
          </div>
        </BgOffsetWrapper>
      );
    case steps[step] === Steps[Steps.ConfirmRequiredAmount]:
      return (
        <BgOffsetWrapper border="y">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Send <badge>{{amount}} {{symbol}}</badge> on the <badge>{{network}}</badge>"
            values={{
              amount: state.requiredAmount,
              network: state.network?.networkName,
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      );
    case steps[step] === Steps[Steps.PaymentMethod]:
      if (!state.asset?.symbol) return null;
      if (!state.network?.networkName) return null;
      return (
        <BgOffsetWrapper border="t">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Send <badge>{{amount}} {{symbol}}</badge> on the <badge>{{network}}</badge> via"
            values={{
              amount: state.requiredAmount,
              network: state.network?.networkName,
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      );
    case steps[step] === Steps[Steps.SwitchChain]:
    case steps[step] === Steps[Steps.EnterAmount]:
    case steps[step] === Steps[Steps.Result]:
      if (!state.asset?.symbol) return null;
      if (!state.network?.networkName) return null;
      if (!state.method?.value) return null;

      return (
        <BgOffsetWrapper border="y">
          {t('copy.send')}
          {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.requiredAmount} {state.asset.symbol || ''}
          </Badge>{' '}
          {state.method.value === 'binance-pay' ? null : (
            <>
              on the {/* @ts-ignore */}
              <Badge color="blue" size="large">
                {state.network?.networkName || state.network.networkName || ''}
              </Badge>{' '}
            </>
          )}
          {t('copy.via')} {/* @ts-ignore */}
          <Badge
            color={
              state.account.status === 'loading' ||
              state.account.status === 'idle'
                ? 'yellow'
                : state.account.status === 'error'
                ? 'red'
                : 'green'
            }
            dot
            size="large"
          >
            {/* @ts-ignore */}
            <span className="flex items-center gap-1">
              <MethodIcon method={state.method} /> {state.method.name}{' '}
              {state.account.status === 'success' && state.account.data ? (
                <CryptoAddress hint={false}>{state.account.data}</CryptoAddress>
              ) : (
                ''
              )}
            </span>
          </Badge>
        </BgOffsetWrapper>
      );
    default:
      return null;
  }
};

type Props = {};

export default StateDescriptionHeader;
