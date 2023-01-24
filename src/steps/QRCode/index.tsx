import { Badge, CryptoAddress, Pill, ReadOnlyText } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import MethodIcon from '../../components/MethodIcon';
import { MIN_CONFIRMATIONS } from '../../constants';
import {
  useAddWatchedAddressMutation,
  useRemoveWatchedAddressMutation,
} from '../../generated/apollo-gql';
import { useDepositAddress } from '../../hooks/useDepositAddress';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';
import { listenToWatchedAddress } from '../../utils/supabase';

const QRCode: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { getDepositAddress } = useDepositAddress();
  const [isWatching, setIsWatching] = React.useState<boolean>(false);

  const { width } = useModalSize();

  const [addWatchedAddress] = useAddWatchedAddressMutation();
  const [removeWatchedAddress] = useRemoveWatchedAddressMutation();

  if (!state.asset || !state.network || !state.method) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  useEffect(() => {
    setTimeout(() => {
      setIsWatching(true);
    }, 3000);
  }, []);

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
    <div className="flex h-full flex-col">
      <InnerWrapper className="!pt-0">
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="qrcode-method"
        >
          Scan QR Code
        </h3>
      </InnerWrapper>
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        Send {/* @ts-ignore */}
        <Badge color="blue" size="large">
          {state.requiredAmount} {state.asset.symbol || ''}
        </Badge>{' '}
        on the {/* @ts-ignore */}
        <Badge color="blue" size="large">
          {state.network?.name || ''} Network
        </Badge>{' '}
        via {/* @ts-ignore */}
        <Badge color="blue" size="large">
          {/* @ts-ignore */}
          <span className="flex items-center gap-1">
            <MethodIcon method={state.method} /> {state.method.name}
          </span>
        </Badge>
      </div>
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
              <div className="text-center text-xs text-neutral-400">
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
                    Monitoring{' '}
                    <CryptoAddress hint={false}>
                      {state.depositAddress.data.address}
                    </CryptoAddress>{' '}
                    for deposits.
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
                  size={width ? width - 200 : 0}
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
                <label className="text-xs text-neutral-500 dark:text-white">
                  Deposit Address
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

export default QRCode;
