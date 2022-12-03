import {
  GetMappedNetworksForAssetDocument,
  GetMappedNetworksForAssetQueryVariables,
  GetNetworksDocument,
} from '../../../src/generated/apollo-gql';

export const networksForAssetMockResult = [
  {
    __typename: 'Network',
    id: 'ethId',
    identifiers: {
      chainId: 1,
    },
    logo: {
      png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Ethereum',
    networkCode: 'ethereum',
    symbol: 'ETH',
  },
];

export const getMappedNetworksForOrgMock = (
  variables: GetMappedNetworksForAssetQueryVariables
) => ({
  request: {
    query: GetMappedNetworksForAssetDocument,
    variables,
  },
  result: {
    data: {
      __typename: 'Query',
      mappedNetworksForAssetByOrg: networksForAssetMockResult,
    },
  },
});

export const getNetworksMock = () => ({
  request: {
    query: GetNetworksDocument,
  },
  result: {
    data: {
      __typename: 'Query',
      networks: [
        {
          __typename: 'Network',
          identifiers: {
            chainId: null,
          },
          logo: {
            png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
            svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
          },
          name: 'Bitcoin',
          networkCode: 'bitcoin',
          symbol: 'BTC',
        },
        {
          __typename: 'Network',
          identifiers: {
            chainId: 1,
          },
          logo: {
            png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
            svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
          },
          name: 'Ethereum',
          networkCode: 'ethereum',
          symbol: 'ETH',
        },
      ],
    },
  },
});
