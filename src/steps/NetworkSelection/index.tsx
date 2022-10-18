import { Badge, Button } from '@map3xyz/components';
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
      <h3 className="text-lg font-semibold dark:text-white">Select Network</h3>
      <h5 className="text-xs text-neutral-400">
        Select the network to deposit <Badge color="blue">{state.coin}</Badge>{' '}
        in.
      </h5>
      <div className="my-3 flex flex-col gap-1 dark:text-white">
        {networks.map((network) => (
          <Button
            block
            key={network}
            onClick={() => {
              dispatch({ payload: network, type: 'SET_NETWORK' });
              dispatch({ payload: 2, type: 'SET_STEP' });
            }}
            type={state.network === network ? 'primary' : 'secondary'}
          >
            {network}
          </Button>
        ))}
      </div>
    </>
  );
};

type Props = {};

export default NetworkSelection;
