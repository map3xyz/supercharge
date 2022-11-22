import { useContext } from 'react';

import { Context } from '../providers/Store';

export const useGetDepositAddress = () => {
  const [state, dispatch, { generateDepositAddress }] = useContext(Context);

  const getDepositAddress = async (memoEnabled: boolean) => {
    try {
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' });
      const { address, memo } = await generateDepositAddress(
        state.asset?.symbol as string,
        state.network?.symbol as string,
        memoEnabled
      );
      dispatch({
        payload: address,
        type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS',
      });
      return { address, memo };
    } catch (e) {
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' });
      throw new Error('Error generating a deposit address.');
    }
  };

  return {
    getDepositAddress,
  };
};
