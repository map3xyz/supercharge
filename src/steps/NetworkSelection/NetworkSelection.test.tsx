import { MockedProvider } from '@apollo/client/testing';
import { render as RTLRender } from '@testing-library/react';

import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import { GetAssetsDocument } from '../../generated/apollo-gql';

describe('Network Selection', () => {
  it('renders', async () => {
    render(
      <App
        config={{
          generateDepositAddress: async () => {
            return '0x0000000000000000000000000000000000000000';
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const networkSelection = await screen.findByText('Select Network');
    expect(networkSelection).toBeInTheDocument();
  });
  it('handles errors', async () => {
    RTLRender(
      <MockedProvider
        addTypename={false}
        mocks={[
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
        ]}
      >
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
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const error = await screen.findByText('Error Fetching Networks');
    expect(error).toBeInTheDocument();
  });
});
