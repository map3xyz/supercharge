import React from 'react';

import { Map3InitConfig } from '.';
import Map3Sdk from './modal';
import { Store } from './providers/Store';

const App: React.FC<AppProps> = ({ config, onClose }) => {
  return (
    <Store {...config}>
      <Map3Sdk onClose={onClose} />
    </Store>
  );
};

export type AppProps = {
  config: Map3InitConfig;
  onClose: () => void;
};

export default App;
