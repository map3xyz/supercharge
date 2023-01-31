import { generateTestingUtils } from 'eth-testing';
import * as reactDeviceDetect from 'react-device-detect';
import { act } from 'react-dom/test-utils';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import PaymentMethod from '.';

describe('Payment Selection', () => {
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
    const ethereum = await screen.findByText('Ether');
    fireEvent.click(ethereum);
  });
  it('renders', async () => {
    const paymentSelection = await screen.findByText('Payment Method');
    expect(paymentSelection).toBeInTheDocument();
  });
  describe('Search', () => {
    it('searches for a payment method', async () => {
      const rainbow = await screen.findByText('Rainbow');
      const searchInput = await screen.findByTestId('method-search');
      fireEvent.change(searchInput, { target: { value: 'metamask' } });
      const metamask = await screen.findByText('MetaMask');
      expect(metamask).toBeInTheDocument();
      expect(rainbow).not.toBeInTheDocument();
      await act(async () => {
        fireEvent.change(searchInput, {
          target: { value: 'superduperwallet' },
        });
      });
      await screen.findByText('Payment Method Not Found');
      const retry = await screen.findByText('click here');
      await act(() => {
        fireEvent.click(retry);
      });
      // @ts-expect-error
      expect(searchInput.value).toBe('');
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
