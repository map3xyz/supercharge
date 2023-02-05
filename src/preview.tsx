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
          assetId: '53adbb94-6a68-4eeb-af49-6b6d9e84a1f4',
          generateDepositAddress: async (_coin, _network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              address: '0x67ef9a8d7f4ed931ac63e873b75d8f8dea64cdb2',
            };
          },
          locale: 'es',
          paymentMethod: 'binance-pay',
          theme: 'dark',
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
