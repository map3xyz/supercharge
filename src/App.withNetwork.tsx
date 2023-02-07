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

const AppWithNetwork: React.FC<AppProps> = ({ config, onClose }) => {
  const { selection } = config.options || {};
  const { networkCode } = selection || {};

  const { data, error, loading, refetch } = useGetNetworksQuery();
  const {
    data: assetsData,
    error: assetsError,
    loading: assetsLoading,
    refetch: assetsRefetch,
  } = useGetAssetsForOrgQuery();

  if (loading || assetsLoading) return <LoadingWrapper />;

  const network = data?.networks?.find(
    (network) => network?.networkCode === networkCode
  );
  const asset = assetsData?.assetsForOrganization?.find(
    (asset) => asset?.networkCode === networkCode && asset?.type === 'network'
  );

  if (error || assetsError || !network || !asset)
    return (
      <ErrorWrapper
        description="We had trouble loading the network selected."
        header="Failed to initialize the SDK"
        retry={() => {
          refetch();
          assetsRefetch();
        }}
      />
    );
  return (
    <Store {...config} asset={asset} network={network}>
      <Map3SdkSteps onClose={onClose} />
    </Store>
  );
};
export default AppWithNetwork;
