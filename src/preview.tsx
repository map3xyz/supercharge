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
              onAddressRequested: () => {
                return {
                  address: '0xE214Bc3e755d56c4D41dfD95539ca1B463E00E19',
                };
              },
            },
            selection: {
              amount: '10000',
              networkCode: 'ethereum',
            },
            style: {
              colors: {
                accent: '#dfff86',
                primary: '#0e1523',
              },
              locale: 'es',
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
