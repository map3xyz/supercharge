import '@testing-library/jest-dom';

import { act, screen } from '@testing-library/react';

import { initMap3Sdk } from './index';

describe('Map3Sdk', () => {
  it('can be opened and closed', async () => {
    const map3 = initMap3Sdk({
      // @ts-ignore
      generateDepositAddress: async (coin, network) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return '0x0000000000000000000000000000000000000000';
      },
    });
    await act(async () => {
      map3.open();
    });
    const modal = await screen.findByTestId('map3-modal');
    expect(modal).toBeInTheDocument();
    await act(async () => {
      map3.close();
    });
    expect(modal).not.toBeInTheDocument();
  });
});
