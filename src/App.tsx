import { Modal } from '@map3xyz/components';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

import { Map3InitConfig } from '.';
import AppWithAddressAndNetwork from './App.withAddressAndNetwork';
import AppWithAssetId from './App.withAssetId';
import AppWithNetwork from './App.withNetwork';
import { useWindowSize } from './hooks/useWindowSize';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';

const Layout = ({
  children,
  config,
  handleClose,
  visible,
}: {
  children: React.ReactNode;
  config: Map3InitConfig;
  handleClose: () => void;
  visible: boolean;
}) => {
  const { minWidth } = useWindowSize();

  if (!config.embed?.id) {
    return (
      <Modal
        className={`${
          minWidth('sm') && !isMobile && !isTablet
            ? 'map3'
            : 'map3 h-full w-full'
        }`}
        footerBackground
        onCancel={handleClose}
        size="tiny"
        visible={visible}
      >
        {children}
      </Modal>
    );
  }

  const height = config.embed.height || '500px';
  const width = config.embed.width || '320px';
  const offsetLeft = parseFloat(width) / 2;
  const offsetTop = parseFloat(height) / 2;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={`map3 absolute overflow-hidden rounded-md border dark:border-primary-700 dark:bg-primary-900`}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, scale: 0.5 }}
      style={{
        height: config.embed.height || '500px',
        left: `-${offsetLeft}px`,
        top: `-${offsetTop}px`,
        width: config.embed.width || '320px',
      }}
      transition={{
        damping: 20,
        stiffness: 260,
        type: 'spring',
      }}
    >
      {children}
    </motion.div>
  );
};

const App: React.FC<AppProps> = ({ config, onClose }) => {
  const { address, assetId, networkCode } = config;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    return () => {
      setVisible(false);
    };
  }, []);

  const handleClose = () => {
    const yes = window.confirm('Are you sure you want to exit?');
    if (!yes) return;

    setVisible(false);
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <div data-testid="map3-modal">
      <Layout config={config} handleClose={handleClose} visible={visible}>
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
      </Layout>
    </div>
  );
};

export type AppProps = {
  config: Map3InitConfig;
  onClose: () => void;
};

export default App;
