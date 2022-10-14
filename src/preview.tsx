import '@map3xyz/components/dist/index.css';

import { Button } from '@map3xyz/components';
import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <Button
      onClick={() => {
        const map3 = initMap3Sdk({ element: 'map3-sdk-element' });
        map3.open();
      }}
    >
      Open SDK
    </Button>
    <div id="map3-sdk-element"></div>
  </div>
);
