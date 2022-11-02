import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const map3 = initMap3Sdk({
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async (coin, network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
          },
          slug: 'Ethereum:Ethereum',
          theme: 'light',
        });
        map3.open();
      }}
    >
      Open SDK
    </button>
  </div>
);
