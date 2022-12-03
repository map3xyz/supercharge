import React from 'react';

import { AppProps } from './App';
import ErrorWrapper from './components/ErrorWrapper';
import LoadingWrapper from './components/LoadingWrapper';
import { useGetAssetsForOrgQuery } from './generated/apollo-gql';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';

const AppWithAddress: React.FC<AppProps> = ({ config, onClose }) => {
  const { data, error, loading, refetch } = useGetAssetsForOrgQuery({
    variables: { address: config.address, assetId: config.assetId },
  });

  if (loading) return <LoadingWrapper />;

  const asset = data?.assetsForOrganization?.find(
    (asset) => asset?.id === config.assetId || asset?.address === config.address
  );

  if (error || !asset)
    return (
      <ErrorWrapper
        description="We had trouble finding that asset."
        header="Failed to initialize the SDK"
        retry={refetch}
      />
    );

  return (
    <Store {...config} asset={asset} network={undefined}>
      <Map3SdkSteps onClose={onClose} />
    </Store>
  );
};

export default AppWithAddress;
