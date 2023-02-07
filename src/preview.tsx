import { createRoot } from 'react-dom/client';

import { initMap3Supercharge } from '.';
import { wait } from './utils/wait';

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
              handleOrderFeeCalculation: async (asset, networkCode, amount) => {
                await wait(1000);

                return {
                  fixedFee: 0.1,
                  message: 'Lorem ipsum dolor ipsum dolor ipsum dolor',
                  variableFee: 0.1,
                };
              },
            },
            selection: {
              assetId: '6b562c23-d79f-4a34-a47f-cc7b28726821',
              paymentMethod: 'binance-pay',
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
