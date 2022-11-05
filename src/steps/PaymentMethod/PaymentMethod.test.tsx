import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

beforeEach(() => {
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
});

describe('Payment Selection', () => {
  it('renders', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const paymentSelection = await screen.findByText('Payment Method');
    expect(paymentSelection).toBeInTheDocument();
  });
});
