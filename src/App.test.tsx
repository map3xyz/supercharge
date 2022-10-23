import '@testing-library/jest-dom';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from './App';
import {
  GetAssetsDocument,
  GetNetworksDocument,
  GetPaymentMethodsDocument,
} from './generated/apollo-gql';

describe('App', () => {
  beforeEach(() => {
    const mocks: MockedResponse[] = [
      {
        request: {
          query: GetAssetsDocument,
        },
        result: {
          data: {
            assets: [
              {
                logo: {
                  png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
                  svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
                },
                name: 'Bitcoin',
                symbol: 'BTC',
              },
            ],
          },
        },
      },
      {
        request: {
          query: GetNetworksDocument,
        },
        result: {
          data: {
            networks: [
              {
                logo: {
                  png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
                  svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
                },
                name: 'Bitcoin',
                symbol: 'BTC',
              },
              {
                logo: {
                  png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.png',
                  svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/ethereum/logo.svg',
                },
                name: 'Ethereum',
                symbol: 'ETH',
              },
            ],
          },
        },
      },
      {
        request: {
          query: GetPaymentMethodsDocument,
        },
        result: {
          data: {
            methods: [
              {
                enabled: true,
                icon: 'fa fa-qrcode',
                logo: '',
                name: 'Scan QR Code',
                value: 'qr',
              },
            ],
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <App
          config={{
            generateDepositAddress: async () => {
              return '0x0000000000000000000000000000000000000000';
            },
            theme: 'dark',
          }}
          onClose={() => {}}
        />
      </MockedProvider>
    );
  });

  describe('Asset Selection', () => {
    it('renders', async () => {
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
      const assetSelection = await screen.findByText('Select Asset');
      expect(assetSelection).toBeInTheDocument();
    });
  });
  describe('Network Selection', () => {
    it('renders', async () => {
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
      const bitcoin = await screen.findByText('Bitcoin');
      fireEvent.click(bitcoin);
      const networkSelection = await screen.findByText('Select Network');
      expect(networkSelection).toBeInTheDocument();
    });
  });
  describe('Payment Selection', () => {
    it('renders', async () => {
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
      const bitcoin = await screen.findByText('Bitcoin');
      fireEvent.click(bitcoin);
      const ethereum = await screen.findByText('ETH');
      fireEvent.click(ethereum);
      const paymentSelection = await screen.findByText('Payment Method');
      expect(paymentSelection).toBeInTheDocument();
    });
  });
  describe('QR Code', () => {
    it('renders', async () => {
      expect(await screen.findByText('Loading...')).toBeInTheDocument();
      const bitcoin = await screen.findByText('Bitcoin');
      fireEvent.click(bitcoin);
      const ethereum = await screen.findByText('ETH');
      fireEvent.click(ethereum);
      const qrCode = await screen.findByText('Scan QR Code');
      fireEvent.click(qrCode);
      const qrCodeMethod = await screen.findByTestId('qrcode-method');
      expect(qrCodeMethod).toBeInTheDocument();
      const back = await screen.findByLabelText('Back');
      await act(async () => {
        await fireEvent.click(back);
      });
      const paymentSelection = await screen.findByTestId('payment-method');
      expect(paymentSelection).toBeInTheDocument();
    });
  });
});
