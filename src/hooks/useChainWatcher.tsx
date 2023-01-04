import { useContext, useEffect } from 'react';

import { Context, Steps } from '../providers/Store';

export const useChainWatcher = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.provider?.status !== 'success') return;

    state.provider?.data?.on?.('network', ({ chainId }) => {
      console.log('network', chainId);
      dispatch({ payload: chainId, type: 'SET_PROVIDER_CHAIN_ID' });
    });
  }, [state.provider?.status]);

  useEffect(() => {
    updateSteps();
  }, [state.providerChainId]);

  useEffect(() => {
    if (state.steps[state.step] === 'EnterAmount') {
      updateSteps();
    }
  }, [state.step]);

  const updateSteps = () => {
    if (!state.providerChainId) return;
    if (state.providerChainId === state.network?.identifiers?.chainId) {
      dispatch({
        payload: [
          'AssetSelection',
          'NetworkSelection',
          'PaymentMethod',
          'EnterAmount',
          'Result',
        ],
        type: 'SET_STEPS',
      });
      dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
      return;
    }

    dispatch({
      payload: [
        'AssetSelection',
        'NetworkSelection',
        'PaymentMethod',
        'SwitchChain',
        'EnterAmount',
        'Result',
      ],
      type: 'SET_STEPS',
    });
    dispatch({ payload: Steps.SwitchChain, type: 'SET_STEP' });
  };
};
