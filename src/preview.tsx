import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const map3 = initMap3Sdk({
          generateDepositAddress: async (coin, network) => {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            return '0x0000000000000000000000000000000000000000';
          },
          slug: ':bitcoin',
          theme: 'dark',
        });
        map3.open();
      }}
    >
      Open SDK
    </button>
  </div>
);
