import { MockedProvider } from '@apollo/client/testing';
import { fireEvent, render as RTLRender } from '@testing-library/react';

import { render, screen } from '~/jest/test-utils';

import App from '../../App';

describe('Asset Selection', () => {
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
    const assetSelection = await screen.findByText('Select Asset');
    expect(assetSelection).toBeInTheDocument();
  });
  it('handles errors', async () => {
    RTLRender(
      <MockedProvider addTypename={false} mocks={[]}>
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
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const error = await screen.findByText('Error Fetching Assets');
    expect(error).toBeInTheDocument();
    const retry = await screen.findByText('click here');
    fireEvent.click(retry);
  });
});
