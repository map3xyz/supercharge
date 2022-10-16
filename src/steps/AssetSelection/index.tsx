import { Button } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../providers/Store';

const coins = ['Bitcoin', 'Ethereum', 'Litecoin', 'Bitcoin Cash', 'Ripple'];

const AssetSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Select Asset</h3>
      <h5 className="text-xs text-neutral-400">
        Select the asset you want to deposit.
      </h5>
      <div className="my-3 flex flex-col gap-1">
        {coins.map((coin) => (
          <Button
            block
            key={coin}
            onClick={() => {
              dispatch({ payload: coin, type: 'SET_COIN' });
              dispatch({ payload: 1, type: 'SET_STEP' });
            }}
            type={state.coin === coin ? 'primary' : 'secondary'}
          >
            {coin}
          </Button>
        ))}
      </div>
    </>
  );
};

type Props = {};

export default AssetSelection;
