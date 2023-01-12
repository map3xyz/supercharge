import {
  GetAssetByMappedAssetIdAndNetworkCodeDocument,
  GetAssetByMappedAssetIdAndNetworkCodeQueryVariables,
} from '../../../src/generated/apollo-gql';

export const getAssetByMappedAssetIdAndNetworkCodeMock = (
  variables: GetAssetByMappedAssetIdAndNetworkCodeQueryVariables
) => {
  return {
    request: {
      query: GetAssetByMappedAssetIdAndNetworkCodeDocument,
      variables,
    },
    result: {
      data: {
        __typename: 'Query',
        assetByMappedAssetIdAndNetworkCode: {
          __typename: 'Asset',
          address: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        },
      },
    },
  };
};
