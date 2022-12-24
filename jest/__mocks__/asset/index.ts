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
        assetByMappedAssetIdAndNetworkCode: {
          address: '0x123ElonAddress',
        },
      },
    },
  };
};
