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
                  address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
                };
              },
            },
            selection: {
              // BUSD
              assetId: '6b562c23-d79f-4a34-a47f-cc7b28726821',
            },
            style: {
              colors: {
                accent: '#dfff86',
                primary: '#0e1523',
              },
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
