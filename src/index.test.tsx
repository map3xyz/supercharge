import '@testing-library/jest-dom';

import { act, screen } from '@testing-library/react';

import { initMap3Sdk } from './index';

describe('Map3Sdk', () => {
  it('can be opened and closed', async () => {
    const map3 = initMap3Sdk({
      anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwODgwNGNhZS01MWM4LTQ0ZDQtYjA1NS04YTY1OTUyMGRkOGUiLCJpYXQiOjE2NjI1NDcxMTcsImV4cCI6MTY5NDA4MzExN30.ieNhYU8nEcmVClw6WsIo6H9JcTckBrfNPZ_u1HJm4uk',
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
