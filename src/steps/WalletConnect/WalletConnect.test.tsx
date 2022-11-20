import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import { wait } from '../../utils/wait';

const TIMEOUT_BEFORE_MOCK_CONNECT = 100;
const TIMEOUT_BEFORE_MOCK_DISCONNECT = 200;

const mockConnect = jest.fn((_event: string, callback: () => void) => {
  if (_event === 'connect') {
    setTimeout(() => {
      callback();
    }, TIMEOUT_BEFORE_MOCK_CONNECT);
  }
});

const defaults = {
  accounts: ['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'],
  createSession: jest.fn(),
  killSession: jest.fn(),
  on: mockConnect,
  uri: 'wc:123@1?bridge=bridge.org&key=456',
};

const mockDefault = jest.fn(() => defaults);

jest.mock('@walletconnect/client', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockDefault()),
}));

describe('WalletConnect', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            throw 'Error generating deposit address.';
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const walletConnect = await screen.findByText('Rainbow');
    fireEvent.click(walletConnect);
  });
  it('renders', async () => {
    expect(
      await screen.findByTestId('scan-wallet-connect')
    ).toBeInTheDocument();
  });
  it('handles connection', async () => {
    await screen.findByTestId('scan-wallet-connect');
    await act(async () => {
      await wait(TIMEOUT_BEFORE_MOCK_CONNECT);
    });
    expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
    expect(await screen.findByText(/0xf6/)).toBeInTheDocument();
  });
  it('handles previous connection', async () => {
    mockDefault.mockImplementationOnce(() => ({
      ...defaults,
      connected: true,
      peerMeta: { name: 'Rainbow' },
    }));
    expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
  });
  it('handles connection error', async () => {
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
    mockConnect.mockImplementation(
      (event: string, callback: (error: Error) => void | Error) => {
        if (event === 'disconnect') {
          callback(new Error('Error connecting to WalletConnect.'));
        }
      }
    );
    expect(await screen.findByText('WalletConnect Error')).toBeInTheDocument();
  });
});
