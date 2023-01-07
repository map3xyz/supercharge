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

            return { address: '0xd8da6bf26964af9d7eed9e03e53415d37aa96045' };
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
