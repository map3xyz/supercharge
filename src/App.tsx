import '../i18n';

import { Modal } from '@map3xyz/components';
import { motion } from 'framer-motion';
import React, { Suspense, useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Map3InitConfig } from '.';
import AppWithAddressAndNetwork from './App.withAddressAndNetwork';
import AppWithAssetId from './App.withAssetId';
import AppWithNetwork from './App.withNetwork';
import LoadingWrapper from './components/LoadingWrapper';
import { useGetOrganizationByIdLazyQuery } from './generated/apollo-gql';
import { useWindowSize } from './hooks/useWindowSize';
import { Store } from './providers/Store';
import Map3SdkSteps from './steps';
import { parseJwt } from './utils/parseJwt';

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

  if (!config.options?.style?.embed?.id) {
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

  const height = config.options.style.embed.height || '500px';
  const width = config.options.style.embed.width || '320px';
  const offsetLeft = parseFloat(width) / 2;
  const offsetTop = parseFloat(height) / 2;

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={`map3 absolute overflow-hidden rounded-md border dark:border-primary-700 dark:bg-primary-900`}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0, scale: 0.5 }}
      style={{
        height: config.options.style.embed.height || '500px',
        left: `-${offsetLeft}px`,
        top: `-${offsetTop}px`,
        width: config.options.style.embed.width || '320px',
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
  const { options } = config;
  const [getOrganizationById, { data }] = useGetOrganizationByIdLazyQuery();
  const { selection, style } = options || {};
  const { address, assetId, networkCode } = selection || {};
  const { locale } = style || {};
  const [visible, setVisible] = useState(false);
  const { i18n } = useTranslation();

  useEffect(() => {
    if (locale !== 'en') {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  useEffect(() => {
    try {
      const { org_id } = parseJwt(config.anonKey);
      getOrganizationById({ variables: { id: org_id } });
    } catch (e) {
      console.error(e);
    }
  }, []);

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
        <Suspense fallback={<LoadingWrapper />}>
          {assetId ? (
            <AppWithAssetId
              config={config}
              onClose={handleClose}
              plan={data?.organizationById?.plan}
            />
          ) : address && networkCode ? (
            <AppWithAddressAndNetwork
              config={config}
              onClose={handleClose}
              plan={data?.organizationById?.plan}
            />
          ) : networkCode ? (
            <AppWithNetwork
              config={config}
              onClose={handleClose}
              plan={data?.organizationById?.plan}
            />
          ) : (
            <Store {...config}>
              <Map3SdkSteps
                onClose={handleClose}
                plan={data?.organizationById?.plan}
              />
            </Store>
          )}
        </Suspense>
      </Layout>
    </div>
  );
};

export type AppProps = {
  config: Map3InitConfig;
  onClose: () => void;
};

export default App;
