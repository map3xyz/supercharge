import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

beforeEach(() => {
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
});

describe('QR Code', () => {
  it('renders', async () => {
    expect(await screen.findByText('Loading...')).toBeInTheDocument();
    const bitcoin = await screen.findByText('Bitcoin');
    fireEvent.click(bitcoin);
    const ethereum = await screen.findByText('ETH');
    fireEvent.click(ethereum);
    const metaMask = await screen.findByText('MetaMask');
    fireEvent.click(metaMask);
    const enterAmount = await screen.findByTestId('enter-amount');
    expect(enterAmount).toBeInTheDocument();
  });
});
