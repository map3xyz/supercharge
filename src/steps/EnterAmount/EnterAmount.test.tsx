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
    await screen.findByText('Fetching Networks...');
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    await screen.findByText('Fetching Payment Methods...');
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);
  });

  it('renders', async () => {
    const enterAmount = await screen.findByTestId('enter-amount');
    expect(enterAmount).toBeInTheDocument();
  });
  it('handles no pricing available', async () => {
    const back = await screen.findByLabelText('Back');
    fireEvent.click(back);
    fireEvent.click(back);
    fireEvent.click(back);
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);
    const warning = await screen.findByText(
      'No pricing available for this asset.'
    );
    expect(warning).toBeInTheDocument();
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
  describe('submit', () => {
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('handles submission', async () => {
      await screen.findAllByText('Connect Wallet');
      await act(() => {
        testingUtils.mockAccountsChanged([
          '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        ]);
      });
      const confirmPayment = await screen.findByText('Confirm Payment');
      expect(confirmPayment).toBeInTheDocument();
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(await screen.findByText(/0xf6/)).toBeInTheDocument();
      expect(confirmPayment.parentElement?.parentElement).toBeDisabled();
    });
    it('attempts reconnection', async () => {
      testingUtils.lowLevel.mockRequest(
        'eth_requestAccounts',
        { message: 'User rejected the request.' },
        {
          shouldThrow: true,
        }
      );
      const connecting = await screen.findByText('Connecting...');
      expect(connecting).toBeInTheDocument();
      const error = await screen.findByText('User rejected the request.');
      expect(error).toBeInTheDocument();
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(await screen.findByText('Connecting...')).toBeInTheDocument();
    });
  });
});

describe('window.ethereum', () => {
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
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('Connection', () => {
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should handle accounts disconnecting', async () => {
      testingUtils.mockNotConnectedWallet();
      act(() => {
        testingUtils.mockAccountsChanged(['0x123willDisconnect']);
      });
      act(() => {
        global.window.ethereum.emit('accountsChanged', ['0x123willDisconnect']);
      });
      const confirm = await screen.findByText('Confirm Payment');
      expect(confirm).toBeInTheDocument();
      act(() => {
        testingUtils.mockAccountsChanged([]);
      });
      act(() => {
        global.window.ethereum.emit('accountsChanged', []);
      });
      const connectWallet = await screen.findByText('Connect Wallet');
      expect(connectWallet).toBeInTheDocument();
    });
  });

  describe('Previous Connection', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
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
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
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

  describe('Address generation error', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
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
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      const error = await screen.findByText(
        'Error generating a deposit address.'
      );
      expect(error).toBeInTheDocument();
    });
  });
});
