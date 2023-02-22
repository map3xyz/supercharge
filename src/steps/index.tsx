import { Badge } from '@map3xyz/components';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from 'jsx:../assets/logo.svg';
import React, { useContext, useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

import { BgOffsetWrapper } from '../components/BgOffsetWrapper';
import InnerWrapper from '../components/InnerWrapper';
import ProgressBar from '../components/ProgressBar';
import { Organization } from '../generated/apollo-gql';
import { useChainWatcher } from '../hooks/useChainWatcher';
import { useOrderHistoryStorageWatcher } from '../hooks/useOrderHistoryStorageWatcher';
import { Context, Steps } from '../providers/Store';
import AssetSelection from '../steps/AssetSelection';
import EnterAmount from '../steps/EnterAmount';
import NetworkSelection from '../steps/NetworkSelection';
import PaymentMethod from '../steps/PaymentMethod';
import BinancePay from './BinancePay';
import ConfirmRequiredAmount from './ConfirmRequiredAmount';
import OrderHistory from './OrderHistory';
import Result from './Result';
import ShowAddress from './ShowAddress';
import SwitchChain from './SwitchChain';
import WalletConnect from './WalletConnect';

const ANIMATION_DURATION = 0.2;

const Map3SdkSteps: React.FC<Props> = ({ onClose, plan }) => {
  const [state, dispatch] = useContext(Context);
  const { prevStep, prevSteps, step, stepInView, steps } = state;

  useChainWatcher();
  useOrderHistoryStorageWatcher();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ payload: Steps[steps[step]], type: 'SET_STEP_IN_VIEW' });
    }, ANIMATION_DURATION * 1000);
  }, [step, steps]);

  const variants = {
    exit: { opacity: 0, transition: { duration: ANIMATION_DURATION } },
    hidden: { opacity: 0, transition: { duration: ANIMATION_DURATION } },
    visible: { opacity: 1, transition: { duration: ANIMATION_DURATION } },
  };

  return (
    <div
      className={`flex h-full w-full flex-col justify-between ${
        state.embed?.id || isMobile || isTablet ? '' : 'sm:!h-[520px]'
      }`}
      id="map3-modal-stepper"
    >
      <>
        <InnerWrapper className="!pb-0">
          <div className="flex w-full items-center justify-between gap-4">
            <button
              aria-label="Back"
              className={step === 0 ? 'invisible' : 'visible'}
              onClick={() => {
                if (steps[step] === Steps[Steps.OrderHistory]) {
                  dispatch({
                    payload: prevSteps,
                    type: 'SET_STEPS',
                  });
                  dispatch({
                    payload: Steps[prevSteps[prevStep]],
                    type: 'SET_STEP',
                  });
                } else {
                  dispatch({
                    payload: Steps[steps[step - 1]],
                    type: 'SET_STEP',
                  });
                }
              }}
            >
              <i className="fa fa-long-arrow-left transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400" />
            </button>
            {steps[step] === Steps[Steps.OrderHistory] ? null : (
              <ProgressBar progress={step / (steps.length - 1)} />
            )}
            {state.embed?.id || window.isMap3Hosted ? null : (
              <div>
                <button aria-label="Close" onClick={onClose}>
                  <i className="fa fa-close transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400" />
                </button>
              </div>
            )}
          </div>
        </InnerWrapper>
        <AnimatePresence>
          {state.orderHistory.length &&
          steps[step] !== Steps[Steps.OrderHistory] &&
          prevSteps[stepInView] !== Steps[Steps.OrderHistory] ? (
            <motion.div
              animate="visible"
              exit="exit"
              initial="hidden"
              variants={variants}
            >
              <BgOffsetWrapper
                border="y"
                className="group mt-3 cursor-pointer !py-2"
                onClick={() => {
                  dispatch({
                    payload: [...steps, 'OrderHistory'],
                    type: 'SET_STEPS',
                  });
                  dispatch({
                    payload: Steps.OrderHistory,
                    type: 'SET_STEP',
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-normal">Active Orders</div>
                  <div className="flex items-center gap-2">
                    <Badge color="blue" dot>
                      {/* @ts-ignore */}
                      {state.orderHistory.length}
                    </Badge>
                    <i className="fa fa-long-arrow-right transition-colors duration-75 dark:text-primary-700 dark:hover:text-primary-400 dark:group-hover:text-primary-400" />
                  </div>
                </div>
              </BgOffsetWrapper>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="h-full w-full overflow-hidden">
          <AnimatePresence mode="wait">
            {steps[step] === Steps[Steps.AssetSelection] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <AssetSelection />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.NetworkSelection] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <NetworkSelection />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.PaymentMethod] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <PaymentMethod />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.SwitchChain] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <SwitchChain />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.EnterAmount] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <EnterAmount />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.BinancePay] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <BinancePay />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.WalletConnect] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <WalletConnect />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.ConfirmRequiredAmount] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <ConfirmRequiredAmount />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.ShowAddress] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <ShowAddress />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.Result] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                key={Steps[step]}
                variants={variants}
              >
                <Result />
              </motion.div>
            )}
            {steps[step] === Steps[Steps.OrderHistory] && (
              <motion.div
                animate="visible"
                className="h-full"
                exit="exit"
                initial="hidden"
                variants={variants}
              >
                <OrderHistory />
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
