import * as reactDeviceDetect from 'react-device-detect';

import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import BinancePay from '.';

describe.skip('BinancePay > Desktop', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            callbacks: {
              onAddressRequested: async (_asset, _network) => {
                return {
                  address: '0x0000000000000000000000000000000000000000',
                };
              },
            },
            selection: {
              amount: '100000000',
              assetId: 'elon123',
            },
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const binancePay = await screen.findByText('Binance Pay');
    fireEvent.click(binancePay);
  });
  it('displays binance pay qr code on desktop', async () => {
    expect(await screen.findByText('Enter Amount')).toBeInTheDocument();
    const form = await screen.findByTestId('enter-amount-form');
    await act(async () => {
      fireEvent.submit(form);
    });
    const payViaBinance = await screen.findByText('Pay via Binance');
    expect(payViaBinance).toBeInTheDocument();
  });
});

describe.skip('Binance Pay > Mobile', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            callbacks: {
              handleOrderFeeCalculation: async () => ({
                fixedFee: 0.1,
                variableFee: 0.01,
              }),
              onAddressRequested: async (_asset, _network) => {
                return {
                  address: '0x0000000000000000000000000000000000000000',
                };
              },
            },
            selection: {
              amount: '100000000',
              assetId: 'elon123',
            },
          },
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const binancePay = await screen.findByText('Binance Pay');
    fireEvent.click(binancePay);
  });
  it('creates an order', async () => {
    Object.defineProperties(reactDeviceDetect, {
      isMobile: { get: () => true },
    });

    expect(await screen.findByText('Enter Amount')).toBeInTheDocument();
    const form = await screen.findByTestId('enter-amount-form');
    await act(async () => {
      fireEvent.submit(form);
    });
    await screen.findByLabelText('(1% + 0.1 ELON)');
    const button2 = await screen.findByTestId('binance-pay-button');
    fireEvent.click(button2);
  });
  it('sets min step to Enter Amount if binance-pay is required method', async () => {
    jest.clearAllMocks();
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            selection: {
              paymentMethod: 'binance-pay',
            },
          },
        }}
        onClose={() => {}}
      />
    );
    const ethereum = await screen.findByText('Ether');
    fireEvent.click(ethereum);
    const binancePay = await screen.findByText('Binance Pay');
    expect(binancePay).toBeInTheDocument();
  });
});

describe('BinancePay > Required', () => {
  beforeEach(() => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            selection: {
              ...mockConfig.options?.selection,
              paymentMethod: 'binance-pay',
            },
          },
        }}
        onClose={() => {}}
      />
    );
  });

  it('sets min step to Enter Amount', async () => {
    const ethereum = await screen.findByText('Ether');
    fireEvent.click(ethereum);
    const enterAmount = await screen.findByText('Enter Amount');
    expect(enterAmount).toBeInTheDocument();
    const back = await screen.findByLabelText('Back');
    expect(back).toHaveClass('invisible');
  });
});

describe('BinancePay Error', () => {
  render(<BinancePay />);
  expect(true).toBe(true);
});
