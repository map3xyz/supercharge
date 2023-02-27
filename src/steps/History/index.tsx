import {
  Badge,
  Button,
  CoinAndNetworkLogo,
  Input,
  Radio,
  Textarea,
} from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useState } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import ListItem from '../../components/ListItem';
import LoadingWrapper from '../../components/LoadingWrapper';
import {
  BridgeTransactionWithAssetsAndNetworks,
  useGetBridgeTransactionsByUserIdQuery,
} from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';
import HistoryContactUs from './HistoryContactUs';

const History: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [showContactUs, setShowContactUs] = useState(false);
  const {
    data,
    error,
    loading,
    refetch,
  } = useGetBridgeTransactionsByUserIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      id: state.userId,
    },
  });

  if (error) {
    return (
      <ErrorWrapper
        description="We were unable to fetch your history."
        header="Error Fetching History"
        retry={refetch}
        stacktrace={JSON.stringify(error, null, 2)}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-primary-200 dark:border-primary-700 dark:bg-primary-900">
        <InnerWrapper className="flex flex-row items-center justify-between">
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="order-history"
          >
            History
          </h3>
          {!loading ? (
            <button
              aria-label="Contact Us"
              onClick={() => setShowContactUs((s) => !s)}
            >
              <i
                className={`fa ${
                  showContactUs ? 'fa-chevron-down' : 'fa-circle-question'
                } text-xs transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400`}
              />
            </button>
          ) : null}
        </InnerWrapper>
      </div>
      {loading ? (
        <LoadingWrapper message="Fetching History..."></LoadingWrapper>
      ) : (
        <div className="relative flex h-full flex-col overflow-hidden">
          {data?.getBridgeTransactionsByUserId?.length ? (
            <div className="layout-scrollbar relative z-10 flex flex-col dark:text-white">
              {data?.getBridgeTransactionsByUserId.map((order) => {
                return (
                  <ListItem
                    key={order.id}
                    onClick={() => {
                      dispatch({
                        payload: order.fromAsset,
                        type: 'SET_ASSET',
                      });
                      dispatch({
                        payload: { ...order.fromNetwork, bridged: true },
                        type: 'SET_NETWORK',
                      });
                      dispatch({
                        payload: order.toNetwork,
                        type: 'SET_DESTINATION_NETWORK',
                      });
                      dispatch({
                        payload: order as BridgeTransactionWithAssetsAndNetworks,
                        type: 'SET_BRIDGE_TRANSACTION',
                      });
                      dispatch({
                        payload: order.quote,
                        type: 'SET_BRIDGE_QUOTE',
                      });
                      dispatch({
                        payload: order.sourceChainTxId as string,
                        type: 'SET_TX_HASH',
                      });
                      dispatch({
                        payload: `${
                          order.quote.estimate?.amountToReceive as string
                        } ${order.toAsset.symbol}`,
                        type: 'SET_TX_AMOUNT',
                      });
                      dispatch({
                        payload: [
                          'ApproveToken',
                          'Confirming',
                          'DestinationNetwork',
                        ],
                        type: 'SET_TX_STEPS',
                      });
                      dispatch({
                        payload: Steps.Result,
                        type: 'SET_STEP',
                      });
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CoinAndNetworkLogo
                          coin={{
                            height: 'h-7',
                            name: order.fromAsset.name!,
                            padding: true,
                            png: order.fromAsset.logo?.png || '',
                            svg: order.fromAsset.logo?.svg || '',
                            width: 'w-7',
                          }}
                          network={{
                            height: 'h-4',
                            name: order.fromNetwork.name!,
                            padding: true,
                            png: order.fromNetwork.logo?.png || '',
                            svg: order.fromNetwork.logo?.svg || '',
                            width: 'w-4',
                          }}
                        />
                        <i className="fa fa-arrow-right-long text-primary-400" />
                        <CoinAndNetworkLogo
                          coin={{
                            height: 'h-7',
                            name: order.toAsset.name!,
                            padding: true,
                            png: order.toAsset.logo?.png || '',
                            svg: order.toAsset.logo?.svg || '',
                            width: 'w-7',
                          }}
                          network={{
                            height: 'h-4',
                            name: order.toNetwork.name!,
                            padding: true,
                            png: order.toNetwork.logo?.png || '',
                            svg: order.toNetwork.logo?.svg || '',
                            width: 'w-4',
                          }}
                        />
                      </div>
                      <div className="flex flex-col items-end gap-1 text-xs">
                        <div>{new Date(order.created).toLocaleString()}</div>
                        {order.state === 'quoted' ||
                        order.state === 'subscribed' ? (
                          <Badge color="blue">Pending</Badge>
                        ) : order.state === 'completed' ? (
                          <Badge color="green">Completed</Badge>
                        ) : order.state === 'failed' ? (
                          <Badge color="red">Failed</Badge>
                        ) : null}
                      </div>
                    </div>
                  </ListItem>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center dark:text-white">
              <div className="text-center">
                <h3 className="text-xl font-semibold">
                  No Transaction History
                </h3>
                <p className="mt-1 text-xs">
                  Find your bridge transaction history here.
                </p>
                <p className="mt-0.5 text-xs">
                  Click{' '}
                  <span
                    className="text-blue-600"
                    onClick={() => {
                      dispatch({
                        type: 'RESET_STATE',
                      });
                    }}
                    role="button"
                  >
                    here
                  </span>{' '}
                  to start a deposit.
                </p>
              </div>
            </div>
          )}
          <AnimatePresence>
            {showContactUs ? (
              <HistoryContactUs setShowContactUs={setShowContactUs} />
            ) : null}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

type Props = {};

export default History;
