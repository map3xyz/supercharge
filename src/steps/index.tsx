import { AnimatePresence, motion } from 'framer-motion';
import Logo from 'jsx:../assets/logo.svg';
import React, { useContext } from 'react';

import InnerWrapper from '../components/InnerWrapper';
import ProgressBar from '../components/ProgressBar';
import { Context, Steps } from '../providers/Store';
import AssetSelection from '../steps/AssetSelection';
import EnterAmount from '../steps/EnterAmount';
import NetworkSelection from '../steps/NetworkSelection';
import PaymentMethod from '../steps/PaymentMethod';
import QRCode from '../steps/QRCode';
import Result from './Result';
import WalletConnect from './WalletConnect';

const Map3SdkSteps: React.FC<Props> = ({ onClose }) => {
  const [state, dispatch] = useContext(Context);

  const { step, steps } = state;

  return (
    <div
      className="flex h-full w-full flex-col justify-between sm:!h-[500px]"
      id="map3-modal-stepper"
    >
      <>
        <InnerWrapper>
          <div className="flex w-full items-center justify-between gap-4">
            <button
              aria-label="Back"
              className={step === 0 ? 'invisible' : 'visible'}
              onClick={() => dispatch({ payload: step - 1, type: 'SET_STEP' })}
            >
              <i className="fa transition-color fa-long-arrow-left duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
            </button>
            <ProgressBar progress={step / (steps.length - 1)} />
            <div>
              <button onClick={onClose}>
                <i className="fa transition-color fa-close duration-75 dark:text-neutral-600 dark:hover:text-neutral-400" />
              </button>
            </div>
          </div>
        </InnerWrapper>
        <div className="!mt-0 h-full w-full overflow-scroll">
          <AnimatePresence mode="wait">
            {steps[step] === Steps[Steps.AssetSelection] && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <AssetSelection />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.NetworkSelection] && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <NetworkSelection />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.PaymentMethod] && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <PaymentMethod />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.EnterAmount] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <EnterAmount />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.WalletConnect] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <WalletConnect />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.QRCode] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <QRCode />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.Result] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <Result />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
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
    </div>
  );
};

type Props = {
  onClose: () => void;
};

export default Map3SdkSteps;
