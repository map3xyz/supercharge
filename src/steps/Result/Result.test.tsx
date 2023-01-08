import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { web3Mock } from '~/jest/__mocks__/web3Mock';
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
  assetBalance: ethers.BigNumber.from('100000000'),
  chainBalance: ethers.BigNumber.from('20000000000000000000'),
}));

const onSuccessMock = jest.fn();
const onFailureMock = jest.fn();

beforeEach(() => {
  render(
    <App
      config={{
        ...mockConfig,
        onFailure: onFailureMock,
        onSuccess: onSuccessMock,
      }}
      onClose={() => {}}
    />
  );
});

describe('Result', () => {
  describe('success', () => {
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(() => {
      web3MockSpy.mockImplementation(() => ({
        ...web3Mock,
        getBalance: getBalanceMock,
        sendTransaction: jest.fn().mockImplementation(() => {
          return Promise.resolve('0x1');
        }),
      }));
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    beforeEach(async () => {
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
      await screen.findByText(/Max: 100 ELON/);
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
    it('calls onSuccess callback', async () => {
      expect(onSuccessMock).toHaveBeenCalledWith(
        '0x1',
        'ethereum',
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
      );
    });
  });
  describe('failure', () => {
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    beforeAll(() => {
      web3MockSpy.mockImplementation(() => ({
        ...web3Mock,
        getBalance: getBalanceMock,
        waitForTransaction: jest.fn().mockImplementationOnce(() => {
          throw new Error('Transaction failed');
        }),
      }));
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    beforeEach(async () => {
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
      await screen.findByText(/Max: 100 ELON/);
      await screen.findByText('Confirm Payment');
      await act(async () => {
        const form = await screen.findByTestId('enter-amount-form');
        fireEvent.submit(form);
      });
    });
    it('renders', async () => {
      expect(await screen.findByText('Transaction Error')).toBeInTheDocument();
    });
    it('calls onFailure callback', async () => {
      expect(onFailureMock).toHaveBeenCalledWith(
        'Transaction failed',
        'ethereum',
        '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
      );
    });
  });
});
