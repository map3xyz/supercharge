import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import QRCode from '.';

describe('QR Code', () => {
  beforeEach(async () => {
    render(<App config={mockConfig} onClose={() => {}} />);
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('Ethereum');
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
  it('renders', async () => {
    render(<QRCode />);
    expect(true).toBe(true);
  });
  it('handles errors generating address', async () => {
    render(
      <App
        config={{
          ...mockConfig,
          generateDepositAddress: async () => {
            throw new Error('Test Error');
          },
        }}
        onClose={() => {}}
      />
    );
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('Ethereum');
    fireEvent.click(ethereum);
    const qrCode = await screen.findByText('Scan QR Code');
    fireEvent.click(qrCode);
    const error = await screen.findByText('Error Generating Address');
    expect(error).toBeInTheDocument();
  });
});
