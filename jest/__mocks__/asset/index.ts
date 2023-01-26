import {
  GetAssetByMappedAssetIdAndNetworkCodeDocument,
  GetAssetByMappedAssetIdAndNetworkCodeQueryVariables,
  GetAssetPriceDocument,
  GetAssetPriceQueryVariables,
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

export const getAssetPrice = (variables: GetAssetPriceQueryVariables) => {
  return {
    request: {
      query: GetAssetPriceDocument,
      variables,
    },
    result: {
      data: {
        __typename: 'Query',
        assetPrice: {
          __typename: 'AssetPrice',
          price: variables.assetId === 'ethereum123' ? 1000 : 20_000.11111111,
        },
      },
    },
  };
};
