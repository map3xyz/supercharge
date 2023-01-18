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
          address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        },
      },
    },
  };
};
