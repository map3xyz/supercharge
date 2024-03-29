import { useContext } from 'react';

import { Context } from '../providers/Store';

const NO_ADDRESS = 'No address generated. Please contact support.';

export const useDepositAddress = () => {
  const [state, dispatch, { onAddressRequested }] = useContext(Context);

  const getDepositAddress = async (): Promise<{
    address: string;
    memo?: string;
  }> => {
    try {
      if (
        state.depositAddress.status === 'success' &&
        state.depositAddress.data
      ) {
        return state.depositAddress.data;
      }
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' });
      if (typeof onAddressRequested !== 'function') {
        throw new Error(NO_ADDRESS);
      }
      const { address, memo } = await onAddressRequested(
        state.asset?.symbol as string,
        state.network?.networkCode as string
      );
      if (!address) {
        throw new Error(NO_ADDRESS);
      }
      if (
        state.network?.regex?.address &&
        !RegExp(state.network.regex.address).test(address)
      ) {
        throw new Error(`Address format is invalid.`);
      }
      dispatch({
        payload: { address, memo },
        type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS',
      });

      return { address, memo };
    } catch (e: any) {
      dispatch({
        payload: e.message,
        type: 'GENERATE_DEPOSIT_ADDRESS_ERROR',
      });
      throw e;
    }
  };

  return {
    getDepositAddress,
  };
};
