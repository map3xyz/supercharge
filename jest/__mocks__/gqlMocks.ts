import { MockedResponse } from '@apollo/client/testing';

import {
  GetAssetsForOrgDocument,
  GetNetworksDocument,
  GetNetworksForAssetDocument,
  GetPaymentMethodsDocument,
  SearchAssetsDocument,
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
            address: null,
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
        ],
      },
    },
  },
  {
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
            flags: {
              enabled: true,
              memo: false,
            },
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
            flags: {
              enabled: true,
              memo: false,
            },
            icon: 'fa fa-qrcode',
            logo: '',
            name: 'Scan QR Code',
            value: 'qr',
            walletConnect: null,
          },
          {
            flags: {
              enabled: true,
              memo: true,
            },
            icon: 'metamask',
            logo: '',
            name: 'MetaMask',
            value: 'isMetaMask',
            walletConnect: null,
          },
          {
            flags: {
              enabled: true,
              memo: true,
            },
            icon: 'coinbase',
            logo: '',
            name: 'Coinbase Wallet',
            value: 'isCoinbaseWallet',
            walletConnect: null,
          },
          {
            flags: {
              enabled: true,
              memo: true,
            },
            icon: '',
            logo: 'https://explorer-api.walletconnect.com/v3/logo/md/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
            name: 'Rainbow',
            value: 'isWalletConnect',
            walletConnect: {
              chains: ['eip155:1', 'eip155:10', 'eip155:137', 'eip155:42161'],
              description:
                'Rainbow is a fun, simple, and secure way to get started with crypto and explore the new world of Ethereum',
              desktop: {
                native: null,
                universal: null,
              },
              mobile: {
                native: 'rainbow:',
                universal: 'https://rnbwapp.com',
              },
              name: 'Rainbow',
            },
          },
          {
            flags: {
              enabled: true,
              memo: false,
            },
            icon: '',
            logo: 'https://explorer-api.walletconnect.com/v3/logo/md/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=75f2c16d7fce6364075928d3c6462f87',
            name: 'Spot',
            value: 'isWalletConnect',
            walletConnect: {
              chains: [],
              description:
                'Spot is a mobile & secure non-custodial wallet for Ethereum, Polygon, Solana, Bitcoin, Tezos & NFTs. Access web3 & DeFi with WalletConnect.',
              desktop: {
                native: null,
                universal: null,
              },
              mobile: {
                native: 'spot:',
                universal: 'https://spot.so/',
              },
              name: 'Spot',
            },
          },
          {
            flags: {
              enabled: true,
              memo: false,
            },
            icon: '',
            logo: 'https://explorer-api.walletconnect.com/v3/logo/md/5195e9db-94d8-4579-6f11-ef553be95100?projectId=75f2c16d7fce6364075928d3c6462f87',
            name: 'MetaMask',
            value: 'isWalletConnect',
            walletConnect: {
              chains: [],
              description:
                'Whether you are an experienced user or brand new to blockchain, MetaMask helps you connect to the decentralized web: a new internet.',
              desktop: {
                native: null,
                universal: null,
              },
              mobile: {
                native: 'metamask:',
                universal: 'https://metamask.app.link',
              },
              name: 'MetaMask',
            },
          },
        ],
      },
    },
  },
];
