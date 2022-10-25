import '@testing-library/jest-dom';

import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderOptions } from '@testing-library/react';
import React, { ReactElement } from 'react';

import {
  GetAssetsDocument,
  GetNetworksDocument,
  GetPaymentMethodsDocument,
} from '../src/generated/apollo-gql';

const AllTheProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
