import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render as RTLRender } from '@testing-library/react';

import { render, screen } from '~/jest/test-utils';

import App from '../../App';

describe('Asset Selection', () => {
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
    const assetSelection = await screen.findByText('Select Asset');
    expect(assetSelection).toBeInTheDocument();
  });
  it('searches', async () => {
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
    await screen.findByText('Loading...');
    const search = await screen.findByPlaceholderText('Search for an asset...');
    fireEvent.change(search, { target: { value: 'Bitcoin' } });
    expect(await screen.findByText('Bitcoin')).toBeInTheDocument();
  });
  it('handles errors', async () => {
    RTLRender(
      <MockedProvider addTypename={false} mocks={[]}>
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
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const error = await screen.findByText('Error Fetching Assets');
    expect(error).toBeInTheDocument();
    const retry = await screen.findByText('click here');
    fireEvent.click(retry);
  });
});
