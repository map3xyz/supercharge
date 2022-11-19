import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

describe('WalletConnect', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            throw 'Error generating deposit address.';
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );

    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const walletConnect = await screen.findByText('Rainbow');
    fireEvent.click(walletConnect);
  });
  it('renders', async () => {
    expect(
      await screen.findByText(
        'Rainbow is a fun, simple, and secure way to get started with crypto and explore the new world of Ethereum'
      )
    ).toBeInTheDocument();
  });
});
