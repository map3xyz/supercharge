import { Badge } from '@map3xyz/components';
import React, { useContext } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';
import { coins } from '../AssetSelection';

export const networks = [
  { code: 'BTC', name: 'BTC' },
  { code: 'ETH', name: 'ETH' },
  { code: 'LTC', name: 'LTC' },
  { code: 'BCH', name: 'BCH' },
  { code: 'XRP', name: 'XRP' },
  { code: 'MATIC', name: 'MATIC' },
  { code: 'ADA', name: 'ADA' },
  { code: 'DOT', name: 'DOT' },
  { code: 'UNI', name: 'UNI' },
];

const NetworkSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  const selectedNetwork = networks.find(
    (network) => network.code === state.network
  );
  const selectedCoin = coins.find((coin) => coin.name === state.coin);

  if (!selectedCoin) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  return (
    <>
      <InnerWrapper>
        <h3 className="text-lg font-semibold dark:text-white">
          Select Network
        </h3>
        <h5 className="text-xs text-neutral-400">
          Select the Network to deposit <b>{selectedCoin.label}</b> on.
        </h5>
      </InnerWrapper>
      <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        Deposit{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({
              payload: Steps.AssetSelection,
              type: 'SET_STEP',
            });
          }}
          role="button"
        >
          <Badge color="blue" size="large">
            {selectedCoin.label}
          </Badge>
        </span>{' '}
        on
      </div>
      <div className="flex flex-col dark:text-white">
        {networks.map((network) => (
          <div
            className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800"
            key={network.code}
            onClick={() => {
              dispatch({ payload: network.code, type: 'SET_NETWORK' });
              dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
            }}
            role="button"
          >
            <span>{network.code}</span>
            {selectedNetwork?.code === network.code ? (
              <i className="fa fa-check-circle text-green-400" />
            ) : (
              <i className="fa fa-chevron-right text-xxs" />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

type Props = {};

export default NetworkSelection;
