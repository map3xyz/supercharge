import { createRoot } from 'react-dom/client';

import { initMap3Sdk } from '.';

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
  <div className="p-2">
    <button
      onClick={() => {
        const map3 = initMap3Sdk({
          theme: 'light',
        });
        map3.open();
      }}
    >
      Open SDK
    </button>
  </div>
);
