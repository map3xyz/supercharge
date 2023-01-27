import { Pill, ReadOnlyText } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { MIN_CONFIRMATIONS } from '../../constants';
import {
  useAddWatchedAddressMutation,
  useRemoveWatchedAddressMutation,
} from '../../generated/apollo-gql';
import { useDepositAddress } from '../../hooks/useDepositAddress';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';
import { listenToWatchedAddress } from '../../utils/supabase';

const ShowAddress: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { getDepositAddress } = useDepositAddress();
  const [isWatching, setIsWatching] = React.useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useModalSize(ref);

  const [addWatchedAddress] = useAddWatchedAddressMutation();
  const [removeWatchedAddress] = useRemoveWatchedAddressMutation();

  if (!state.asset || !state.network || !state.method) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  useEffect(() => {
    const run = async () => {
      try {
        const { address } = await getDepositAddress();

        const { data, errors } = await addWatchedAddress({
          variables: {
            address,
            assetId: state.asset!.id!,
            confirmationsToWatch: MIN_CONFIRMATIONS,
          },
        });

        if (typeof data?.addWatchedAddress !== 'string' || errors?.length) {
          throw new Error('Unable to watch address.');
        } else {
          setTimeout(() => {
            setIsWatching(true);
          }, 2000);
        }

        let submmitedDate: string | undefined;
        listenToWatchedAddress(
          data.addWatchedAddress,
          (payload: WatchAddressPayload) => {
            dispatch({ payload: Steps.Result, type: 'SET_STEP' });
            switch (payload.new.state) {
              case 'confirming':
                dispatch({
                  payload: payload.new.tx_id,
                  type: 'SET_TX_HASH',
                });
                dispatch({
                  payload: payload.new.tx_formatted_amount,
                  type: 'SET_TX_AMOUNT',
                });
                dispatch({
                  // @ts-expect-error
                  payload: {
                    to: payload.new.address,
                  },
                  type: 'SET_TX_RESPONSE',
                });
                submmitedDate = submmitedDate || new Date().toLocaleString();
                dispatch({
                  payload: {
                    data: submmitedDate,
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
                const requiredBlock =
                  payload.new.tx_block_height + MIN_CONFIRMATIONS;
                const remainingBlocks = Math.max(
                  0,
                  requiredBlock - currentBlock
                );
                const remainingBlocksText =
                  remainingBlocks === 1 ? 'block' : 'blocks';
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
                dispatch({
                  payload: {
                    data: '🚀 Transaction confirmed!',
                    status: 'success',
                    step: 'Confirmed',
                  },
                  type: 'SET_TX',
                });
                removeWatchedAddress({
                  variables: { watchedAddressId: data.addWatchedAddress! },
                });
                break;
            }
          }
        );
      } catch (e) {
        console.error(e);
      }
    };
    run();

    return () => dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' });
  }, []);

  return (
    <div className="flex h-full flex-col" ref={ref}>
      <InnerWrapper className="!pt-0">
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="show-address-method"
        >
          Pay to Address
        </h3>
      </InnerWrapper>
      <InnerWrapper className="h-full">
        {state.depositAddress.status === 'loading' && (
          <LoadingWrapper message="Generating Address..." />
        )}
        {state.depositAddress.status === 'error' && (
          <ErrorWrapper
            description={state.depositAddress.error || ''}
            header="Error Generating Address"
            retry={() => {
              try {
                getDepositAddress();
              } catch (e) {
                console.error(e);
              }
            }}
          />
        )}
        {state.depositAddress.status === 'success' &&
          state.depositAddress.data && (
            <div className="flex h-full w-full flex-col items-center justify-between gap-2 text-sm">
              <div className="px-4 text-center text-xs font-bold text-neutral-400">
                Only send {state.requiredAmount} {state.asset.symbol} on the{' '}
                {state.network?.name} Network to this address.
              </div>
              {isWatching && state.depositAddress.data && (
                <motion.div
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  <Pill
                    color="yellow"
                    icon={<i className="fa fa-spinner animate-spin" />}
                  >
                    Monitoring for deposits.
                  </Pill>
                </motion.div>
              )}
              <div className="flex w-full justify-center">
                <QRCodeSVG
                  bgColor={state.theme === 'dark' ? '#262626' : '#FFFFFF'}
                  className="rounded-lg"
                  fgColor={state.theme === 'dark' ? '#FFFFFF' : '#000000'}
                  imageSettings={{
                    excavate: false,
                    height: 32,
                    src: state.asset.logo?.png || state.asset.logo?.svg || '',
                    width: 32,
                  }}
                  includeMargin={true}
                  size={width ? width - 160 : 0}
                  style={{
                    border:
                      state.theme === 'dark'
                        ? '1px solid #404040'
                        : '1px solid #e5e5e5',
                  }}
                  value={state.depositAddress.data.address}
                />
              </div>
              <div className="w-full">
                {state.requiredAmount ? (
                  <div className="mb-1">
                    <label className="text-xs text-neutral-500 dark:text-white">
                      Amount:
                    </label>
                    <ReadOnlyText
                      copyButton
                      value={`${state.requiredAmount} ${state.asset.symbol}`}
                    />
                  </div>
                ) : null}
                <label className="text-xs text-neutral-500 dark:text-white">
                  Address:
                </label>
                <ReadOnlyText
                  copyButton
                  value={state.depositAddress.data.address}
                />
              </div>
            </div>
          )}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default ShowAddress;
