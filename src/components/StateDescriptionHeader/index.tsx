import { Badge, CryptoAddress } from '@map3xyz/components';
import React, { useContext } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Context, Steps } from '../../providers/Store';
import { BgOffsetWrapper } from '../BgOffsetWrapper';
import MethodIcon from '../MethodIcon';

const StateDescriptionHeader: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [state] = useContext(Context);
  const { stepInView: step, steps } = state;

  let amount;
  if (!amount && state.tx.amount) {
    amount = state.tx.amount.split(' ')[0];
  }
  if (!amount && state.requiredAmount) {
    amount = state.requiredAmount;
  }

  switch (true) {
    case steps[step] === Steps[Steps.NetworkSelection]:
      return (
        <BgOffsetWrapper border="t">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Deposit <badge>{{amount}} {{symbol}}</badge> on"
            values={{
              amount,
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
      return state.network?.bridged ? (
        <BgOffsetWrapper border="y">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Deposit <badge>{{amount}} {{symbol}}</badge> on the <badge>{{destinationNetwork}}</badge> via <badge>{{network}} Bridge</badge>"
            values={{
              amount,
              destinationNetwork: state.destinationNetwork?.networkName,
              network: state.network?.networkName,
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      ) : (
        <BgOffsetWrapper border="y">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Deposit <badge>{{amount}} {{symbol}}</badge> on the <badge>{{network}}</badge>"
            values={{
              amount,
              network: state.network?.networkName,
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      );
    case steps[step] === Steps[Steps.PaymentMethod]:
      if (!state.asset?.symbol) return null;
      if (!state.network?.networkName) return null;
      return state.network.bridged ? (
        <BgOffsetWrapper border="t">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Deposit <badge>{{amount}} {{symbol}}</badge> on the <badge>{{destinationNetwork}}</badge> via the <badge>{{network}} Bridge</badge> with"
            values={{
              amount,
              destinationNetwork: state.destinationNetwork?.networkName,
              network: state.network?.networkName,
              symbol: state.asset?.symbol,
            }}
          />
        </BgOffsetWrapper>
      ) : (
        <BgOffsetWrapper border="t">
          <Trans
            components={{
              // @ts-ignore
              badge: <Badge color="blue" size="large" />,
            }}
            defaults="Deposit <badge>{{amount}} {{symbol}}</badge> on the <badge>{{network}}</badge> with"
            values={{
              amount,
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
      if (!state.method?.value || state.bridgeQuote || state.destinationNetwork)
        return (
          <BgOffsetWrapper border="y">
            {t('copy.deposit')} {/* @ts-ignore */}
            <Badge color="blue" size="large">
              {amount} {state.asset.symbol || ''}
            </Badge>{' '}
            <>
              on the
              <Badge color="blue" size="large">
                {/* @ts-ignore */}
                {state.destinationNetwork.networkName}
              </Badge>{' '}
            </>
            {t('copy.via')} {/* @ts-ignore */}
            <Badge color={'blue'} size="large">
              {state.network.networkName} Bridge
            </Badge>
          </BgOffsetWrapper>
        );

      return (
        <BgOffsetWrapper border="y">
          {t('copy.deposit')}
          {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {amount} {state.asset.symbol || ''}
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
