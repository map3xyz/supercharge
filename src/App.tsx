import { Modal } from '@map3xyz/components';
import React, { useEffect, useState } from 'react';

import { Map3InitConfig } from '.';
import AppWithAddress from './App.withAddress';
import AppWithAddressAndNetwork from './App.withAddressAndNetwork';
import AppWithAssetId from './App.withAssetId';
import { useWindowSize } from './hooks/useWindowSize';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';

const App: React.FC<AppProps> = ({ config, onClose }) => {
  const { address, assetId, networkCode } = config;
  const [visible, setVisible] = useState(false);
  const { minWidth } = useWindowSize();

  useEffect(() => {
    setVisible(true);

    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <div data-testid="map3-modal">
      <Modal
        className={`map3 ${minWidth('sm') ? '' : 'h-full w-full'}`}
        footerBackground
        onCancel={onClose}
        size="tiny"
        visible={visible}
      >
        {assetId ? (
          <AppWithAssetId config={config} onClose={onClose} />
        ) : address && networkCode ? (
          <AppWithAddressAndNetwork config={config} onClose={onClose} />
        ) : address ? (
          <AppWithAddress config={config} onClose={onClose} />
        ) : (
          <Store {...config}>
            <Map3SdkSteps onClose={onClose} />
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
