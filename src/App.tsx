import { Modal } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useState } from 'react';

import { Map3InitConfig } from '.';
import Logo from './assets/logo.svg';
import InnerWrapper from './components/InnerWrapper';
import ProgressBar from './components/ProgressBar';
import { Context, Steps, Store } from './providers/Store';
import AssetSelection from './steps/AssetSelection';
import EnterAmount from './steps/EnterAmount';
import NetworkSelection from './steps/NetworkSelection';
import PaymentMethod from './steps/PaymentMethod';
import QRCode from './steps/QRCode';

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
    <div data-testid="map3-modal">
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
              aria-label="Back"
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
          <AnimatePresence mode="wait">
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
            {step === Steps.Summary && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                {state.method?.value === 'qr' ? <QRCode /> : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="!mt-0 w-full border-t border-neutral-200 bg-neutral-100 py-2 text-center dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center justify-center">
            <a
              aria-label="Map3.xyz"
              className="flex gap-1 text-xxs text-neutral-400"
              href="https://map3.xyz"
              target="_blank"
            >
              Powered by <div className="h-3">{<Logo className="h-3" />}</div>
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const App: React.FC<AppProps> = ({ config, onClose }) => {
  return (
    <Store {...config}>
      <Map3Sdk onClose={onClose} />
    </Store>
  );
};

type Props = {
  onClose: () => void;
};

type AppProps = {
  config: Map3InitConfig;
  onClose: () => void;
};

export default App;
