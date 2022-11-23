import { Badge } from '@map3xyz/components';
import React, { useContext } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import MethodIcon from '../../components/MethodIcon';
import { useGetPaymentMethodsQuery } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';

const PaymentMethod: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const chainId = state.network?.identifiers?.chainId;
  const { data, error, loading, refetch } = useGetPaymentMethodsQuery({
    variables: { chainId },
  });

  if (loading) return <LoadingWrapper message="Fetching Payment Methods..." />;
  if (error)
    return (
      <ErrorWrapper
        description="We couldn't get a list of payment methods to select."
        header="Error Fetching Payment Methods"
        retry={refetch}
      />
    );

  if (!state.asset || !state.network) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  const methodsForNetwork = data?.methodsForNetwork?.filter(
    (method) =>
      !method?.walletConnect ||
      ((method?.walletConnect?.chains?.length === 0 ||
        method?.walletConnect?.chains?.includes('eip155:' + chainId)) &&
        method?.walletConnect?.mobile?.native)
  );

  return (
    <>
      <div className="sticky top-0 z-20 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="payment-method"
          >
            Payment Method
          </h3>
          <h5 className="text-xs text-neutral-400">How do you want to send?</h5>
        </InnerWrapper>

        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send{' '}
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
              {state.asset?.symbol || ''}
            </Badge>
          </span>{' '}
          on the{' '}
          <span
            className="text-blue-600 underline"
            onClick={() => {
              dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
            }}
            role="button"
          >
            {/* @ts-ignore */}
            <Badge color="blue" size="large">
              {state.network?.name || ''} Network
            </Badge>
          </span>{' '}
          via
        </div>
      </div>
      <div className="relative z-10 flex flex-col dark:text-white">
        {methodsForNetwork?.map((method) =>
          method ? (
            <div
              className={`flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800 ${
                method.flags?.enabled
                  ? ''
                  : '!cursor-not-allowed opacity-50 hover:bg-white dark:hover:bg-neutral-900'
              }`}
              key={method.name + '-' + method.value}
              onClick={() => {
                if (!method.flags?.enabled) {
                  return;
                }
                dispatch({
                  payload: method,
                  type: 'SET_PAYMENT_METHOD',
                });
                if (method.value === 'qr') {
                  dispatch({
                    payload: [
                      'AssetSelection',
                      'NetworkSelection',
                      'PaymentMethod',
                      'Summary',
                    ],
                    type: 'SET_STEPS',
                  });
                  dispatch({ payload: Steps.Summary, type: 'SET_STEP' });
                } else if (method.value === 'isWalletConnect') {
                  dispatch({
                    payload: [
                      'AssetSelection',
                      'NetworkSelection',
                      'PaymentMethod',
                      'WalletConnect',
                      'EnterAmount',
                      'Summary',
                    ],
                    type: 'SET_STEPS',
                  });
                  dispatch({ payload: Steps.WalletConnect, type: 'SET_STEP' });
                } else {
                  dispatch({
                    payload: [
                      'AssetSelection',
                      'NetworkSelection',
                      'PaymentMethod',
                      'EnterAmount',
                      'Summary',
                    ],
                    type: 'SET_STEPS',
                  });
                  dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
                }
              }}
              role="button"
            >
              <div className="flex items-center gap-2">
                <MethodIcon method={method} />
                <span>{method.name}</span>
              </div>
              {`${state.method?.name}-${state.method?.value}` ===
              `${method.name}-${method.value}` ? (
                <i className="fa fa-check-circle text-green-400" />
              ) : (
                <i className="fa fa-chevron-right text-xxs" />
              )}
            </div>
          ) : null
        )}
      </div>
    </>
  );
};

type Props = {};

export default PaymentMethod;
