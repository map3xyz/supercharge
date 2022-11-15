import { MockedResponse } from '@apollo/client/testing';

import {
  GetAssetsForOrgDocument,
  GetNetworksDocument,
  GetNetworksForAssetDocument,
  GetPaymentMethodsDocument,
} from '../../src/generated/apollo-gql';

export const mocks: MockedResponse[] = [
  {
    request: {
      query: GetAssetsForOrgDocument,
      variables: {
        limit: 10,
        offset: 0,
      },
    },
    result: {
      data: {
        assetsForOrganization: [
          {
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
          },
          {
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
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetNetworksDocument,
    },
    result: {
      data: {
        networks: [
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
  },
  {
    request: {
      query: GetNetworksForAssetDocument,
      variables: {
        assetId: 'elon123',
      },
    },
    result: {
      data: {
        networksForAssetByOrg: [
          {
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
  },
  {
    request: {
      query: GetNetworksForAssetDocument,
      variables: {
        assetId: 'satoshi123',
      },
    },
    result: {
      data: {
        networksForAssetByOrg: [
          {
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
  },
  {
    request: {
      query: GetPaymentMethodsDocument,
    },
    result: {
      data: {
        methodsForNetwork: [
          {
            enabled: true,
            icon: 'fa fa-qrcode',
            logo: '',
            name: 'Scan QR Code',
            value: 'qr',
          },
        ],
      },
    },
  },
  {
    request: {
      query: GetPaymentMethodsDocument,
      variables: { chainId: 1 },
    },
    result: {
      data: {
        methodsForNetwork: [
          {
            enabled: true,
            icon: 'fa fa-qrcode',
            logo: '',
            name: 'Scan QR Code',
            value: 'qr',
          },
          {
            enabled: true,
            icon: 'metamask',
            logo: '',
            name: 'MetaMask',
            value: 'isMetaMask',
          },
          {
            enabled: true,
            icon: 'coinbase',
            logo: '',
            name: 'Coinbase Wallet',
            value: 'isCoinbaseWallet',
          },
        ],
      },
    },
  },
];
