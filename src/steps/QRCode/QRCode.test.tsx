import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

describe('QR Code', () => {
  beforeEach(async () => {
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
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('ETH');
    fireEvent.click(ethereum);
    const qrCode = await screen.findByText('Scan QR Code');
    fireEvent.click(qrCode);
  });
  it('renders', async () => {
    const qrCodeMethod = await screen.findByTestId('qrcode-method');
    expect(qrCodeMethod).toBeInTheDocument();
  });
  it('goes back to the correct step', async () => {
    const back = await screen.findByLabelText('Back');
    await act(async () => {
      await fireEvent.click(back);
    });
    const paymentSelection = await screen.findByTestId('payment-method');
    expect(paymentSelection).toBeInTheDocument();
  });
});

describe('QR Code Errors', () => {
  it('handles errors generating address', async () => {
    render(
      <App
        config={{
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async () => {
            throw new Error('Test Error');
          },
          theme: 'dark',
        }}
        onClose={() => {}}
      />
    );
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('ETH');
    fireEvent.click(ethereum);
    const qrCode = await screen.findByText('Scan QR Code');
    fireEvent.click(qrCode);
    const error = await screen.findByText('Error generating deposit address.');
    expect(error).toBeInTheDocument();
  });
});
