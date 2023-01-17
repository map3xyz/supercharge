import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const map3 = initMap3Sdk({
          address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
          amount: '0.1',
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          generateDepositAddress: async (_coin, _network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return {
              address: '0x165CD37b4C644C2921454429E7F9358d18A45e14',
              memo: '0x666f',
            };
          },
          networkCode: 'polygon',
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
