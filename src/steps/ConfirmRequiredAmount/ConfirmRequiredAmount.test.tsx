import { mockConfig } from '~/jest/__mocks__/mockConfig';
import { fireEvent, render, screen } from '~/jest/test-utils';

import App from '../../App';
import ConfirmRequiredAmount from '.';

describe('ConfirmRequiredAmount', () => {
  describe('render major amount if minor amount is required', () => {
    beforeEach(async () => {
      render(
        <App
          config={{
            ...mockConfig,
            amount: '1000000000000000',
            generateDepositAddress: async (_asset, _network) => {
              return { address: '0x0000000000000000000000000000000000000000' };
            },
            networkCode: 'ethereum',
          }}
          onClose={() => {}}
        />
      );

      await screen.findByText('Loading...');
      const qrCode = await screen.findByText('Show Address');
      fireEvent.click(qrCode);
    });
    it('renders', async () => {
      expect(await screen.findByText('Acknowledge Amount')).toBeInTheDocument();
      expect((await screen.findAllByText(/0.001 ETH/))[0]).toBeInTheDocument();
    });
  });
});

describe('ConfirmRequireAmount Error', () => {
  render(<ConfirmRequiredAmount />);
  expect(true).toBe(true);
});
