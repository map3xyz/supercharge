import { Badge, ReadOnlyText } from '@map3xyz/components';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import { Context, Steps } from '../../providers/Store';
import { coins } from '../AssetSelection';
import { networks } from '../NetworkSelection';
import { methods } from '../PaymentMethod';

const QRCode: React.FC<Props> = () => {
  const [state, dispatch, { generateDepositAddress }] = useContext(Context);

  if (!state.coin || !state.network || !state.method) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  const selectedCoin = coins.find((coin) => coin.name === state.coin);
  const selectedNetwork = networks.find(
    (network) => network.name === state.network
  );
  const selectedMethod = methods.find((method) => method.name === state.method);

  if (!selectedCoin || !selectedNetwork || !selectedMethod) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  useEffect(() => {
    const run = async () => {
      try {
        dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' });
        const address = await generateDepositAddress(
          selectedCoin.name,
          selectedNetwork.code
        );
        dispatch({
          payload: address,
          type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS',
        });
      } catch (e) {
        dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' });
      }
    };
    run();

    return () => {
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' });
    };
  }, []);

  return (
    <div>
      <InnerWrapper>
        <h3 className="text-lg font-semibold dark:text-white">Scan QR Code</h3>
      </InnerWrapper>
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
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
        on{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
          }}
          role="button"
        >
          <Badge color="blue" size="large">
            {selectedNetwork.name}
          </Badge>
        </span>{' '}
        via{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({
              payload: Steps.PaymentMethod,
              type: 'SET_STEP',
            });
          }}
          role="button"
        >
          {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {/* @ts-ignore */}
            <span className="flex items-center gap-1">
              {selectedMethod.icon} {selectedMethod?.label}
            </span>
          </Badge>
        </span>
      </div>
      <InnerWrapper>
        {state.depositAddress.status === 'loading' && (
          <div className="flex h-64 items-center justify-center text-sm">
            <div className="flex flex-col items-center gap-2 font-semibold">
              <div className="animate-spin dark:text-white">
                <i className="fa fa-gear"></i>
              </div>
              <span className="dark:text-white">Generating Address...</span>
            </div>
          </div>
        )}
        {state.depositAddress.status === 'error' && (
          <div className="flex h-64 items-center justify-center text-sm">
            <div className="flex flex-col items-center gap-2 font-semibold">
              <div className="animate-spin font-semibold text-red-600">
                <i className="fa fa-circle-xmark"></i>
              </div>
              <span className="text-red-600">
                Error generating deposit address.
              </span>
            </div>
          </div>
        )}
        {state.depositAddress.status === 'success' &&
          state.depositAddress.data && (
            <div className="flex w-full flex-col items-center justify-center gap-4 text-sm">
              <div className="text-xs text-neutral-400">
                Only send {selectedCoin.label} on the {selectedNetwork.name}{' '}
                Network to this address.
              </div>
              <div className="flex w-full justify-center">
                <QRCodeSVG
                  bgColor={state.theme === 'dark' ? '#262626' : '#FFFFFF'}
                  className="rounded-lg"
                  fgColor={state.theme === 'dark' ? '#FFFFFF' : '#000000'}
                  imageSettings={{
                    excavate: true,
                    height: 40,
                    src: selectedCoin.logo.svg || selectedCoin.logo.png || '',
                    width: 40,
                  }}
                  includeMargin={true}
                  size={256}
                  style={{
                    border:
                      state.theme === 'dark'
                        ? '1px solid #404040'
                        : '1px solid #e5e5e5',
                  }}
                  value={state.depositAddress.data}
                />
              </div>
              <div className="w-full">
                <label className="text-xs dark:text-white">
                  Deposit Address
                </label>
                <ReadOnlyText copyButton value={state.depositAddress.data} />
              </div>
            </div>
          )}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default QRCode;
