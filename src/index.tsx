import { Modal } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import ProgressBar from './components/ProgressBar';
import AssetSelection from './steps/AssetSelection';
import PaymentMethod from './steps/PaymentMethod';

interface Map3InitConfig {
  element: string;
}

const TRANSITION = 300;

export enum Steps {
  'AssetSelection' = 0,
  'PaymentMethod' = 1,
}

const Map3Sdk: React.FC<Props> = ({ onClose }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(Steps.AssetSelection);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      onClose();
    }, TRANSITION);
  };

  return (
    <div>
      <Modal
        alignFooter="right"
        closable
        confirmText="Continue"
        footerBackground
        onCancel={handleClose}
        onConfirm={() => setStep(Steps[Steps[step + 1]])}
        size="small"
        transition={TRANSITION}
        visible={open}
      >
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
  root.render(<Map3Sdk onClose={() => root.unmount()} />);
};

export default Map3Sdk;
