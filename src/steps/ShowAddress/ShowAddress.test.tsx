import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import ShowAddress from '.';

describe('Show Address', () => {
  beforeEach(async () => {
    render(<App config={mockConfig} onClose={() => {}} />);
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const showAddress = await screen.findByText('Show Address');
    fireEvent.click(showAddress);
  });
  it('renders', async () => {
    const showAddressMethod = await screen.findByTestId('show-address-method');
    expect(showAddressMethod).toBeInTheDocument();
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

describe('Show Address > bip21', () => {
  beforeEach(async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              onAddressRequested: async () => {
                return {
                  address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
                };
              },
            },
            selection: {
              amount: '100000',
              assetId: 'satoshi123',
            },
          },
        }}
        onClose={() => {}}
      />
    );
  });
  it('generates a bip21 url scheme', async () => {
    const ackCheckbox = await screen.findByTestId('acknowledge-checkbox');
    fireEvent.click(ackCheckbox);
    const ackButton = await screen.findByText('Acknowledge Amount');
    fireEvent.click(ackButton);
    const qrValue = await screen.findByTestId('qr-value');
    expect(qrValue.textContent).toBe(
      'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.001'
    );
    expect(qrValue).toHaveClass('hidden');
  });
});

describe('Show Address Errors', () => {
  it('renders', async () => {
    render(<ShowAddress />);
    expect(true).toBe(true);
  });
  it('handles errors generating address', async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              onAddressRequested: async () => {
                throw new Error('Test Error');
              },
            },
          },
        }}
        onClose={() => {}}
      />
    );
    await screen.findByText('Loading...');
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const showAddress = await screen.findByText('Show Address');
    fireEvent.click(showAddress);
    const error = await screen.findByText('Error Generating Address');
    expect(error).toBeInTheDocument();
  });
});
