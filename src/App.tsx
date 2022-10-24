import { Modal } from '@map3xyz/components';
import React from 'react';

import { Map3InitConfig } from '.';
import AppWithAsset from './App.withAsset';
import AppWithAssetAndNetwork from './App.withAssetAndNetwork';
import Map3Sdk from './modal';
import { Store } from './providers/Store';

const TRANSITION = 300;

const App: React.FC<AppProps> = ({ config, onClose }) => {
  const [network, asset] = config.slug?.split(':') ?? [];

  return (
    <div data-testid="map3-modal">
      <Modal
        className="map3"
        footerBackground
        onCancel={onClose}
        size="small"
        transition={TRANSITION}
        visible
      >
        {asset && network ? (
          <AppWithAssetAndNetwork config={config} onClose={onClose} />
        ) : asset ? (
          <AppWithAsset config={config} onClose={onClose} />
        ) : (
          <Store {...config}>
            <Map3Sdk onClose={onClose} />
          </Store>
        )}
      </Modal>
    </div>
  );
};

export type AppProps = {
  config: Map3InitConfig;
  onClose: () => void;
};

export default App;
