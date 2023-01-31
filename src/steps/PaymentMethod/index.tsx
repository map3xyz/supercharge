import { Badge, Input } from '@map3xyz/components';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import MethodIcon from '../../components/MethodIcon';
import { useGetPaymentMethodsQuery } from '../../generated/apollo-gql';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps } from '../../providers/Store';

const PaymentMethod: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [formValue, setFormValue] = useState<FormData>();
  const formRef = useRef<HTMLFormElement>(null);
  const chainId = state.network?.identifiers?.chainId;
  const { providers } = useWeb3();
  const { data, error, loading, refetch } = useGetPaymentMethodsQuery({
    variables: { chainId },
  });

  useEffect(() => {
    state.provider?.data?.off?.('network');
    dispatch({ type: 'SET_ACCOUNT_IDLE' });
    dispatch({ type: 'SET_PROVIDER_IDLE' });
    dispatch({ payload: undefined, type: 'SET_PROVIDER_CHAIN_ID' });
  }, []);

  if (!state.asset || !state.network) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  if (loading) return <LoadingWrapper message="Fetching Payment Methods..." />;
  if (error)
    return (
      <ErrorWrapper
        description="We couldn't get a list of payment methods to select."
        header="Error Fetching Payment Methods"
        retry={refetch}
      />
    );

  const methodsForNetwork = data?.methodsForNetwork?.filter((method) => {
    const searchMatch = formValue?.get('method-search')
      ? method?.name
          ?.toLowerCase()
          .includes(
            (formValue.get('method-search') as string)?.toLowerCase() || ''
          )
      : true;

    if (!searchMatch) return false;

    const supportsChain =
      method?.walletConnect?.chains?.includes('eip155:' + chainId) ||
      method?.walletConnect?.chains?.length === 0;

    if (isMobile) {
      // if mobile filter out extensions and walletconnect
      if (
        method?.value === 'isMetaMask' ||
        method?.value === 'isCoinbaseWallet' ||
        method?.value === 'isWalletConnect'
      )
        return false;

      // TODO: support walletconnect on mobile
      // if (method?.walletConnect && !supportsChain) return false;

      // if (method?.walletConnect) {
      //   let app: string | null | undefined = null;
      //   if (isIOS) {
      //     app = method?.walletConnect?.app?.ios;
      //   }
      //   if (isAndroid) {
      //     app = method?.walletConnect?.app?.android;
      //   }
      //   const hasAppOrUniversal = !!(
      //     app || method?.walletConnect?.mobile?.universal
      //   );

      //   if (!hasAppOrUniversal) return false;
      // }

      return true;
    }

    return (
      !method?.walletConnect ||
      (method.walletConnect &&
        supportsChain &&
        method?.walletConnect?.mobile?.native)
    );
  });

  const isEmptySearch =
    methodsForNetwork?.length === 0 && !!formValue?.get('method-search');

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="payment-method"
          >
            Payment Method
          </h3>
          {data?.methodsForNetwork?.length &&
          data?.methodsForNetwork.length > 6 ? (
            <form
              className="mt-2"
              onChange={(e) => setFormValue(new FormData(e.currentTarget))}
              ref={formRef}
            >
              <Input
                autoFocus
                data-testid="method-search"
                icon={<i className="fa fa-search" />}
                name="method-search"
                placeholder="Search for a payment method..."
                rounded
              />
            </form>
          ) : null}
        </InnerWrapper>

        <div className="w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
          Send {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.requiredAmount} {state.asset.symbol || ''}
          </Badge>{' '}
          on the {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {state.network.networkName || ''}
          </Badge>{' '}
          via
        </div>
      </div>
      <div className="flex h-full flex-col overflow-hidden">
        <div className="layout-scrollbar relative z-10 flex flex-col dark:text-white">
          {isEmptySearch ? (
            <ErrorWrapper
              description="We couldn't find any payment methods that matched your search."
              header="Payment Method Not Found"
              retry={() => {
                if (!formRef.current) return;
                const input = formRef.current.getElementsByTagName('input')[0];
                input.value = '';
                input.focus();
                setFormValue(undefined);
              }}
            />
          ) : (
            methodsForNetwork?.map((method) =>
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
                    if (method.value === 'show-address') {
                      if (state.requiredAmount) {
                        dispatch({
                          payload: [
                            'AssetSelection',
                            'NetworkSelection',
                            'PaymentMethod',
                            'ConfirmRequiredAmount',
                            'ShowAddress',
                            'Result',
                          ],
                          type: 'SET_STEPS',
                        });
                        dispatch({
                          payload: Steps.ConfirmRequiredAmount,
                          type: 'SET_STEP',
                        });
                      } else {
                        dispatch({
                          payload: [
                            'AssetSelection',
                            'NetworkSelection',
                            'PaymentMethod',
                            'ShowAddress',
                            'Result',
                          ],
                          type: 'SET_STEPS',
                        });
                        dispatch({
                          payload: Steps.ShowAddress,
                          type: 'SET_STEP',
                        });
                      }
                    } else if (method.value === 'binance-pay') {
                      dispatch({
                        payload: [
                          'AssetSelection',
                          'NetworkSelection',
                          'PaymentMethod',
                          'EnterAmount',
                          'BinancePay',
                          'Result',
                        ],
                        type: 'SET_STEPS',
                      });
                      dispatch({
                        payload: Steps.EnterAmount,
                        type: 'SET_STEP',
                      });
                    } else if (method.value === 'isWalletConnect') {
                      dispatch({
                        payload: [
                          'AssetSelection',
                          'NetworkSelection',
                          'PaymentMethod',
                          'WalletConnect',
                          'EnterAmount',
                          'Result',
                        ],
                        type: 'SET_STEPS',
                      });
                      dispatch({
                        payload: Steps.WalletConnect,
                        type: 'SET_STEP',
                      });
                    } else {
                      dispatch({
                        payload: [
                          'AssetSelection',
                          'NetworkSelection',
                          'PaymentMethod',
                          'EnterAmount',
                          'Result',
                        ],
                        type: 'SET_STEPS',
                      });
                      dispatch({
                        payload: Steps.EnterAmount,
                        type: 'SET_STEP',
                      });
                    }
                  }}
                  role="button"
                >
                  <div className="flex items-center gap-2">
                    <MethodIcon method={method} />
                    <span>
                      {method.name === 'MetaMask' &&
                      method.value === 'isWalletConnect'
                        ? method.name + ' (Mobile)'
                        : method.name}
                    </span>
                    {providers[method.value || ''] ? (
                      <Badge color="green">Installed</Badge>
                    ) : null}
                  </div>
                  {`${state.method?.name}-${state.method?.value}` ===
                  `${method.name}-${method.value}` ? (
                    <i className="fa fa-check-circle text-green-400" />
                  ) : (
                    <i className="fa fa-chevron-right text-xxs" />
                  )}
                </div>
              ) : null
            )
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default PaymentMethod;
