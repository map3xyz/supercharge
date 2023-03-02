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
                  address: '0x2639DCc4368c16f75a2af0BCaf26991027667fBE',
                };
              },
            },
            selection: {
              amount: '10000',
              assetId: '53adbb94-6a68-4eeb-af49-6b6d9e84a1f4',
              fiat: 'USD',
              rate: 2,
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
