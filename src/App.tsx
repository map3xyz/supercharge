import { Modal } from '@map3xyz/components';
import React, { useEffect, useState } from 'react';

import { Map3InitConfig } from '.';
import AppWithAddressAndNetwork from './App.withAddressAndNetwork';
import AppWithAssetId from './App.withAssetId';
import AppWithNetwork from './App.withNetwork';
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

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div data-testid="map3-modal">
      <Modal
        className={`${minWidth('sm') ? 'map3' : 'map3 h-full w-full'}`}
        footerBackground
        onCancel={handleClose}
        size="tiny"
        visible={visible}
      >
        {assetId ? (
          <AppWithAssetId config={config} onClose={handleClose} />
        ) : address && networkCode ? (
          <AppWithAddressAndNetwork config={config} onClose={handleClose} />
        ) : networkCode ? (
          <AppWithNetwork config={config} onClose={handleClose} />
        ) : (
          <Store {...config}>
            <Map3SdkSteps onClose={handleClose} />
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
