import { MockedProvider } from '@apollo/client/testing';
import { render as RTLRender } from '@testing-library/react';

import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import { GetAssetsForOrgDocument } from '../../generated/apollo-gql';

describe('Network Selection', () => {
  it('renders', async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
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
    await screen.findByText('Fetching Networks...');
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
              query: GetAssetsForOrgDocument,
              variables: {
                limit: 10,
                offset: 0,
              },
            },
            result: {
              data: {
                assetsForOrganization: [
                  {
                    id: 'satoshi123',
                    logo: {
                      png: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.png',
                      svg: 'https://raw.githubusercontent.com/map3xyz/assets/master/networks/bitcoin/logo.svg',
                    },
                    name: 'Bitcoin',
                    networkCode: 'bitcoin',
                    networks: {
                      name: 'Bitcoin',
                      networkCode: 'bitcoin',
                    },
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
            anonKey: process.env.CONSOLE_ANON_KEY || '',
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
