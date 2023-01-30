import {
  GetMappedNetworksForAssetDocument,
  GetMappedNetworksForAssetQueryVariables,
  GetNetworkByChainIdDocument,
  GetNetworksDocument,
} from '../../../src/generated/apollo-gql';

const bitcoinNetwork = [
  {
    __typename: 'Network',
    decimals: 8,
    id: 'bitcoinId',
    identifiers: {
      chainId: null,
    },
    links: {
      explorer: 'https://blockstream.info',
    },
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
    },
    name: 'Bitcoin',
    networkCode: 'bitcoin',
    networkName: 'Bitcoin',
    symbol: 'BTC',
  },
];

export const networksForAssetMockResult = [
  {
    __typename: 'Network',
    decimals: 18,
    id: 'ethId',
    identifiers: {
      chainId: 1,
    },
    links: {
      explorer: 'https://etherscan.io',
    },
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Ethereum',
    networkCode: 'ethereum',
    networkName: 'Ethereum',
    symbol: 'ETH',
  },
  {
    __typename: 'Network',
    decimals: 18,
    identifiers: {
      chainId: 137,
    },
    links: {
      explorer: 'https://polygon.io',
    },
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/polygon/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/polygon/logo.svg',
    },
    name: 'Polygon',
    networkCode: 'polygon',
    networkName: 'Polygon Chain',
    symbol: 'MATIC',
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
      mappedNetworksForAssetByOrg:
        variables.assetId === 'satoshi123'
          ? bitcoinNetwork
          : variables.assetId === 'ethereum123'
          ? [networksForAssetMockResult[0]]
          : networksForAssetMockResult,
    },
  },
});

export const getNetworkByChainIdMock = (chainId: number) => ({
  request: {
    query: GetNetworkByChainIdDocument,
    variables: {
      chainId,
    },
  },
  result: {
    data: {
      __typename: 'Query',
      networkByChainId:
        chainId === 1
          ? networksForAssetMockResult[0]
          : networksForAssetMockResult[1],
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
          decimals: 18,
          identifiers: {
            chainId: null,
          },
          links: {
            explorer: 'https://blockchain.info',
          },
          logo: {
            png:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
            svg:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
          },
          name: 'Bitcoin',
          networkCode: 'bitcoin',
          networkName: 'Bitcoin',
          symbol: 'BTC',
        },
        {
          __typename: 'Network',
          decimals: 18,
          identifiers: {
            chainId: 1,
          },
          links: {
            explorer: 'https://etherscan.io',
          },
          logo: {
            png:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
            svg:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
          },
          name: 'Ethereum',
          networkCode: 'ethereum',
          networkName: 'Ethereum',
          symbol: 'ETH',
        },
        {
          __typename: 'Network',
          decimals: 18,
          identifiers: {
            chainId: 137,
          },
          links: {
            explorer: 'https://polygon.io',
          },
          logo: {
            png:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/polygon/logo.png',
            svg:
              'https://raw.githubusercontent.com/map3xyz/assets/master/networks/polygon/logo.svg',
          },
          name: 'Polygon',
          networkCode: 'polygon',
          networkName: 'Polygon Chain',
          symbol: 'MATIC',
        },
      ],
    },
  },
});
