import { Badge, CoinAndNetworkLogo, CoinLogo } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import ListItem from '../../components/ListItem';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useGetBridgeTransactionsByIdsQuery } from '../../generated/apollo-gql';
import { Context } from '../../providers/Store';

const OrderHistory: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { data, error, loading, refetch } = useGetBridgeTransactionsByIdsQuery({
    skip: !state.orderHistory.length,
    variables: {
      ids: state.orderHistory,
    },
  });

  if (error) {
    return (
      <div className="mt-3">
        <ErrorWrapper
          description="We were unable to fetch your order history."
          header="Error Fetching Order History"
          retry={refetch}
          stacktrace={JSON.stringify(error, null, 2)}
        />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-primary-200 dark:border-primary-700 dark:bg-primary-900">
        <InnerWrapper>
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="order-history"
          >
            Order History
          </h3>
        </InnerWrapper>
      </div>
      {loading ? (
        <LoadingWrapper message="Fetching Order History..."></LoadingWrapper>
      ) : (
        <div className="flex h-full flex-col overflow-hidden">
          <div className="layout-scrollbar relative z-10 flex flex-col dark:text-white">
            {data?.getBridgeTransactionsByIds.map((order) => {
              return (
                <ListItem key={order.id}>
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
        </div>
      )}
    </div>
  );
};

type Props = {};

export default OrderHistory;
