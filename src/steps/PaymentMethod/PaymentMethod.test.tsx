import { generateTestingUtils } from 'eth-testing';
import * as reactDeviceDetect from 'react-device-detect';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { web3Mock } from '~/jest/__mocks__/web3Mock';
import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import * as useWeb3Mock from '../../hooks/useWeb3';
import PaymentMethod from '.';

beforeEach(() => {
  render(
    <App
      config={{
        ...mockConfig,
      }}
      onClose={() => {}}
    />
  );
});

describe('Payment Selection', () => {
  const testingUtils = generateTestingUtils({ providerType: 'MetaMask' });
  beforeAll(() => {
    global.window.ethereum = testingUtils.getProvider();
    global.window.ethereum.providers = [testingUtils.getProvider()];
  });
  afterEach(() => {
    testingUtils.clearAllMocks();
  });
  beforeEach(async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const elonCoin = await screen.findByText('ElonCoin');
    fireEvent.click(elonCoin);
    const ethNetwork = await screen.findByText('Ethereum');
    fireEvent.click(ethNetwork);
  });
  it('renders', async () => {
    const paymentSelection = await screen.findByText('Payment Method');
    expect(paymentSelection).toBeInTheDocument();
  });
  describe('WalletConnect', () => {
    it('hides WalletConnect metamask connection if eth provider detected', async () => {
      jest.spyOn(useWeb3Mock, 'useWeb3').mockImplementation(() => ({
        ...web3Mock,
        providers: { MetaMask: true },
      }));
      const paymentSelection = await screen.findByText('Payment Method');
      expect(paymentSelection).toBeInTheDocument();
      const metamaskExtensions = await screen.findAllByText('MetaMask');
      expect(metamaskExtensions).toHaveLength(1);
    });
  });
  describe('Search', () => {
    it('searches for a payment method', async () => {
      const rainbow = await screen.findByText('Rainbow');
      const searchInput = await screen.findByTestId('method-search');
      fireEvent.change(searchInput, { target: { value: 'metamask' } });
      const metamask = await screen.findByText('MetaMask');
      expect(metamask).toBeInTheDocument();
      expect(rainbow).not.toBeInTheDocument();
    });
  });
  describe('Method filtering', () => {
    it('filters out methods that dont support the eip:155 chain', async () => {
      const paymentSelection = await screen.findByText('Payment Method');
      expect(paymentSelection).toBeInTheDocument();
      const mtGoxWallet = await screen.queryByText('Mt Gox');
      expect(mtGoxWallet).toBeNull();
    });
    it('handles iOS and Android devices', async () => {
      Object.defineProperties(reactDeviceDetect, {
        isAndroid: { get: () => true },
        isIOS: { get: () => true },
      });
      const paymentSelection = await screen.findByText('Payment Method');
      expect(paymentSelection).toBeInTheDocument();
    });
  });
});

describe('Payment Method Errors', () => {
  it('renders', () => {
    render(<PaymentMethod />);
    expect(true).toBe(true);
  });
});
