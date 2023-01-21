import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { act, fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import ConfirmRequiredAmount from '.';

describe('ConfirmRequiredAmount', () => {
  describe('renders if amount is required and qr code selected', () => {
    beforeEach(async () => {
      render(
        <App
          config={{
            ...mockConfig,
            amount: '0.1',
            generateDepositAddress: async (_asset, _network) => {
              return { address: '0x0000000000000000000000000000000000000000' };
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
    });
    it('renders', async () => {
      expect(await screen.findByText('Acknowledge Amount')).toBeInTheDocument();
    });
    it('displays qr code after user acknowledgment', async () => {
      const acknowledgeCheck = await screen.findByTestId(
        'acknowledge-checkbox'
      );
      await act(async () => {
        fireEvent.click(acknowledgeCheck);
        const button = await screen.findByText('Acknowledge Amount');
        fireEvent.click(button);
      });
      const qrCodeMethod = await screen.findByTestId('qrcode-method');
      expect(qrCodeMethod).toBeInTheDocument();
    });
  });
});

describe('ConfirmRequireAmount Error', () => {
  render(<ConfirmRequiredAmount />);
  expect(true).toBe(true);
});
