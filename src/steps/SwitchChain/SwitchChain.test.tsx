import { generateTestingUtils } from 'eth-testing';
import { ethers } from 'ethers';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { web3Mock } from '~/jest/__mocks__/web3Mock';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import * as useWeb3Mock from '../../hooks/useWeb3';
import SwitchChain from '.';

const web3MockSpy = jest.spyOn(useWeb3Mock, 'useWeb3');

const getBalanceMock = jest.fn().mockImplementation(() => ({
  assetBalance: ethers.BigNumber.from('100000000'),
  chainBalance: ethers.BigNumber.from('20000000000000000000'),
}));

describe.skip('SwitchChain', () => {
  describe('Step', () => {
    beforeEach(async () => {
      render(<App config={mockConfig} onClose={() => {}} />);
      await screen.findByText('Loading...');
      const elonCoin = await screen.findByText('ElonCoin');
      fireEvent.click(elonCoin);
      const polygon = await screen.findByText('Polygon Chain');
      fireEvent.click(polygon);
      const metamask = await screen.findByText('MetaMask');
      fireEvent.click(metamask);
    });
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    const switchChainMock = jest.fn();
    beforeAll(() => {
      web3MockSpy.mockImplementation(() => ({
        ...web3Mock,
        getBalance: getBalanceMock,
        switchChain: switchChainMock,
      }));
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet(
        // wallet is connected to chainId 1 instead of 137
        ['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf']
      );
    });

    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('prompts user to switch chain', async () => {
      const switchChain = (await screen.findAllByText('Switch Chain'))[0];
      expect(switchChain).toBeInTheDocument();
      const oldChain = await screen.findByText('Ethereum');
      expect(oldChain).toBeInTheDocument();
      const newChain = (await screen.findAllByText('Polygon Chain'))[0];
      expect(newChain).toBeInTheDocument();
      const confirmSwitchChain = (
        await screen.findAllByText('Switch Chain')
      )[1];
      await act(async () => {
        fireEvent.click(confirmSwitchChain);
      });
      expect(switchChainMock).toHaveBeenCalled();
    });
  });
  describe('handleSwitch - addChain Error', () => {
    beforeEach(async () => {
      render(<App config={mockConfig} onClose={() => {}} />);
      await screen.findByText('Loading...');
      const elonCoin = await screen.findByText('ElonCoin');
      fireEvent.click(elonCoin);
      const polygon = await screen.findByText('Polygon Chain');
      fireEvent.click(polygon);
      const metamask = await screen.findByText('MetaMask');
      fireEvent.click(metamask);
    });
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    const mockSwitchChain = jest.fn().mockImplementationOnce(() => {
      throw new Error('Unrecognized chain ID');
    });
    const addChainMock = jest.fn().mockImplementationOnce(() => {
      throw new Error('User rejected request');
    });
    beforeAll(() => {
      web3MockSpy.mockImplementation(() => ({
        ...web3Mock,
        addChain: addChainMock,
        getBalance: getBalanceMock,
        switchChain: mockSwitchChain,
      }));
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet(
        // wallet is connected to chainId 1 instead of 137
        ['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf']
      );
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('attempts to add chain if none exists', async () => {
      const switchChain = (await screen.findAllByText('Switch Chain'))[0];
      expect(switchChain).toBeInTheDocument();
      const oldChain = await screen.findByText('Ethereum');
      expect(oldChain).toBeInTheDocument();
      const newChain = (await screen.findAllByText('Polygon Chain'))[0];
      expect(newChain).toBeInTheDocument();
      const confirmSwitchChain = (
        await screen.findAllByText('Switch Chain')
      )[1];
      await act(async () => {
        fireEvent.click(confirmSwitchChain);
      });
      expect(mockSwitchChain).toHaveBeenCalledWith(137);
      expect(addChainMock).toHaveBeenCalledTimes(1);
    });
  });
  describe('handleSwitch - Success', () => {
    beforeEach(async () => {
      render(<App config={mockConfig} onClose={() => {}} />);
      await screen.findByText('Loading...');
      const elonCoin = await screen.findByText('ElonCoin');
      fireEvent.click(elonCoin);
      const polygon = await screen.findByText('Polygon Chain');
      fireEvent.click(polygon);
      const metamask = await screen.findByText('MetaMask');
      fireEvent.click(metamask);
    });
    const testingUtils = generateTestingUtils({
      providerType: 'MetaMask',
    });
    const mockSwitchChain = jest.fn().mockImplementationOnce(() => {
      throw new Error('Unrecognized chain ID');
    });
    const addChainMock = jest.fn();
    beforeAll(() => {
      web3MockSpy.mockImplementation(() => ({
        ...web3Mock,
        addChain: addChainMock,
        getBalance: getBalanceMock,
        switchChain: mockSwitchChain,
      }));
      global.window.ethereum = testingUtils.getProvider();
      global.window.ethereum.providers = [testingUtils.getProvider()];
      testingUtils.mockConnectedWallet(
        // wallet is connected to chainId 1 instead of 137
        ['0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf']
      );
    });
    afterEach(() => {
      testingUtils.clearAllMocks();
    });
    it('adds chain', async () => {
      const switchChain = (await screen.findAllByText('Switch Chain'))[0];
      expect(switchChain).toBeInTheDocument();
      const oldChain = await screen.findByText('Ethereum');
      expect(oldChain).toBeInTheDocument();
      const newChain = (await screen.findAllByText('Polygon Chain'))[0];
      expect(newChain).toBeInTheDocument();
      const confirmSwitchChain = (
        await screen.findAllByText('Switch Chain')
      )[1];
      await act(async () => {
        fireEvent.click(confirmSwitchChain);
      });
      expect(mockSwitchChain).toHaveBeenCalledWith(137);
      expect(addChainMock).toHaveBeenCalled();
    });
  });
});

describe('Switch Chain Error', () => {
  it('renders', () => {
    render(<SwitchChain />);
    expect(true).toBe(true);
  });
});
