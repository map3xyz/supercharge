import React from 'react';

import { AppProps } from './App';
import ErrorWrapper from './components/ErrorWrapper';
import LoadingWrapper from './components/LoadingWrapper';
import {
  useGetAssetsForOrgQuery,
  useGetNetworksQuery,
} from './generated/apollo-gql';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';

const AppWithAssetId: React.FC<AppProps> = ({ config, onClose }) => {
  const { selection } = config.options || {};
  const { assetId } = selection || {};
  const { data, error, loading, refetch } = useGetAssetsForOrgQuery({
    variables: { assetId: assetId },
  });

  const {
    data: networkData,
    error: networkError,
    loading: networkLoading,
    refetch: networkRefetch,
  } = useGetNetworksQuery();

  const retry = async () => {
    await refetch();
    await networkRefetch();
  };

  if (loading || networkLoading) return <LoadingWrapper />;

  const asset = data?.assetsForOrganization?.find(
    (asset) => asset?.id === assetId
  );
  const network = networkData?.networks?.find(
    (n) => n?.networkCode === asset?.networkCode
  );

  if (error || networkError || !asset || !network)
    return (
      <ErrorWrapper
        description="We had trouble finding that asset."
        header="Failed to initialize the SDK"
        retry={retry}
      />
    );

  return (
    <Store {...config} asset={asset} network={network}>
      <Map3SdkSteps onClose={onClose} />
    </Store>
  );
};

export default AppWithAssetId;
