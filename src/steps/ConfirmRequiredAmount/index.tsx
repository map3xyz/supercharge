import { Badge, Button } from '@map3xyz/components';
import React, { useContext, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import MethodIcon from '../../components/MethodIcon';
import { Context, Steps } from '../../providers/Store';

const ConfirmRequiredAmount: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3 className="text-lg font-semibold dark:text-white">
            Confirm Amount
          </h3>
        </InnerWrapper>

        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.requiredAmount} {state.asset?.symbol || ''}
          </Badge>{' '}
          on the {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.network?.name || ''} Network
          </Badge>{' '}
          via
          <Badge color={'blue'} size="large">
            {/* @ts-ignore */}
            <span className="flex items-center gap-1">
              <MethodIcon method={state.method} /> {state.method.name}
            </span>
          </Badge>
        </div>
      </div>
      <InnerWrapper>
        <div className="flex flex-col items-center justify-center dark:text-white">
          <span className="text-lg">🎯</span>
          <h3 className="text-xl font-semibold">Attention!</h3>
          <div className="mt-2 text-center text-sm leading-4">
            You must send <i>exactly</i>{' '}
            <b>
              {state.requiredAmount} {state.asset?.symbol}
            </b>{' '}
            on the <b>{state.network?.name} Network</b> or your payment may be
            delayed, returned or lost.
          </div>
        </div>
      </InnerWrapper>
      <form
        onSubmit={() => {
          dispatch({
            payload: [
              'AssetSelection',
              'NetworkSelection',
              'PaymentMethod',
              'QRCode',
              'Result',
            ],
            type: 'SET_STEPS',
          });
          dispatch({ payload: Steps.QRCode, type: 'SET_STEP' });
        }}
      >
        <InnerWrapper>
          <div className="flex gap-2">
            <input
              id="checkbox"
              onChange={(e) => {
                setAcknowledged(e.target.checked);
              }}
              type="checkbox"
            />
            <label
              className="text-xs leading-3 text-neutral-400"
              htmlFor="checkbox"
            >
              By clicking this checkbox I acknowledge I must send exactly{' '}
              <b>
                {state.requiredAmount} {state.asset?.symbol}
              </b>{' '}
              on the <b>{state.network?.name} Network</b>.
            </label>
          </div>
          <Button
            block
            className="mt-2"
            disabled={!acknowledged}
            htmlType="submit"
            type="default"
          >
            Acknowledge Amount
          </Button>
        </InnerWrapper>
      </form>
    </div>
  );
};

type Props = {};

export default ConfirmRequiredAmount;
