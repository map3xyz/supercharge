import React, { useContext } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';

export const coins = [
  {
    label: 'Bitcoin',
    logo: {
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
    },
    name: 'bitcoin',
  },
  {
    label: 'Ethereum',
    logo: {
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'ethereum',
  },
  {
    label: 'Ethereum Classic',
    logo: {
      png: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/classic/info/logo.png',
    },
    name: 'ethereum-classic',
  },
  {
    label: 'USDC',
    logo: {
      png: 'https://raw.githubusercontent.com/map3xyz/ethereum-tokenlist/master/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png',
    },
    name: 'usdc',
  },
];

const AssetSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  const selectedCoin = coins.find((coin) => coin.name === state.coin);

  return (
    <>
      <InnerWrapper>
        <h3 className="text-lg font-semibold dark:text-white">Select Asset</h3>
        <h5 className="text-xs text-neutral-400">
          Select the Asset you want to deposit.
        </h5>
      </InnerWrapper>
      <div className="flex flex-col dark:text-white">
        {coins.map((coin) => (
          <div
            className="flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800"
            key={coin.name}
            onClick={() => {
              dispatch({ payload: coin.name, type: 'SET_COIN' });
              dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
            }}
            role="button"
          >
            <div className="flex items-center gap-2">
              <div className="flex w-4 justify-center">
                <img className="h-4" src={coin.logo.svg || coin.logo.png} />
              </div>
              <span>{coin.label}</span>
            </div>
            {coin === selectedCoin ? (
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

export default AssetSelection;
