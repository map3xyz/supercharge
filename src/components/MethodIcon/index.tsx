import React from 'react';
import BinanceLogo from 'url:../../assets/binance-pay-logo.png';
import CoinbaseWalletLogo from 'url:../../assets/coinbase.png';
import MetaMaskLogo from 'url:../../assets/metamask.png';

import { PaymentMethod } from '../../generated/apollo-gql';

const MethodIcon: React.FC<Props> = ({ method }) => {
  return (
    <>
      {method.value === 'isMetaMask' ? (
        <img
          aria-label="MetaMask logo"
          className="h-4 w-4"
          src={MetaMaskLogo}
        />
      ) : method.value === 'isCoinbaseWallet' ? (
        <img
          aria-label="Coinbase logo"
          className="h-4 w-4"
          src={CoinbaseWalletLogo}
        />
      ) : method.value === 'binance-pay' ? (
        <img aria-label="Binance logo" className="h-4 w-4" src={BinanceLogo} />
      ) : method.icon ? (
        <i className={method.icon + ' h-4 w-4'} />
      ) : method.logo ? (
        <img className="h-4 w-4" src={method.logo} />
      ) : null}
    </>
  );
};

type Props = {
  method: PaymentMethod;
};

export default MethodIcon;
