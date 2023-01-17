import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { web3Mock } from '~/jest/__mocks__/web3Mock';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import WalletConnect from '../../components/methods/WalletConnect';
import WindowEthereum from '../../components/methods/WindowEthereum';
import * as useWeb3Mock from '../../hooks/useWeb3';
import EnterAmount from '.';

jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');
  return {
    ...originalModule,
    ethers: {
      ...originalModule.ethers,
      Contract: jest.fn(() => {
        return {
          balanceOf: jest.fn(),
          estimateGas: {
            transfer: jest.fn(() => {
              return ethers.BigNumber.from(21_000);
            }),
          },
        };
      }),
    },
  };
});

describe('Enter Amount', () => {
  beforeEach(async () => {
    render(<App config={mockConfig} onClose={() => {}} />);
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    act(() => {
      fireEvent.click(bitcoin);
    });
    await screen.findByText('Fetching Networks...');
    const ethereum = await screen.findByText('Ethereum');
    act(() => {
      fireEvent.click(ethereum);
    });
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
    act(() => {
      fireEvent.click(back);
    });
    act(() => {
      fireEvent.click(back);
    });
    act(() => {
      fireEvent.click(back);
    });
    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    act(() => {
      fireEvent.click(elonCoin);
    });
    const ethereum = await screen.findByText('Ethereum');
    act(() => {
      fireEvent.click(ethereum);
    });
    const metaMask = await screen.findByText('MetaMask');
    act(() => {
      fireEvent.click(metaMask);
    });
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
      expect(quote.textContent).toBe('0.00005');
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
      expect(quote.textContent).toBe('1.0');
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
      testingUtils.mockAccountsChanged([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
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
      const form = await screen.findByTestId('enter-amount-form');
      await act(async () => {
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
          ...mockConfig,
          generateDepositAddress: async () => {
            throw 'Error generating deposit address.';
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    await screen.findByText('Fetching Networks...');
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
      act(() => {
        testingUtils.lowLevel.mockRequest('eth_accounts', []);
        testingUtils.lowLevel.mockRequest('eth_requestAccounts', [
          '0x123EthReqAccounts',
        ]);
      });
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should connect', async () => {
      expect(await screen.findByText('Connecting...')).toBeInTheDocument();
      expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
    });

    it('should handle accounts disconnecting', async () => {
      act(() => {
        testingUtils.mockNotConnectedWallet();
        testingUtils.mockAccountsChanged(['0x123willDisconnect']);
        testingUtils.mockAccountsChanged([]);
      });
      global.window.ethereum.emit('accountsChanged', ['0x123willDisconnect']);
      const confirm = await screen.findByText('Confirm Payment');
      expect(confirm).toBeInTheDocument();
      act(() => {
        global.window.ethereum.emit('accountsChanged', []);
      });
      const connectWallet = await screen.findByText('Connect Wallet');
      expect(connectWallet).toBeInTheDocument();
    });
  });

  describe('Connection declined', () => {
    const consoleSpy = jest.spyOn(console, 'error');
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.lowLevel.mockRequest(
        'eth_requestAccounts',
        [
          {
            message:
              'Really long error message that will cause an ugly UI display. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          },
        ],
        { shouldThrow: true }
      );
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should console error', async () => {
      await screen.findByText('Connecting...');
      expect(consoleSpy).toHaveBeenCalled();
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

    it('show an error', async () => {
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
      const error = await screen.findByText('Deposit address not found.');
      expect(error).toBeInTheDocument();
    });
  });
});

describe('window.ethereum > ERC20', () => {
  const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

  const getBalanceMock = jest.fn().mockImplementation(() => ({
    assetBalance: ethers.BigNumber.from('100000000'),
    chainBalance: ethers.BigNumber.from('20000000000000000000'),
  }));
  const mockSendTransaction = jest.fn();
  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      getBalance: getBalanceMock,
      sendTransaction: mockSendTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          generateDepositAddress: async () => {
            return {
              address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
              memo: 'memo',
            };
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('transaction', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(() => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      testingUtils.lowLevel.mockRequest('eth_gasPrice', () => '0x10cd96a16e');
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('should handle erc20 transaction', async () => {
      await screen.findByText(/Max: 100/);
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(mockSendTransaction).toHaveBeenCalledWith(
        '1.0',
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
      );
      expect(await screen.findByText('Submitted')).toBeInTheDocument();
    });
  });
});

describe('txAuth - Failure', () => {
  const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

  const getBalanceMock = jest.fn().mockImplementation(() => ({
    assetBalance: ethers.BigNumber.from('100000000'),
    chainBalance: ethers.BigNumber.from('20000000000000000000'),
  }));

  const mockAuthTransactionProxy = jest.fn();
  const mockSendTransaction = jest.fn();
  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      authorizeTransactionProxy: mockAuthTransactionProxy,
      getBalance: getBalanceMock,
      sendTransaction: mockSendTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          authorizeTransaction: async () => {
            return false;
          },
          generateDepositAddress: async () => {
            return {
              address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
              memo: 'memo',
            };
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('transaction auth failure', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });

    beforeAll(async () => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      testingUtils.lowLevel.mockRequest('eth_gasPrice', () => '0x10cd96a16e');
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('should not authorize transaction', async () => {
      await screen.findByText(/Max: 100/);
      act(() => {
        const form = screen.getByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(mockAuthTransactionProxy).toHaveBeenCalledWith(
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        'ethereum',
        '1.0'
      );
      expect(mockSendTransaction).not.toHaveBeenCalled();
    });
  });
});

describe('txAuth - Success', () => {
  const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

  const getBalanceMock = jest.fn().mockImplementation(() => ({
    assetBalance: ethers.BigNumber.from('100000000'),
    chainBalance: ethers.BigNumber.from('20000000000000000000'),
  }));

  const mockAuthTransactionProxy = jest.fn();
  const mockSendTransaction = jest.fn();
  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      authorizeTransactionProxy: mockAuthTransactionProxy,
      getBalance: getBalanceMock,
      sendTransaction: mockSendTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          authorizeTransaction: async () => {
            return true;
          },
          generateDepositAddress: async () => {
            return {
              address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
              memo: 'memo',
            };
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('transaction auth success', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(async () => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      testingUtils.lowLevel.mockRequest('eth_gasPrice', () => '0x10cd96a16e');
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('should authorize transaction', async () => {
      await screen.findByText(/Max: 100/);
      await act(async () => {
        const form = screen.getByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(mockAuthTransactionProxy).toHaveBeenCalledWith(
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        'ethereum',
        '1.0'
      );
      expect(mockSendTransaction).toHaveBeenCalled();
    });
  });
});

describe('EnterAmount - MaxLimit', () => {
  const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

  const getBalanceMock = jest.fn().mockImplementation(() => ({
    assetBalance: ethers.BigNumber.from('100000000'),
    chainBalance: ethers.BigNumber.from('2000000000000000000'),
  }));

  const mockAuthTransactionProxy = jest.fn();
  const mockSendTransaction = jest.fn();
  beforeEach(async () => {
    // @ts-ignore
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      authorizeTransactionProxy: mockAuthTransactionProxy,
      estimateGas: jest.fn(() =>
        Promise.resolve(ethers.BigNumber.from('21000'))
      ),
      getBalance: getBalanceMock,
      getFeeData: jest.fn(() => ({
        maxFeePerGas: ethers.BigNumber.from('2000000000'),
        maxPriorityFeePerGas: ethers.BigNumber.from('1500000000'),
      })),
      sendTransaction: mockSendTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          authorizeTransaction: async () => {
            return true;
          },
          generateDepositAddress: async () => {
            return {
              address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
            };
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const ethCoin = await screen.findByText('Ether');
    fireEvent.click(ethCoin);
    await screen.findByText('Fetching Networks...');
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('max amount', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(async () => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      testingUtils.lowLevel.mockRequest('eth_gasPrice', () => '0x10cd96a16e');
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    // chainBalance = 20000000000000000000 wei
    // gasLimit = 21000 units
    // maxFeePerGas = 2000000000 wei
    // 20000000000000000000 - 21000 * 2000000000 = 1999958000000000000
    // 1999958000000000000 = 1.999958 ETH
    it('should show max amount', async () => {
      expect(await screen.findByText(/Max: 1.999958 ETH/)).toBeInTheDocument();
    });
  });
});

describe('Enter Amount Errors', () => {
  it('renders', () => {
    render(<EnterAmount />);
    expect(true).toBe(true);
  });
});

describe('WindowEthereum Errors', () => {
  it('renders', () => {
    render(
      <WindowEthereum amount="1.000" disabled={false} setFormError={() => {}} />
    );
    expect(true).toBe(true);
  });
});

describe('WalletConnect Errors', () => {
  it('renders', () => {
    render(<WalletConnect amount="1.000" disabled={false} />);
    expect(true).toBe(true);
  });
});
