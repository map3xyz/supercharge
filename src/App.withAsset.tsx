import React from 'react';

import { AppProps } from './App';
import ErrorWrapper from './components/ErrorWrapper';
import LoadingWrapper from './components/LoadingWrapper';
import { useGetAssetsQuery } from './generated/apollo-gql';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';

const AppWithAsset: React.FC<AppProps> = ({ config, onClose }) => {
  const [_, assetString] = config?.slug?.split(':') ?? [];
  // TODO: use asset search
  const { data, error, loading, refetch } = useGetAssetsQuery({
    variables: { limit: 10, offset: 0 },
  });

  if (loading) return <LoadingWrapper />;

  const asset = data?.assets?.find((asset) => asset?.name === assetString);

  if (error || !asset)
    return (
      <ErrorWrapper
        description="We had trouble finding that asset."
        header="Failed to initialize the SDK"
        retry={refetch}
      />
    );

  return (
    <Store {...config} asset={asset}>
      <Map3SdkSteps onClose={onClose} />
    </Store>
  );
};

export default AppWithAsset;
