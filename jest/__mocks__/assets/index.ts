import {
  GetAssetsForOrgDocument,
  GetAssetsForOrgQueryVariables,
  SearchAssetsDocument,
} from '../../../src/generated/apollo-gql';

export const assetsForOrganizationMockResult = [
  {
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
    address: '0x123ElonAddress',
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
    data: {
      searchAssetsForOrganization: [
        {
          logo: {
            png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
            svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
          },
          name: 'Bitcoin',
          symbol: 'BTC',
        },
      ],
    },
  },
});
