import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';

import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import * as useWeb3Mock from '../../hooks/useWeb3';

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

const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

const getBalanceMock = jest.fn().mockImplementation(() => ({
  assetBalance: ethers.BigNumber.from(100000),
  chainBalance: ethers.BigNumber.from(2000),
}));

beforeEach(() => {
  render(
    <App
      config={{
        anonKey: process.env.CONSOLE_ANON_KEY || '',
        generateDepositAddress: async () => {
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        theme: 'dark',
      }}
      onClose={() => {}}
    />
  );
});

describe('Result', () => {
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
  describe('success', () => {
    beforeEach(async () => {
      web3MockSpy.mockImplementation(() => ({
        addChain: jest.fn(),
        authorizeTransactionProxy: jest.fn(),
        getBalance: getBalanceMock,
        getChainID: jest.fn(),
        providers: {},
        sendTransaction: jest.fn(),
        switchChain: jest.fn(),
      }));
      testingUtils.mockConnectedWallet([
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
      ]);
      testingUtils.lowLevel.mockRequest('eth_gasPrice', () => '0x10cd96a16e');
      testingUtils.lowLevel.mockRequest('eth_sendTransaction', '0x1');
      await screen.findByText('Loading...');
      const elonCoin = await screen.findByText('ElonCoin');
      fireEvent.click(elonCoin);
      const ethNetwork = await screen.findByText('Ethereum');
      fireEvent.click(ethNetwork);
      const metamaskExtension = await screen.findByText('MetaMask');
      fireEvent.click(metamaskExtension);
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
      await act(() => {
        testingUtils.mockAccountsChanged([
          '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        ]);
      });
      await screen.findByText('Confirm Payment');
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
    });
    it('renders', async () => {
      expect(
        await screen.findByText('Transaction Submitted')
      ).toBeInTheDocument();
    });
    it('lets user start over', async () => {
      const startOver = await screen.findByText('Start Over');
      fireEvent.click(startOver);
      expect(await screen.findByText('Select Asset')).toBeInTheDocument();
    });
  });
});
