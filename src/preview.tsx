import { Button } from '@map3xyz/components';
import { createRoot } from 'react-dom/client';

import { initMap3Supercharge } from '.';

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
  <div className="map3 p-2">
    <Button
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      onClick={() => {
        const supercharge = initMap3Supercharge({
          anonKey: process.env.CONSOLE_ANON_KEY || '',
          options: {
            callbacks: {
              onAddressRequested: async (asset) => {
                if (asset === 'TBTC') {
                  return {
                    address:
                      'tb1q0dcxd8487kw3z3r5a0s6p5dyd9365s4dx3mu6wcyzgtdsje3a2cq6mcvve',
                  };
                } else {
                  return {
                    address: '0xf32aab5cE63eF6ABC39f2F6A0586999716d889Dc',
                  };
                }
              },
            },
            style: {
              embed: {
                id: 'supercharge',
              },
            },
          },
          userId: 'preview-user-id',
        });
        supercharge.open();
      }}
      size="xlarge"
    >
      Open SDK
    </Button>
    <div
      id="supercharge"
      style={{ left: '50%', position: 'absolute', top: '50%' }}
    ></div>
  </div>
);
