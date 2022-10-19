import { Badge } from '@map3xyz/components';
import React, { useContext } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';

const networks = [
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

  if (!state.coin) {
    return null;
  }

  const selectedNetwork = networks.find(
    (network) => network.code === state.network
  );

  return (
    <>
      <InnerWrapper>
        <h3 className="text-lg font-semibold dark:text-white">
          Select Network
        </h3>
        <h5 className="text-xs text-neutral-400">
          Select the Network to deposit <b>{state.coin}</b> on.
        </h5>
      </InnerWrapper>
      <div className="w-full bg-neutral-100 px-4 py-3 text-xs dark:bg-neutral-800 dark:text-white">
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
            {state.coin}
          </Badge>
        </span>{' '}
        on
      </div>
      <div className="mt-3 flex flex-col dark:text-white">
        {networks.map((network) => (
          <div
            className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-200 dark:border-neutral-800 hover:dark:bg-neutral-800"
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
