import {
  GetAssetsForOrgDocument,
  GetAssetsForOrgQueryVariables,
  SearchAssetsDocument,
} from '../../../src/generated/apollo-gql';

export const assetsForOrganizationMockResult = [
  {
    __typename: 'AssetWithPrice',
    address: null,
    config: {
      mappedAssetId: 'satoshi123',
    },
    decimals: 8,
    id: 'satoshi123',
    logo: {
      png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
    },
    name: 'Bitcoin',
    networkCode: 'bitcoin',
    networks: {
      name: 'Bitcoin',
      networkCode: 'bitcoin',
    },
    price: {
      price: 20_000,
    },
    symbol: 'BTC',
    type: 'network',
  },
  {
    __typename: 'AssetWithPrice',
    address: null,
    config: {
      mappedAssetId: 'ethereum123',
    },
    decimals: 18,
    id: 'ethereum123',
    logo: {
      png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'Ether',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    price: {
      price: 1_000,
    },
    symbol: 'ETH',
    type: 'network',
  },
  {
    __typename: 'AssetWithPrice',
    address: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
    config: {
      mappedAssetId: 'elon123',
    },
    decimals: 6,
    id: 'elon123',
    logo: {
      png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
    },
    name: 'ElonCoin',
    networkCode: 'ethereum',
    networks: {
      name: 'Ethereum',
      networkCode: 'ethereum',
    },
    price: null,
    symbol: 'ELON',
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
