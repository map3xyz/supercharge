import { useContext, useEffect } from 'react';

import { Context } from '../providers/Store';

export const useDepositAddress = () => {
  const [state, dispatch, { generateDepositAddress }] = useContext(Context);

  const getDepositAddress = async (
    memoEnabled: boolean
  ): Promise<{ address: string; memo?: string }> => {
    try {
      if (
        state.depositAddress.status === 'success' &&
        state.depositAddress.data
      ) {
        return state.depositAddress.data;
      }
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' });
      const { address, memo } = await generateDepositAddress(
        state.asset?.symbol as string,
        state.network?.symbol as string,
        memoEnabled
      );
      dispatch({
        payload: { address, memo },
        type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS',
      });

      return { address, memo };
    } catch (e) {
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' });
      throw new Error('Error generating a deposit address.');
    }
  };

  useEffect(() => {
    dispatch({
      type: 'GENERATE_DEPOSIT_ADDRESS_IDLE',
    });
  }, [state.network?.name, state.asset?.symbol]);

  return {
    getDepositAddress,
  };
};
