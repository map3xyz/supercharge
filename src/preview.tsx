import { Button } from '@map3xyz/components';
import { createRoot } from 'react-dom/client';

import { initMap3Supercharge } from '.';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <div className="map3 p-2">
    <Button
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onClick={() => {
        const supercharge = initMap3Supercharge({
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          options: {
            callbacks: {
              onAddressRequested: () => {
                return {
                  address: '0x6887246668a3b87f54deb3b94ba47a6f63f32985',
                };
              },
            },
            selection: {
              amount: '1000000000000000000',
              // BUSD
              assetId: 'da5eb9b1-7e2b-4976-a260-07a3eab89618',
              // paymentMethod: 'binance-pay',
            },
            style: {
              theme: 'dark',
            },
          },
          userId: 'preview-user-id',
        });
        supercharge.open();
      }}
      size="xlarge"
    >
      Open SDK
    </Button>
    <div
      id="supercharge"
      style={{ left: '50%', position: 'absolute', top: '50%' }}
    ></div>
  </div>
);
