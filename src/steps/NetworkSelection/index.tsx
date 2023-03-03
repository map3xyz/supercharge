import { Badge, CoinLogo } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import ListItem from '../../components/ListItem';
import LoadingWrapper from '../../components/LoadingWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import StepTitle from '../../components/StepTitle';
import { useGetMappedNetworksForAssetQuery } from '../../generated/apollo-gql';
import { Context, Steps } from '../../providers/Store';

const NetworkSelection: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { t } = useTranslation();

  const { data, error, loading, refetch } = useGetMappedNetworksForAssetQuery({
    variables: {
      assetId: state.asset?.config?.mappedAssetId,
    },
  });

  useEffect(() => {
    if (
      data?.mappedNetworksForAssetByOrg?.length === 1 &&
      data.mappedNetworksForAssetByOrg[0]
    ) {
      if (state.prevStep >= Steps.NetworkSelection) {
        dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
      } else {
        dispatch({
          payload: data.mappedNetworksForAssetByOrg[0],
          type: 'SET_NETWORK',
        });
        dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
      }
    }
  }, [data?.mappedNetworksForAssetByOrg?.length]);

  if (data?.mappedNetworksForAssetByOrg?.length === 1) return null;

  if (!state.asset) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  if (loading)
    return (
      <LoadingWrapper
        message={t('copy.fetching_networks') || 'Fetching Networks...'}
      />
    );

  if (error)
    return (
      <ErrorWrapper
        description={t('copy.error_fetching_networks')}
        header={t('title.error_fetching_networks')}
        retry={refetch}
      />
    );

  // TODO: find the best network to bridge into
  const enabledNetworks = data?.mappedNetworksForAssetByOrg?.filter(
    (network) => !network?.bridged
  );
  const destinationNetwork = enabledNetworks?.[0];
  const bridgedNetworks = data?.mappedNetworksForAssetByOrg?.filter(
    (network) => network?.bridged
  );

  if (!enabledNetworks?.length && !bridgedNetworks?.length) return null;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-primary-200 dark:border-primary-700 dark:bg-primary-900">
        <InnerWrapper>
          <StepTitle
            testId="network-select"
            value={t('title.select_network')}
          />
        </InnerWrapper>
        <StateDescriptionHeader />
      </div>
      <div className="flex h-full flex-col overflow-hidden">
        <div className="layout-scrollbar relative z-10 flex flex-col dark:text-white">
          {data?.mappedNetworksForAssetByOrg?.map((network) =>
            network ? (
              <ListItem
                key={network.networkName}
                onClick={() => {
                  if (network.bridged && destinationNetwork) {
                    dispatch({
                      payload: destinationNetwork,
                      type: 'SET_DESTINATION_NETWORK',
                    });
                  }
                  dispatch({ payload: network, type: 'SET_NETWORK' });
                  dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
                }}
                role="button"
              >
                <div className="flex items-center gap-2">
                  <div className="flex w-4 justify-center">
                    <CoinLogo
                      height="h-4"
                      name={network.networkName || ''}
                      png={network.logo?.png || undefined}
                      svg={network.logo?.svg || undefined}
                      width="w-4"
                    />
                  </div>
                  <span>{network.networkName}</span>
                </div>
                <div className="flex items-center gap-2">
                  {network.bridged ? (
                    // @ts-ignore
                    <Badge color="green">{t('copy.bridged')}</Badge>
                  ) : null}
                  {state.network?.networkName === network.networkName ? (
                    <i className="fa fa-check-circle text-green-400" />
                  ) : (
                    <i className="fa fa-chevron-right text-xxs" />
                  )}
                </div>
              </ListItem>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

type Props = {};

export default NetworkSelection;
