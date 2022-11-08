import { CoinLogo, Input } from '@map3xyz/components';
import React, { useContext } from 'react';
import { InView } from 'react-intersection-observer';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useGetAssetsQuery } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';

const AssetSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  const { data, error, fetchMore, loading, refetch } = useGetAssetsQuery({
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  if (loading) return <LoadingWrapper />;

  if (error) {
    return (
      <ErrorWrapper
        description="We couldn't get a list of assets to select."
        header="Error Fetching Assets"
        retry={() => refetch()}
      />
    );
  }

  return (
    <>
      <div className="sticky top-0 border-b border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <InnerWrapper className="!pt-0">
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="select-asset"
          >
            Select Asset
          </h3>
          <h5 className="text-xs text-neutral-400">
            Select the <b>Asset</b> you want to deposit.
          </h5>
          <form className="mt-2">
            <Input
              icon={<i className="fa fa-search" />}
              name="asset-search"
              placeholder="Search for an asset..."
              rounded
            />
          </form>
        </InnerWrapper>
      </div>
      <div className="flex flex-col dark:text-white">
        {data?.assets?.map((asset) => {
          if (!asset) return null;

          return (
            <div
              className="flex items-center justify-between border-b border-neutral-200 px-4 py-3 text-sm last:border-b-0 hover:bg-neutral-100 dark:border-neutral-700 hover:dark:bg-neutral-800"
              key={asset?.name}
              onClick={() => {
                dispatch({ payload: asset, type: 'SET_ASSET' });
                dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
              }}
              role="button"
            >
              <div className="flex items-center gap-2">
                <div className="flex w-4 justify-center">
                  <CoinLogo
                    height="h-4"
                    name={asset.name || ''}
                    png={asset.logo?.png || undefined}
                    svg={asset.logo?.svg || undefined}
                    width="w-4"
                  />
                </div>
                <span>{asset?.name}</span>
              </div>
              {asset.symbol === state.asset?.symbol ? (
                <i className="fa fa-check-circle text-green-400" />
              ) : (
                <i className="fa fa-chevron-right text-xxs" />
              )}
            </div>
          );
        })}
        {/* TODO: check if we're at the limit */}
        {data?.assets?.length ? (
          <InView
            onChange={async (inView) => {
              const currentLength = data.assets?.length || 0;
              if (inView) {
                await fetchMore({
                  variables: {
                    limit: currentLength * 2,
                    offset: currentLength,
                  },
                });
              }
            }}
          >
            <div className="flex w-full items-center justify-center py-2">
              <i className="fa fa-gear animate-spin text-neutral-500" />
            </div>
          </InView>
        ) : null}
      </div>
    </>
  );
};

type Props = {};

export default AssetSelection;
