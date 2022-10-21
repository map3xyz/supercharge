import '@fortawesome/fontawesome-free/css/all.min.css';
import '@map3xyz/components/dist/index.css';
import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Button, Modal } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Logo from './assets/logo.svg';
import InnerWrapper from './components/InnerWrapper';
import ProgressBar from './components/ProgressBar';
import { Context, Steps, Store } from './providers/Store';
import AssetSelection from './steps/AssetSelection';
import EnterAmount from './steps/EnterAmount';
import NetworkSelection from './steps/NetworkSelection';
import PaymentMethod from './steps/PaymentMethod';
import QRCode from './steps/QRCode';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:3001/api/graphql',
});

interface Map3InitConfig {
  generateDepositAddress: (asset?: string, network?: string) => Promise<string>;
  slug?: string;
  theme?: 'dark' | 'light';
}

const TRANSITION = 300;

const Map3Sdk: React.FC<Props> = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);

  const { step } = state;

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION);
  };

  const isLastStep = state.step === Steps.__LENGTH - 1;

  return (
    <div>
      <Modal
        className="map3"
        footerBackground
        onCancel={handleClose}
        onConfirm={() =>
          isLastStep
            ? handleClose()
            : dispatch({ payload: step + 1, type: 'SET_STEP' })
        }
        size="small"
        transition={TRANSITION}
        visible={open}
      >
        <InnerWrapper>
          <div className="flex w-full items-center justify-between gap-4">
            <button
              className={step === 0 ? 'invisible' : 'visible'}
              onClick={() => dispatch({ payload: step - 1, type: 'SET_STEP' })}
            >
              <i className="fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
            </button>
            <ProgressBar progress={step / (Steps.__LENGTH - 1)} />
            <div>
              <button onClick={handleClose}>
                <i className="fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
              </button>
            </div>
          </div>
        </InnerWrapper>
        <div className="!mt-0 w-full">
          <AnimatePresence exitBeforeEnter>
            {step === Steps.AssetSelection && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <AssetSelection />
              </motion.div>
            )}
            {step === Steps.NetworkSelection && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <NetworkSelection />
              </motion.div>
            )}
            {step === Steps.PaymentMethod && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <PaymentMethod />
              </motion.div>
            )}
            {step === Steps.EnterAmount && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <EnterAmount />
              </motion.div>
            )}
            {step === Steps.QRCode && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <QRCode />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="!mt-0 w-full border-t border-neutral-200 bg-neutral-100 px-4 py-3 dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-end justify-between">
            <a
              aria-label="Map3.xyz"
              className="flex items-end gap-1 text-xxs text-neutral-400"
              href="https://map3.xyz"
              target="_blank"
            >
              Powered by{' '}
              <div className="h-3">
                <Logo className="h-3" />
              </div>
            </a>
            <Button
              onClick={() => {
                if (isLastStep) {
                  handleClose();
                } else {
                  dispatch({ payload: step + 1, type: 'SET_STEP' });
                }
              }}
            >
              {isLastStep ? 'Close' : 'Next'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

type Props = {
  onClose: () => void;
};

export class Map3 {
  private onClose: () => void;
  private root: Root;
  private config: Map3InitConfig;

  constructor(config: Map3InitConfig) {
    if (!config.generateDepositAddress) {
      throw new Error('generateDepositAddress is required');
    }

    if (!config.theme) {
      config.theme = 'light';
    }

    this.config = config;

    this.onClose = () => {
      this.root.unmount();
      document.body.classList.remove('dark');
    };

    const element = document.createElement('div');
    element.id = 'map3';
    document.body.appendChild(element);

    if (config.theme === 'dark') {
      document.body.classList.add('dark');
    }

    this.root = createRoot(element);
  }

  public open() {
    this.root.render(
      <ApolloProvider client={client}>
        <Store {...this.config}>
          <Map3Sdk onClose={this.onClose} />
        </Store>
      </ApolloProvider>
    );
  }

  public close() {
    this.onClose();
  }
}

export const initMap3Sdk = (args: Map3InitConfig) => {
  return new Map3(args);
};

// @ts-ignore
window.initMap3Sdk = initMap3Sdk;

export default Map3Sdk;
