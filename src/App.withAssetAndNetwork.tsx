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

const AppWithAssetAndNetwork: React.FC<AppProps> = ({ config, onClose }) => {
  const [networkString, assetString] = config?.slug?.split(':') ?? [];
  // TODO: use network search
  const { data, error, loading, refetch } = useGetNetworksQuery();
  // TODO: use asset search
  const {
    data: assetData,
    error: assetError,
    loading: assetLoading,
    refetch: assetRefetch,
  } = useGetAssetsForOrgQuery({
    variables: {
      limit: 10,
      offset: 0,
    },
  });

  if (loading || assetLoading) return <LoadingWrapper />;

  const network = data?.networks?.find(
    (network) => network?.name === networkString
  );
  const asset = assetData?.assetsForOrganization?.find(
    (asset) => asset?.name === assetString
  );

  if (error || assetError || !network || !asset)
    return (
      <ErrorWrapper
        description="We had trouble loading the asset or network selected."
        header="Failed to initialize the SDK"
        retry={() => {
          refetch();
          assetRefetch();
        }}
      />
    );
  return (
    <Store {...config} asset={asset} network={network}>
      <Map3SdkSteps onClose={onClose} />
    </Store>
  );
};
export default AppWithAssetAndNetwork;
