import React, { useContext } from 'react';

import { Context } from '../../providers/Store';

const networks = [
  'BTC',
  'ETH',
  'LTC',
  'BCH',
  'XRP',
  'MATIC',
  'ADA',
  'DOT',
  'UNI',
];

const NetworkSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  if (!state.coin) {
    return null;
  }

  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Deposit Crypto</h3>
      <h5 className="text-xs text-neutral-600">
        Select the network to deposit {state.coin} in.
      </h5>
      <div className="my-3 flex flex-col gap-1">
        {networks.map((network) => (
          <div
            className="flex cursor-pointer items-center"
            key={network}
            onClick={() => {
              dispatch({ payload: network, type: 'SET_NETWORK' });
              dispatch({ payload: 2, type: 'SET_STEP' });
            }}
            role="button"
          >
            <div className="mr-2 h-3 w-3 rounded-full bg-neutral-700"></div>
            <div className="text-sm dark:text-white">{network}</div>
          </div>
        ))}
      </div>
    </>
  );
};

type Props = {};

export default NetworkSelection;
