import {
  GetPaymentMethodsDocument,
  GetPaymentMethodsQueryVariables,
} from '../../../src/generated/apollo-gql';

export const getMethodsMock = (variables: GetPaymentMethodsQueryVariables) =>
  variables.chainId
    ? {
        request: {
          query: GetPaymentMethodsDocument,
          variables,
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
                name: 'Show Address',
                value: 'show-address',
                walletConnect: null,
              },
              {
                flags: {
                  enabled: true,
                  memo: true,
                },
                icon: 'metamask',
                links: {
                  brave:
                    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
                  chrome:
                    'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
                  edge:
                    'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
                  firefox:
                    'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask',
                  opera:
                    'https://addons.opera.com/en-gb/extensions/details/metamask-10',
                },
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
                links: {
                  chrome:
                    'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
                },
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
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/6089655c-cb7e-414b-f742-01fdc154be00?projectId=75f2c16d7fce6364075928d3c6462f87',
                name: 'Rainbow',
                value: 'isWalletConnect',
                walletConnect: {
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=co.rainbow',
                    ios:
                      'https://apps.apple.com/us/app/rainbow-wallet/id1477376905',
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
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=75f2c16d7fce6364075928d3c6462f87',
                name: 'Spot',
                value: 'isWalletConnect',
                walletConnect: {
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=com.spotwallet',
                    ios:
                      'https://apps.apple.com/us/app/spot-wallet/id1558385728',
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
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/5195e9db-94d8-4579-6f11-ef553be95100?projectId=75f2c16d7fce6364075928d3c6462f87',
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
              {
                flags: {
                  enabled: true,
                  memo: false,
                },
                icon: '',
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=75f2c16d7fce6364075928d3c6462f87',
                name: 'No-Trust Wallet',
                value: 'isWalletConnect',
                walletConnect: {
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=com.notrustwallet',
                    ios:
                      'https://apps.apple.com/us/app/no-trust-wallet/id1500000000',
                  },
                  chains: [],
                  description:
                    'No-Trust Wallet is a mobile & secure non-custodial wallet for Ethereum, Polygon, Solana, Bitcoin, Tezos & NFTs. Access web3 & DeFi with WalletConnect.',
                  desktop: {
                    native: null,
                    universal: null,
                  },
                  mobile: {
                    native: null,
                    universal: null,
                  },
                },
              },
              {
                flags: {
                  enabled: true,
                  memo: true,
                },
                icon: '',
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=75f2c16d7fce6364075928d3c6462f87',
                name: 'Trust Wallet',
                value: 'isWalletConnect',
                walletConnect: {
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp',
                    ios:
                      'https://apps.apple.com/us/app/trust-wallet/id1288339409',
                  },
                  chains: [],
                  description:
                    'Trust Wallet is a mobile & secure non-custodial wallet for Ethereum, Polygon, Solana, Bitcoin, Tezos & NFTs. Access web3 & DeFi with WalletConnect.',
                  desktop: {
                    native: null,
                    universal: null,
                  },
                  mobile: {
                    native: 'trust:',
                    universal: 'https://trustwallet.com/',
                  },
                  name: 'Trust Wallet',
                },
              },
              {
                flags: {
                  enabled: true,
                  memo: false,
                },
                icon: '',
                logo:
                  'https://explorer-api.walletconnect.com/v3/logo/md/1bf33a89-b049-4a1c-d1f6-4dd7419ee400?projectId=75f2c16d7fce6364075928d3c6462f87',
                name: 'Mt Gox',
                value: 'isWalletConnect',
                walletConnect: {
                  app: {
                    android:
                      'https://play.google.com/store/apps/details?id=com.mtgox.android',
                    ios: 'https://apps.apple.com/us/app/mt-gox/id1500000000',
                  },
                  chains: ['eip155:77'],
                  description:
                    'Mt Gox is a mobile & (in)secure wallet for Bitcoin Satoshi Vision.',
                  desktop: {
                    native: null,
                    universal: null,
                  },
                  mobile: {
                    native: 'mtgox:',
                    universal: 'https://mtgox.com/',
                  },
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
                name: 'Show Address',
                value: 'show-address',
                walletConnect: null,
              },
            ],
          },
        },
      };
