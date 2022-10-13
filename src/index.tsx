import '@fortawesome/fontawesome-free/css/all.min.css';

import { Modal } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

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
        alignFooter="right"
        confirmText={isLastStep ? 'Done' : 'Continue'}
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
        {step === 0 ? null : (
          <div className="absolute left-1 top-2 !mt-0 p-1.5 pt-0">
            <button
              onClick={() => dispatch({ payload: step - 1, type: 'SET_STEP' })}
            >
              <i className="fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
            </button>
          </div>
        )}
        <div className="absolute right-1 top-2 !mt-0 p-1.5 pt-0">
          <button onClick={handleClose}>
            <i className="fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
          </button>
        </div>
        <ProgressBar progress={step / Object.values(Steps).length} />
        <div className="!mt-0 w-full p-2">
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
      </Modal>
    </div>
  );
};

type Props = {
  onClose: () => void;
};

export const initMap3Sdk = ({ element }: Map3InitConfig) => {
  const host = document.getElementById(element);

  if (!host) throw new Error(`Element ${element} not found`);

  const root = createRoot(host);
  root.render(
    <Store>
      <Map3Sdk onClose={() => root.unmount()} />
    </Store>
  );
};

export default Map3Sdk;
