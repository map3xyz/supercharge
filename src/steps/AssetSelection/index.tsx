import React, { useContext } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useGetAssetsQuery } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';

const AssetSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  const { data, error, loading, refetch } = useGetAssetsQuery();

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
        <InnerWrapper>
          <h3
            className="text-lg font-semibold dark:text-white"
            data-testid="select-asset"
          >
            Select Asset
          </h3>
          <h5 className="text-xs text-neutral-400">
            Select the Asset you want to deposit.
          </h5>
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
                  <img
                    className="h-4"
                    src={asset?.logo!.svg || asset?.logo!.png || ''}
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
      </div>
    </>
  );
};

type Props = {};

export default AssetSelection;
