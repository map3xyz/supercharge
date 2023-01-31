import {
  GetAssetByAddressAndNetworkCodeDocument,
  GetAssetByAddressAndNetworkCodeQueryVariables,
  GetAssetsForOrgDocument,
  GetAssetsForOrgQueryVariables,
  SearchAssetsDocument,
} from '../../../src/generated/apollo-gql';

export const assetsForOrganizationMockResult = [
  {
    __typename: 'Asset',
    address: null,
    config: {
      mappedAssetId: 'satoshi123',
    },
    decimals: 8,
    id: 'satoshi123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
    },
    name: 'Bitcoin',
    networkCode: 'bitcoin',
    networks: {
      name: 'Bitcoin',
      networkCode: 'bitcoin',
    },
    symbol: 'BTC',
    type: 'network',
  },
  {
    __typename: 'Asset',
    address: null,
    config: {
      mappedAssetId: 'ethereum123',
    },
    decimals: 18,
    id: 'ethereum123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Ether',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'ETH',
    type: 'network',
  },
  {
    __typename: 'Asset',
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    config: {
      mappedAssetId: 'elon123',
    },
    decimals: 6,
    id: 'elon123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'ElonCoin',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'ELON',
    type: 'asset',
  },
  {
    __typename: 'Asset',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    config: {
      mappedAssetId: 'usdc123',
    },
    decimals: 6,
    id: 'usdc123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'USD Coin',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'USDC',
    type: 'asset',
  },
  {
    __typename: 'Asset',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    config: {
      mappedAssetId: 'dai123',
    },
    decimals: 18,
    id: 'dai123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Dai',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'DAI',
    type: 'asset',
  },
  {
    __typename: 'Asset',
    address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    config: {
      mappedAssetId: 'wbtc123',
    },
    decimals: 8,
    id: 'wbtc123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Wrapped Bitcoin',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'WBTC',
    type: 'asset',
  },
  {
    __typename: 'Asset',
    address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
    config: {
      mappedAssetId: 'aave123',
    },
    decimals: 18,
    id: 'aave123',
    logo: {
      png:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg:
        'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Aave',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    symbol: 'AAVE',
    type: 'asset',
  },
];

export const getAssetsForOrgMock = (
  variables: GetAssetsForOrgQueryVariables
) => ({
  request: {
    query: GetAssetsForOrgDocument,
    variables,
  },
  result: {
    __typename: 'Query',
    data: { assetsForOrganization: assetsForOrganizationMockResult },
  },
});

export const searchAssetsMock = () => ({
  request: {
    query: SearchAssetsDocument,
    variables: {
      query: 'Bitcoin',
    },
  },
  result: {
    __typename: 'Query',
    data: {
      searchAssetsForOrganization: [assetsForOrganizationMockResult[0]],
    },
  },
});

export const getAssetByAddressAndNetworkCodeMock = (
  variables: GetAssetByAddressAndNetworkCodeQueryVariables
) => {
  return {
    request: {
      query: GetAssetByAddressAndNetworkCodeDocument,
      variables,
    },
    result: {
      __typename: 'Query',
      data: {
        assetByAddressAndNetworkCodeForOrganization:
          assetsForOrganizationMockResult[2],
      },
    },
  };
};
