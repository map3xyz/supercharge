import '@fortawesome/fontawesome-free/css/all.min.css';
import '@map3xyz/components/dist/index.css';
import './index.css';

import { Button, Modal } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';

import Logo from './assets/logo.svg';
import ProgressBar from './components/ProgressBar';
import { Context, Steps, Store } from './providers/Store';
import AssetSelection from './steps/AssetSelection';
import NetworkSelection from './steps/NetworkSelection';
import PaymentMethod from './steps/PaymentMethod';
interface Map3InitConfig {
  element: string;
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
        className="map3-sdk-modal"
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
        <div className="flex w-full items-center justify-between gap-4 px-4 py-3">
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
        <div className="!mt-0 w-full px-4 pb-2">
          <AnimatePresence exitBeforeEnter>
            {step === Steps.AssetSelection && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={'AssetSelection'}
              >
                <AssetSelection />
              </motion.div>
            )}
            {step === Steps.NetworkSelection && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={'NetworkSelection'}
              >
                <NetworkSelection />
              </motion.div>
            )}
            {step === Steps.PaymentMethod && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={'PaymentMethod'}
              >
                <PaymentMethod />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="!mt-0 w-full bg-neutral-100 px-4 py-3 dark:bg-neutral-800">
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
            <Button>{isLastStep ? 'Close' : 'Next'}</Button>
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
  private element: string;
  private onClose: () => void;
  private root: Root;

  constructor(config: Map3InitConfig) {
    this.element = config.element;
    this.onClose = () => {
      this.root.unmount();
    };

    const host = document.getElementById(this.element);
    if (!host) throw new Error(`Element ${this.element} not found`);

    this.root = createRoot(host);
  }

  public open() {
    this.root.render(
      <Store>
        <Map3Sdk onClose={this.onClose} />
      </Store>
    );
  }

  public close() {
    this.onClose();
  }
}

export const initMap3Sdk = ({ element }: Map3InitConfig) => {
  return new Map3({ element });
};

// attach to window
// @ts-ignore
window.initMap3Sdk = initMap3Sdk;

export default Map3Sdk;
