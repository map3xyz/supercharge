import React, { useContext } from 'react';

import { Context } from '../../providers/Store';

const coins = ['Bitcoin', 'Ethereum', 'Litecoin', 'Bitcoin Cash', 'Ripple'];

const AssetSelection: React.FC<Props> = () => {
  const [_, dispatch] = useContext(Context);

  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Deposit Crypto</h3>
      <h5 className="text-xs text-neutral-600">
        Select the asset you want to deposit.
      </h5>
      <div className="my-3 flex flex-col gap-1">
        {coins.map((coin) => (
          <div
            className="flex cursor-pointer items-center"
            key={coin}
            onClick={() => {
              dispatch({ payload: coin, type: 'SET_COIN' });
              dispatch({ payload: 1, type: 'SET_STEP' });
            }}
            role="button"
          >
            <div className="mr-2 h-3 w-3 rounded-full bg-neutral-700"></div>
            <div className="text-sm dark:text-white">{coin}</div>
          </div>
        ))}
      </div>
    </>
  );
};

type Props = {};

export default AssetSelection;
