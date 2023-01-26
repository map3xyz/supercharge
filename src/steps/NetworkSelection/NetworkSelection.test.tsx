import { MockedProvider } from '@apollo/client/testing';
import { render as RTLRender } from '@testing-library/react';

import { assetsForOrganizationMockResult } from '~/jest/__mocks__/assets';
import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import { GetAssetsForOrgDocument } from '../../generated/apollo-gql';
import NetworkSelection from '.';

describe('Network Selection', () => {
  it('renders', async () => {
    render(<App config={mockConfig} onClose={() => {}} />);
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
        mocks={[
          {
            request: {
              query: GetAssetsForOrgDocument,
              variables: {
                currency: 'USD',
                limit: 10,
                offset: 0,
              },
            },
            result: {
              data: {
                __typename: 'Query',
                assetsForOrganization: [assetsForOrganizationMockResult[0]],
              },
            },
          },
        ]}
      >
        <App
          config={{
            ...mockConfig,
            generateDepositAddress: async () => {
              return { address: '0x0000000000000000000000000000000000000000' };
            },
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

describe('Network Selection Errors', () => {
  it('renders', async () => {
    render(<NetworkSelection />);
    expect(true).toBe(true);
  });
});
