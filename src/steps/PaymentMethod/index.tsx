import { Badge } from '@map3xyz/components';
import React, { useContext } from 'react';

import MetaMaskLogo from '../../assets/platforms/metamask.svg';
import InnerWrapper from '../../components/InnerWrapper';
import { Context, Method, Steps } from '../../providers/Store';

export const methods = [
  {
    icon: <i className="fa fa-qrcode h-4 w-4" />,
    label: 'QR Code',
    name: Method.qr,
  },
  {
    icon: (
      <div className="h-4 w-4">
        <MetaMaskLogo />
      </div>
    ),
    label: 'MetaMask',
    name: Method.metamask,
  },
];

const PaymentMethod: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  if (!state.coin || !state.network) {
    return null;
  }

  const selectedMethod = methods.find((method) => method.name === state.method);

  return (
    <>
      <InnerWrapper>
        <h3 className="text-lg font-semibold dark:text-white">
          Payment Method
        </h3>
        <h5 className="text-xs text-neutral-400">
          How do you want to deposit?
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
        on{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
          }}
          role="button"
        >
          <Badge color="blue" size="large">
            {state.network}
          </Badge>
        </span>{' '}
        via
      </div>
      <div className="mt-3 flex flex-col dark:text-white">
        {methods.map((method) => (
          <div
            className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-200 dark:border-neutral-800 hover:dark:bg-neutral-800"
            key={method.label}
            onClick={() => {
              dispatch({ payload: method.name, type: 'SET_PAYMENT_METHOD' });
              dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
            }}
            role="button"
          >
            <div className="flex items-center gap-2">
              {method.icon}
              <span>{method.label}</span>
            </div>
            {selectedMethod?.label === method.label ? (
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

export default PaymentMethod;
