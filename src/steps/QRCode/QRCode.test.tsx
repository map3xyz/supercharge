import { act, fireEvent, render, screen } from '~/jest/test-utils';

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
