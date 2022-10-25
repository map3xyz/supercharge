import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';

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
  const metaMask = await screen.findByText('MetaMask');
  fireEvent.click(metaMask);
});

describe('Enter Amount', () => {
  it('renders', async () => {
    const enterAmount = await screen.findByTestId('enter-amount');
    expect(enterAmount).toBeInTheDocument();
  });
  describe('input', () => {
    beforeEach(async () => {
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '1' } });
      });
    });
    it('handles conversion', async () => {
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('0.00005000');
    });
    it('toggles base', async () => {
      const toggleBase = await screen.findByTestId('toggle-base');
      act(() => {
        fireEvent.click(toggleBase);
      });
      const input = await screen.findByTestId('input');
      act(() => {
        fireEvent.change(input, { target: { value: '0.00005000' } });
      });
      const quote = await screen.findByTestId('quote');
      expect(quote.textContent).toBe('1.00');
    });
  });
});
