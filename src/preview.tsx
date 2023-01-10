import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';
import { CONSOLE_ANON_KEY } from './constants';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const map3 = initMap3Sdk({
          anonKey: process.env.CONSOLE_ANON_KEY || CONSOLE_ANON_KEY,
          generateDepositAddress: async (_coin, _network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              address: '0xd59d78c15Ecc41b8c01382b4a616Ee4eBf1e18Af',
              memo: '0x666f',
            };
          },
          networkCode: 'goerli',
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
