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
  const { data, error, loading, refetch } = useGetPaymentMethodsQuery();

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

  return (
    <>
      <InnerWrapper>
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="payment-method"
        >
          Payment Method
        </h3>
        <h5 className="text-xs text-neutral-400">
          How do you want to deposit?
        </h5>
      </InnerWrapper>
      <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
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
            {state.asset?.name || ''}
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
            {state.network?.name || ''}
          </Badge>
        </span>{' '}
        via
      </div>
      <div className="flex flex-col dark:text-white">
        {data?.methods?.map((method) =>
          method ? (
            <div
              className={`flex items-center justify-between border-t border-neutral-200 px-4 py-3 text-sm hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800 ${
                method.enabled
                  ? ''
                  : '!cursor-not-allowed opacity-50 hover:bg-white dark:hover:bg-neutral-900'
              }`}
              key={method.value}
              onClick={() => {
                if (!method.enabled) {
                  return;
                }
                dispatch({
                  payload: method,
                  type: 'SET_PAYMENT_METHOD',
                });
                if (method.value === 'qr') {
                  dispatch({ payload: Steps.Summary, type: 'SET_STEP' });
                }
                // else {
                //   dispatch({
                //     payload: method,
                //     type: 'SET_PAYMENT_METHOD',
                //   });
                //   dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
                // }
              }}
              role="button"
            >
              <div className="flex items-center gap-2">
                <MethodIcon method={method} />
                <span>{method.name}</span>
                {!method.enabled && <Badge color="yellow">Coming Soon</Badge>}
              </div>
              {state.method?.value === method.value ? (
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
