import {
  GetPaymentMethodsDocument,
  GetPaymentMethodsQueryVariables,
} from '../../../src/generated/apollo-gql';

export const getMethodsMock = (variables: GetPaymentMethodsQueryVariables) =>
  variables.chainId
    ? {
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
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=co.rainbow',
                    ios: 'https://apps.apple.com/us/app/rainbow-wallet/id1477376905',
                  },
                  chains: [
                    'eip155:1',
                    'eip155:10',
                    'eip155:137',
                    'eip155:42161',
                  ],
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
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=com.spotwallet',
                    ios: 'https://apps.apple.com/us/app/spot-wallet/id1558385728',
                  },
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
                  app: {
                    android: 'https://metamask.app.link/android',
                    ios: 'https://metamask.app.link/ios',
                  },
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
      }
    : {
        request: {
          query: GetPaymentMethodsDocument,
          variables: { chainId: null },
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
      };
