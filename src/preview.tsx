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
              onAddressRequested: async () => {
                return {
                  address: '2Muv9Zzxd9M51mte3JGKk6EJFVTs74HCi15',
                };
              },
              onExpire: () => {
                console.error('Expired');
              },
            },
            selection: {
              // expiration is now plus 30 seconds
              expiration: new Date(Date.now() + 30 * 1000).getTime(),
              rate: 12000,
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
