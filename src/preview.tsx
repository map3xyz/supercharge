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
          generateDepositAddress: async (_coin, _network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              address: '0x388c818ca8b9251b393131c08a736a67ccb19297',
            };
          },
          networkCode: 'goerli',
          rainbowRoad: true,
          theme: 'dark',
          userId: 'preview-user-id',
        });
        map3.open();
      }}
    >
      Open SDK
    </button>
  </div>
);
