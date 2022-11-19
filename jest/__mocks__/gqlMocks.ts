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
            walletConnect: null,
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
            walletConnect: null,
          },
          {
            enabled: true,
            icon: 'metamask',
            logo: '',
            name: 'MetaMask',
            value: 'isMetaMask',
            walletConnect: null,
          },
          {
            enabled: true,
            icon: 'coinbase',
            logo: '',
            name: 'Coinbase Wallet',
            value: 'isCoinbaseWallet',
            walletConnect: null,
          },
          {
            enabled: true,
            icon: '',
            logo: 'https://explorer-api.walletconnect.com/v3/logo/md/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
            name: 'Rainbow',
            value: 'isWalletConnect',
            walletConnect: {
              app: {
                android:
                  'https://play.google.com/store/apps/details?id=me.rainbow',
                browser: null,
                ios: 'https://apps.apple.com/app/rainbow-ethereum-wallet/id1457119021',
                linux: null,
                mac: null,
                windows: null,
              },
              app_type: 'wallet',
              chains: ['eip155:1', 'eip155:10', 'eip155:137', 'eip155:42161'],
              description:
                'Rainbow is a fun, simple, and secure way to get started with crypto and explore the new world of Ethereum',
              desktop: {
                native: null,
                universal: null,
              },
              homepage: 'https://rainbow.me/',
              id: '1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369',
              image_id: '6089655c-cb7e-414b-f742-01fdc154be00',
              image_url: {
                lg: 'https://explorer-api.walletconnect.com/v3/logo/lg/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
                md: 'https://explorer-api.walletconnect.com/v3/logo/md/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
                sm: 'https://explorer-api.walletconnect.com/v3/logo/sm/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
              },
              metadata: {
                colors: {
                  primary: '#001e59',
                  secondary: null,
                },
                shortName: 'Rainbow',
              },
              mobile: {
                native: 'rainbow:',
                universal: 'https://rnbwapp.com',
              },
              name: 'Rainbow',
              sdks: ['sign_v1'],
              versions: ['1'],
            },
          },
        ],
      },
    },
  },
];
