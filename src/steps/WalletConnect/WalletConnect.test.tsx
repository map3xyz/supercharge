import { ethers } from 'ethers';

// import * as reactDeviceDetect from 'react-device-detect';
import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import { wait } from '../../utils/wait';

const TIMEOUT_BEFORE_MOCK_CONNECT = 100;
const TIMEOUT_BEFORE_MOCK_DISCONNECT = 200;

const mockConnect = jest.fn((event: string, callback: () => void) => {
  if (event === 'connect') {
    setTimeout(() => {
      callback();
    }, TIMEOUT_BEFORE_MOCK_CONNECT);
  }
});

const defaults = {
  connector: {
    accounts: ['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'],
    chainId: 1,
    connected: false,
    createSession: jest.fn(),
    on: mockConnect,
    peerMeta: {},
    uri: 'wc:123@1?bridge=bridge.org&key=456',
  },
  enable: jest.fn(),
  updateRpcUrl: jest.fn(),
};

const mockDefault = jest.fn(() => defaults);

jest.mock('@walletconnect/web3-provider', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockDefault()),
}));

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  return {
    ...originalModule,
    ethers: {
      ...originalModule.ethers,
      Contract: jest.fn(() => {
        return {
          estimateGas: {
            transfer: jest.fn(() => {
              return ethers.BigNumber.from(21_000);
            }),
          },
        };
      }),
      providers: {
        ...originalModule.ethers.providers,
        Web3Provider: jest.fn(),
      },
    },
  };
});

describe('WalletConnect', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          ...mockConfig,
          generateDepositAddress: async (_asset, _network) => {
            return { address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' };
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const ethereum = await screen.findByText('Ether');
    fireEvent.click(ethereum);
  });
  it('renders', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    fireEvent.click(walletConnect);
    expect(
      await screen.findByTestId('scan-wallet-connect')
    ).toBeInTheDocument();
  });
  it('handles connection', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    await act(async () => {
      fireEvent.click(walletConnect);
    });
    await screen.findByTestId('scan-wallet-connect');
    await act(async () => {
      await wait(TIMEOUT_BEFORE_MOCK_CONNECT);
    });
    expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
    expect(await screen.findByText(/0xf6/)).toBeInTheDocument();
    const input = await screen.findByTestId('input');
    await act(async () => {
      fireEvent.change(input, { target: { value: '1' } });
    });
    const form = await screen.findByTestId('enter-amount-form');
    await act(async () => {
      await fireEvent.submit(form);
    });
  });
  it('handles previous connection', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    await act(async () => {
      fireEvent.click(walletConnect);
    });
    mockDefault.mockImplementationOnce(() => ({
      ...defaults,
      connector: {
        ...defaults.connector,
        connected: true,
        peerMeta: { name: 'Rainbow' },
      },
    }));
    expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
  });
  it('handles connection error', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    await act(async () => {
      fireEvent.click(walletConnect);
    });
    mockConnect.mockImplementation(
      (event: string, callback: (error: Error) => void | Error) => {
        if (event === 'connect') {
          callback(new Error('Error connecting to WalletConnect.'));
        }
      }
    );
    expect(await screen.findByText('WalletConnect Error')).toBeInTheDocument();
  });
  it('handles disconnection', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    await act(async () => {
      fireEvent.click(walletConnect);
    });
    mockDefault.mockImplementationOnce(() => ({
      ...defaults,
      connector: {
        ...defaults.connector,
        peerMeta: { name: 'Rainbow' },
      },
    }));
    mockConnect.mockImplementation((event: string, callback: () => void) => {
      if (event === 'connect') {
        setTimeout(() => {
          callback();
        }, TIMEOUT_BEFORE_MOCK_CONNECT);
      }
      if (event === 'disconnect') {
        setTimeout(() => {
          callback();
        }, TIMEOUT_BEFORE_MOCK_DISCONNECT);
      }
    });
    await screen.findByTestId('scan-wallet-connect');
    await act(async () => {
      await wait(TIMEOUT_BEFORE_MOCK_CONNECT);
    });
    expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
    expect(await screen.findByText(/0xf6/)).toBeInTheDocument();
    await act(async () => {
      await wait(TIMEOUT_BEFORE_MOCK_DISCONNECT);
    });
    expect(await screen.findByText('Payment Method')).toBeInTheDocument();
  });
  it('handles disconnection error', async () => {
    const walletConnect = await screen.findByText('Rainbow');
    await act(async () => {
      fireEvent.click(walletConnect);
    });
    await mockConnect.mockImplementation(
      (event: string, callback: (error: Error) => void | Error) => {
        if (event === 'disconnect') {
          callback(new Error('Error connecting to WalletConnect.'));
        }
      }
    );
    expect(await screen.findByText('WalletConnect Error')).toBeInTheDocument();
  });

  // TODO: support walletconnect on mobile
  // describe('Mobile Deeplink', () => {
  //   Object.defineProperties(reactDeviceDetect, {
  //     BrowserView: {
  //       get: () => () => null,
  //     },
  //     MobileView: {
  //       get:
  //         () =>
  //         ({ children }: any) =>
  //           <>{children}</>,
  //     },
  //     isBrowser: { get: () => false },
  //     isMobile: { get: () => true },
  //   });
  //   it('displays a deeplink on mobile', async () => {
  //     const walletConnect = await screen.findByText('Rainbow');
  //     fireEvent.click(walletConnect);
  //     mockConnect.mockImplementation((event: string, callback: () => void) => {
  //       if (event === 'disconnect') {
  //         setTimeout(() => {
  //           callback();
  //         }, TIMEOUT_BEFORE_MOCK_DISCONNECT);
  //       }
  //     });
  //     const rainbow = await screen.findByText('Connect Rainbow');
  //     expect(rainbow).toBeInTheDocument();
  //   });
  //   it('encodes the connector uri if method is not MetaMask', async () => {
  //     const walletConnect = await screen.findByText('MetaMask (Mobile)');
  //     fireEvent.click(walletConnect);
  //     const connectBtn = await screen.findByTestId('connect-app');
  //     expect(connectBtn.getAttribute('href')).toBe(
  //       'metamask://wc?uri=wc:123@1?bridge=bridge.org&key=456'
  //     );
  //     const back = await screen.findByLabelText('Back');
  //     fireEvent.click(back);
  //     const rainbow = await screen.findByText('Rainbow');
  //     fireEvent.click(rainbow);
  //     const connectBtn2 = await screen.findByTestId('connect-app');
  //     expect(connectBtn2.getAttribute('href')).toBe(
  //       'rainbow://wc?uri=wc%3A123%401%3Fbridge%3Dbridge.org%26key%3D456'
  //     );
  //   });
  // });
  // TODO: support walletconnect on mobile
  // describe('Install App', () => {
  //   Object.defineProperties(reactDeviceDetect, {
  //     BrowserView: {
  //       get: () => () => null,
  //     },
  //     MobileView: {
  //       get:
  //         () =>
  //         ({ children }: any) =>
  //           <>{children}</>,
  //     },
  //     isBrowser: { get: () => false },
  //     isIOS: { get: () => true },
  //     isMobile: { get: () => true },
  //   });
  //   it('displays install app button after 1.2 seconds', async () => {
  //     const walletConnect = await screen.findByText('Rainbow');
  //     fireEvent.click(walletConnect);
  //     const rainbow = await screen.findByText('Connect Rainbow');
  //     fireEvent.click(rainbow);
  //     await act(async () => {
  //       await wait(1201);
  //     });
  //     expect(await screen.findByTestId('install-app')).toBeInTheDocument();
  //     expect(
  //       await screen.findByLabelText('app-store-badge')
  //     ).toBeInTheDocument();
  //     expect(
  //       await screen.queryByLabelText('google-play-badge')
  //     ).not.toBeInTheDocument();
  //   });
  // });
});
