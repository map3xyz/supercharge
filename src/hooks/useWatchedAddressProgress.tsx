import { useContext } from 'react';

import { MIN_CONFIRMATIONS } from '../constants';
import { Context } from '../providers/Store';

export const useWatchedAddressProgress = () => {
  const [state, dispatch] = useContext(Context);

  const handleConfirmed = () => {
    dispatch({
      payload: {
        data: '🚀 Transaction confirmed!',
        status: 'success',
        step: 'Confirmed',
      },
      type: 'SET_TX',
    });
  };

  const run = async (payload: WatchAddressPayload, submmitedDate: string) => {
    switch (payload.new.state) {
      case 'pending':
      case 'confirming':
        dispatch({
          payload: payload.new.tx_id,
          type: 'SET_TX_HASH',
        });
        dispatch({
          payload: payload.new.tx_formatted_amount,
          type: 'SET_TX_DISPLAY_AMOUNT',
        });
        dispatch({
          // @ts-expect-error
          payload: {
            to: payload.new.address,
          },
          type: 'SET_TX_RESPONSE',
        });
        dispatch({
          payload: {
            data: submmitedDate || new Date().toLocaleString(),
            status: 'success',
            step: 'Submitted',
          },
          type: 'SET_TX',
        });
        dispatch({
          payload: {
            data:
              state.tx.progress.Confirming.data ||
              `Transaction included in block ${payload.new.tx_block_height}.`,
            status: 'success',
            step: 'Confirming',
          },
          type: 'SET_TX',
        });
        const currentBlock =
          payload.new.tx_block_height + payload.new.tx_confirmations;
        const requiredBlock = payload.new.tx_block_height + MIN_CONFIRMATIONS;
        const remainingBlocks = Math.max(0, requiredBlock - currentBlock);
        const remainingBlocksText = remainingBlocks === 1 ? 'block' : 'blocks';
        console.log(requiredBlock, currentBlock, remainingBlocks);
        console.log(MIN_CONFIRMATIONS);
        if (remainingBlocks === 0) {
          handleConfirmed();
          return;
        }
        dispatch({
          payload: {
            data: `Current block height: ${currentBlock}. ${remainingBlocks} more ${remainingBlocksText} required for confirmation.`,
            status: 'loading',
            step: 'Confirmed',
          },
          type: 'SET_TX',
        });
        break;
      case 'confirmed':
        handleConfirmed();
        break;
    }
  };

  return { run };
};
