import { render, screen } from '~/jest/test-utils';

import App from './App';

describe('App', () => {
  it('renders', async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            return { address: '0x0000000000000000000000000000000000000000' };
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

  it('renders with an assetId', async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          assetId: 'satoshi123',
          generateDepositAddress: async () => {
            return { address: '0x0000000000000000000000000000000000000000' };
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(
      await screen.findByText('Fetching Payment Methods...')
    ).toBeInTheDocument();
    const paymentMethod = await screen.findByText('Payment Method');
    expect(paymentMethod).toBeInTheDocument();
  });
  it('renders with an address and network', async () => {
    render(
      <App
        config={{
          address: '0x123ElonAddress',
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            return { address: '0x0000000000000000000000000000000000000000' };
          },
          networkCode: 'ethereum',
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    expect(
      await screen.findByText('Fetching Payment Methods...')
    ).toBeInTheDocument();
    const paymentSelection = await screen.findByText('Payment Method');
    expect(paymentSelection).toBeInTheDocument();
  });
});
