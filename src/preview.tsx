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
          generateDepositAddress: async (_coin, _network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              address: '0x67ef9a8d7f4ed931ac63e873b75d8f8dea64cdb2',
            };
          },
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
