import { AnimatePresence, motion } from 'framer-motion';
import Logo from 'jsx:../assets/logo.svg';
import React, { useContext, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

import InnerWrapper from '../components/InnerWrapper';
import ProgressBar from '../components/ProgressBar';
import { Organization } from '../generated/apollo-gql';
import { useChainWatcher } from '../hooks/useChainWatcher';
import { Context, Steps } from '../providers/Store';
import AssetSelection from '../steps/AssetSelection';
import EnterAmount from '../steps/EnterAmount';
import NetworkSelection from '../steps/NetworkSelection';
import PaymentMethod from '../steps/PaymentMethod';
import BinancePay from './BinancePay';
import ConfirmRequiredAmount from './ConfirmRequiredAmount';
import Result from './Result';
import ShowAddress from './ShowAddress';
import SwitchChain from './SwitchChain';
import WalletConnect from './WalletConnect';

const Map3SdkSteps: React.FC<Props> = ({ onClose, plan }) => {
  const [state, dispatch] = useContext(Context);
  const { step, steps } = state;

  useChainWatcher();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ payload: Steps[steps[step]], type: 'SET_STEP_IN_VIEW' });
    }, 250);
  }, [step, steps]);

  return (
    <div
      className={`flex h-full w-full flex-col justify-between ${
        state.embed?.id || isMobile || isTablet ? '' : 'sm:!h-[520px]'
      }`}
      id="map3-modal-stepper"
    >
      <>
        <InnerWrapper>
          <div className="flex w-full items-center justify-between gap-4">
            <button
              aria-label="Back"
              className={step === 0 ? 'invisible' : 'visible'}
              onClick={() => {
                dispatch({
                  payload: Steps[state.steps[state.step - 1]],
                  type: 'SET_STEP',
                });
              }}
            >
              <i className="fa fa-long-arrow-left transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400" />
            </button>
            <ProgressBar progress={step / (steps.length - 1)} />
            {state.embed?.id || window.isMap3Hosted ? null : (
              <div>
                <button aria-label="Close" onClick={onClose}>
                  <i className="fa fa-close transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400" />
                </button>
              </div>
            )}
          </div>
        </InnerWrapper>
        <div className="!mt-0 h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {steps[step] === Steps[Steps.AssetSelection] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
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
                className="h-full"
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
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <PaymentMethod />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.SwitchChain] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <SwitchChain />
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
            {steps[step] === Steps[Steps.BinancePay] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <BinancePay />
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
            {steps[step] === Steps[Steps.ConfirmRequiredAmount] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <ConfirmRequiredAmount />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.ShowAddress] && (
              <motion.div
                animate={{ opacity: 1 }}
                className="h-full"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                key={Steps[step]}
              >
                <ShowAddress />
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
      {plan === 'enterprise' ? null : (
        <div className="!mt-0 w-full border-t border-primary-200 bg-primary-100 py-2 text-center dark:border-primary-700 dark:bg-primary-800">
          <div className="flex items-center justify-center">
            <a
              aria-label="Map3.xyz"
              className="flex gap-1 text-xxs text-primary-400"
              href="https://map3.xyz"
              target="_blank"
            >
              Powered by <div className="h-3">{<Logo className="h-3" />}</div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

type Props = {
  onClose: () => void;
  plan: Organization['plan'];
};

export default Map3SdkSteps;
