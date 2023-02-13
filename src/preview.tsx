import { createRoot } from 'react-dom/client';

import { initMap3Supercharge } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const supercharge = initMap3Supercharge({
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          options: {
            callbacks: {
              onAddressRequested: async () => {
                return {
                  address: '0x034A38ab91a40d6eB745F0ffBf041a7098557990',
                };
              },
            },
            style: {
              theme: 'dark',
            },
          },
          userId: 'preview-user-id',
        });
        supercharge.open();
      }}
    >
      Open SDK
    </button>
    <div
      id="supercharge"
      style={{ left: '50%', position: 'absolute', top: '50%' }}
    ></div>
  </div>
);
