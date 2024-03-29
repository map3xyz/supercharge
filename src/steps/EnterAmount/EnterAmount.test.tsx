import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { web3Mock } from '~/jest/__mocks__/web3Mock';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import WalletConnect from '../../components/methods/WalletConnect';
import WindowEthereum from '../../components/methods/WindowEthereum';
import * as useWeb3Mock from '../../hooks/useWeb3';
import { wait } from '../../utils/wait';
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
    const ether = await screen.findByText('Ether');
    await act(() => {
      fireEvent.click(ether);
    });
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);
  });

  it('renders', async () => {
    const enterAmount = await screen.findByTestId('enter-amount');
    expect(enterAmount).toBeInTheDocument();
  });
  it('handles no pricing available', async () => {
    const back = await screen.findByLabelText('Back');
    await act(() => {
      fireEvent.click(back);
    });
    await act(() => {
      fireEvent.click(back);
    });
    await act(() => {
      fireEvent.click(back);
    });
    await act(async () => {
      await wait(1000);
    });
    await screen.findByText('Loading...');
    const elonCoin = await screen.findByText('ElonCoin');
    await act(() => {
      fireEvent.click(elonCoin);
    });
    const ethereum = await screen.findByText('Ethereum');
    await act(() => {
      fireEvent.click(ethereum);
    });
    const metaMask = await screen.findByText('MetaMask');
    await act(() => {
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
      await act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
    });
    it('handles conversion', async () => {
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('0.001');
    });
    it('toggles base', async () => {
      const toggleBase = await screen.findByTestId('toggle-base');
      await act(() => {
        fireEvent.click(toggleBase);
      });
      const input = await screen.findByTestId('input');
      await act(() => {
        fireEvent.change(input, { target: { value: '0.00005000' } });
      });
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('0.05');
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
      testingUtils.mockAccountsChanged([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      const confirmPayment = await screen.findByText('Confirm Payment');
      expect(confirmPayment).toBeInTheDocument();
      const input = await screen.findByTestId('input');
      await act(() => {
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
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              onAddressRequested: () => {
                throw 'Error generating deposit address.';
              },
            },
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
    await act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('Connection', () => {
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(async () => {
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.lowLevel.mockRequest('eth_accounts', []);
      testingUtils.lowLevel.mockRequest('eth_requestAccounts', [
        '0x123EthReqAccounts',
      ]);
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });

    it('should connect', async () => {
      expect(await screen.findByText('Confirm Payment')).toBeInTheDocument();
    });

    it('should handle accounts disconnecting', async () => {
      await act(async () => {
        testingUtils.mockNotConnectedWallet();
        testingUtils.mockRequestAccounts([]);
        testingUtils.mockAccountsChanged(['0x123willDisconnect']);
      });
      const confirm = await screen.findByText('Confirm Payment');
      expect(confirm).toBeInTheDocument();
      await act(async () => {
        testingUtils.mockAccountsChanged([]);
      });
      const connectWallet = await screen.findByText('Connect Wallet');
      expect(connectWallet).toBeInTheDocument();
    });
  });

  describe('Previous Connection', () => {
    const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
    beforeAll(async () => {
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
    beforeAll(async () => {
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
      await act(() => {
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
  const getTransactionMock = jest.fn().mockImplementation(() => true);
  const prepareFinalTransactionMock = jest.fn();
  const waitForTransactionMock = jest.fn().mockImplementation(() => ({
    blockNumber: 1,
  }));
  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      getBalance: getBalanceMock,
      getTransaction: getTransactionMock,
      prepareFinalTransaction: prepareFinalTransactionMock,
      waitForTransaction: waitForTransactionMock,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              onAddressRequested: () => {
                return {
                  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                  memo: 'memo',
                };
              },
            },
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
    await act(() => {
      fireEvent.change(input, { target: { value: '1' } });
    });
  });

  describe('transaction', () => {
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
    it('should handle erc20 transaction', async () => {
      await screen.findByText(/Max: 100/);
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      await screen.findByTestId('result');
      await screen.findByText('Transaction included in block 1.');
      expect(prepareFinalTransactionMock).toHaveBeenCalledWith(
        '1.0',
        '0x2791bca1f2de4661ed88a30c99a7a9449aa84174'
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

  const mockAuthTransactionProxy = jest.fn().mockImplementationOnce(() => {
    throw new Error('Unable to authorize transaction.');
  });
  const prepareFinalTransactionMock = jest.fn();
  const mockWaitForTransaction = jest.fn().mockImplementation(() => ({
    blockNumber: 1,
  }));
  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      getBalance: getBalanceMock,
      handleAuthorizeTransactionProxy: mockAuthTransactionProxy,
      prepareFinalTransaction: prepareFinalTransactionMock,
      waitForTransaction: mockWaitForTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              // @ts-ignore
              handleAuthorizeTransaction: () => {
                return false;
              },

              onAddressRequested: () => {
                return {
                  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                  memo: 'memo',
                };
              },
            },
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
    await act(() => {
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
      await act(async () => {
        const form = screen.getByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
      expect(mockAuthTransactionProxy).toHaveBeenCalledWith(
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        'ethereum',
        '1.0'
      );
      expect(prepareFinalTransactionMock).not.toHaveBeenCalled();
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
  const prepareFinalTransactionMock = jest.fn();
  const mockWaitForTransaction = jest.fn().mockImplementation(() => ({
    blockNumber: 1,
  }));

  beforeEach(async () => {
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      getBalance: getBalanceMock,
      handleAuthorizeTransactionProxy: mockAuthTransactionProxy,
      prepareFinalTransaction: prepareFinalTransactionMock,
      waitForTransaction: mockWaitForTransaction,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              // @ts-ignore
              handleAuthorizeTransaction: () => {
                return true;
              },

              onAddressRequested: () => {
                return {
                  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                  memo: 'memo',
                };
              },
            },
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
    await act(() => {
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
      await screen.findByText('Transaction included in block 1.');
      expect(prepareFinalTransactionMock).toHaveBeenCalled();
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
  const prepareFinalTransactionMock = jest.fn();
  beforeEach(async () => {
    // @ts-ignore
    web3MockSpy.mockImplementation(() => ({
      ...web3Mock,
      estimateGas: jest.fn(() => ethers.BigNumber.from('21000')),
      getBalance: getBalanceMock,
      getFeeData: jest.fn(() => ({
        maxFeePerGas: ethers.BigNumber.from('2000000000'),
        maxPriorityFeePerGas: ethers.BigNumber.from('1500000000'),
      })),
      handleAuthorizeTransactionProxy: mockAuthTransactionProxy,
      prepareFinalTransaction: prepareFinalTransactionMock,
    }));
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              // @ts-ignore
              handleAuthorizeTransaction: () => {
                return true;
              },

              onAddressRequested: () => {
                return {
                  address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
                };
              },
            },
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const ethCoin = await screen.findByText('Ether');
    fireEvent.click(ethCoin);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);

    const input = await screen.findByTestId('input');
    await act(() => {
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
    // chainBalance = 2000000000000000000 wei
    // unpaddedGasLimit = 21000 units
    // gasLimit = 42000 units
    // maxFeePerGas = 2000000000 wei
    // 2000000000000000000 - 42000 * 2000000000 = 1999916000000000000
    // 1999916000000000000 = 1.999916 ETH
    it('should show max amount', async () => {
      const max = await screen.findByText(/Max: 1.999916 ETH/);
      expect(max).toBeInTheDocument();
      fireEvent.click(max);
      const input = await screen.findByTestId('input');
      // @ts-ignore
      expect(input.value).toBe('1.999916');
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
      <WindowEthereum
        amount="1.000"
        disabled={false}
        isConfirming={false}
        setFormError={() => {}}
        setIsConfirming={() => {}}
      />
    );
    expect(true).toBe(true);
  });
});

describe('WalletConnect Errors', () => {
  it('renders', () => {
    render(
      <WalletConnect
        amount="1.000"
        disabled={false}
        isConfirming={false}
        setFormError={() => {}}
        setIsConfirming={() => {}}
      />
    );
    expect(true).toBe(true);
  });
});
