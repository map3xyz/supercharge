import { generateTestingUtils } from 'eth-testing';

import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

describe('Enter Amount', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            return '0x0000000000000000000000000000000000000000';
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('ETH');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);
  });

  it('renders', async () => {
    const enterAmount = await screen.findByTestId('enter-amount');
    expect(enterAmount).toBeInTheDocument();
  });
  describe('input', () => {
    beforeEach(async () => {
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
    });
    it('handles conversion', async () => {
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('0.00005000');
    });
    it('toggles base', async () => {
      const toggleBase = await screen.findByTestId('toggle-base');
      act(() => {
        fireEvent.click(toggleBase);
      });
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '0.00005000' } });
      });
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('1.00');
    });
  });
});

describe('Enter Amount - MetaMask', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            throw 'error';
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('ETH');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('Connection', () => {
    const testingUtils = generateTestingUtils({ verbose: true });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should connect wallet', async () => {
      const connecting = await screen.findByText('Connecting...');
      expect(connecting).toBeInTheDocument();
      await act(() => {
        testingUtils.mockAccountsChanged([
          '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        ]);
      });
      const confirmPayment = await screen.findByText('Confirm Payment');
      expect(confirmPayment).toBeInTheDocument();
    });
    it('should handle no accounts connected', async () => {
      testingUtils.mockNotConnectedWallet();
      const connecting = await screen.findByText('Connecting...');
      expect(connecting).toBeInTheDocument();
      act(() => {
        testingUtils.mockAccountsChanged([]);
      });
      const connectWallet = await screen.findByText('Connect Wallet');
      expect(connectWallet).toBeInTheDocument();
    });
  });

  describe('Previous Connection', () => {
    const testingUtils = generateTestingUtils({ verbose: true });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should handle previous connection', async () => {
      const confirmPayment = await screen.findByText('Confirm Payment');
      expect(confirmPayment).toBeInTheDocument();
    });
  });

  describe('Error', () => {
    const testingUtils = generateTestingUtils({ verbose: true });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      testingUtils.lowLevel.mockRequest(
        'eth_requestAccounts',
        { message: 'User rejected the request.' },
        {
          shouldThrow: true,
        }
      );
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should handle connection error', async () => {
      const connecting = await screen.findByText('Connecting...');
      expect(connecting).toBeInTheDocument();
      const connectWallet = await screen.findByText('Connect Wallet');
      const error = await screen.findByText('User rejected the request.');
      expect(connectWallet).toBeInTheDocument();
      expect(error).toBeInTheDocument();
    });
  });
});
