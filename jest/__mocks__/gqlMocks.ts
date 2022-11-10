import { MockedResponse } from '@apollo/client/testing';

import {
  GetAssetsForOrgDocument,
  GetNetworksDocument,
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
          {
            logo: {
              png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
              svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
            },
            name: 'Ethereum',
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
        methods: [
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
