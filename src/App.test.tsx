import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from './App';

describe('App', () => {
  it('renders', async () => {
    render(<App config={mockConfig} onClose={() => {}} />);

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const assetSelection = await screen.findByText('Select Asset');
    expect(assetSelection).toBeInTheDocument();
  });

  it('renders with an assetId', async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            selection: {
              ...mockConfig.options?.selection,
              assetId: 'satoshi123',
            },
          },
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
          ...mockConfig,
          options: {
            ...mockConfig.options,
            selection: {
              ...mockConfig.options?.selection,
              address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
              networkCode: 'ethereum',
            },
          },
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
  it('renders with a network', async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            selection: {
              ...mockConfig.options?.selection,
              networkCode: 'bitcoin',
            },
          },
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
  it('accepts an optional callback `handleAuthorizeTransaction`', async () => {
    render(
      <App
        config={{
          ...mockConfig,
          options: {
            ...mockConfig.options,
            callbacks: {
              ...mockConfig.options?.callbacks,
              handleAuthorizeTransaction: async () => {
                return true;
              },
            },
          },
        }}
        onClose={() => {}}
      />
    );

    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const assetSelection = await screen.findByText('Select Asset');
    expect(assetSelection).toBeInTheDocument();
  });
  it('handles close', async () => {
    jest.useFakeTimers();
    jest.spyOn(window, 'confirm').mockImplementationOnce(() => true);
    const closeMock = jest.fn();

    render(<App config={mockConfig} onClose={closeMock} />);

    const closeButton = await screen.findByLabelText('Close');
    expect(closeButton).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(closeButton);
      jest.advanceTimersByTime(1000);
    });
    expect(closeMock).toHaveBeenCalled();
  });
});
