import { Pill, ReadOnlyText } from '@map3xyz/components';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import StepTitle from '../../components/StepTitle';
import { MIN_CONFIRMATIONS } from '../../constants';
import {
  useAddWatchedAddressMutation,
  useRemoveWatchedAddressMutation,
} from '../../generated/apollo-gql';
import { useDepositAddress } from '../../hooks/useDepositAddress';
import { useModalSize } from '../../hooks/useModalSize';
import { useWatchedAddressProgress } from '../../hooks/useWatchedAddressProgress';
import { Context, Steps } from '../../providers/Store';
import { listenToWatchedAddress } from '../../utils/supabase';

const bip21 = require('bip21');

const ShowAddress: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const watchedAddressRef = useRef<string | null>();
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useModalSize(ref);
  const { getDepositAddress } = useDepositAddress();
  const { run: runWatched } = useWatchedAddressProgress();

  const [addWatchedAddress] = useAddWatchedAddressMutation();
  const [removeWatchedAddress] = useRemoveWatchedAddressMutation();

  if (!state.asset || !state.network || !state.method) {
    dispatch({ type: 'RESET_STATE' });
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
          watchedAddressRef.current = data.addWatchedAddress;
        }

        const submittedDate = new Date().toLocaleString();
        listenToWatchedAddress(
          data.addWatchedAddress,
          (payload: WatchAddressPayload) => {
            switch (payload.new.state) {
              case 'confirming':
              case 'confirmed':
              case 'pending':
                if (payload.new.subscribed) {
                  dispatch({ payload: Steps.Result, type: 'SET_STEP' });
                }
            }

            runWatched(payload, data.addWatchedAddress!, submittedDate);
          }
        );
      } catch (e) {
        console.error(e);
      }
    };
    run();
  }, []);

  useEffect(() => {
    return () => {
      if (watchedAddressRef.current) {
        removeWatchedAddress({
          variables: { watchedAddressId: watchedAddressRef.current },
        });
      }
      dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' });
    };
  }, []);

  useEffect(() => {
    if (!state.depositAddress.data?.address) {
      return;
    }
    switch (state.asset?.networkCode) {
      case 'bitcoin':
      case 'litecoin':
      case 'bitcoincash':
      case 'doge':
        return setQrValue(
          bip21.encode(
            state.depositAddress.data?.address,
            {
              amount: state.requiredAmount,
            },
            state.asset.networkCode
          )
        );
    }
  }, [state.depositAddress.data?.address]);

  return (
    <div className="flex h-full flex-col items-center" ref={ref}>
      <InnerWrapper>
        <StepTitle testId="show-address-method" value="Pay to Address" />
      </InnerWrapper>
      {state.depositAddress.status === 'error' && (
        <ErrorWrapper
          description={state.depositAddress.error || ''}
          header="Error Generating Address"
          retry={async () => {
            try {
              await getDepositAddress();
            } catch (e) {
              console.error(e);
            }
          }}
        />
      )}
      <InnerWrapper className="h-full">
        {state.depositAddress.status === 'loading' && (
          <LoadingWrapper message="Generating Address..." />
        )}
        {state.depositAddress.status === 'success' &&
          state.depositAddress.data &&
          qrValue && (
            <div className="flex h-full w-full flex-col items-center justify-between gap-2 text-sm">
              <div className="px-4 text-center text-xs font-bold text-primary-400">
                Only send {state.requiredAmount} {state.asset.symbol} on the{' '}
                {state.network?.networkName} to this address.
              </div>
              {watchedAddressRef.current && state.depositAddress.data && (
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
              <span className="hidden" data-testid="qr-value">
                {qrValue}
              </span>
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
                  value={qrValue}
                />
              </div>
              <div className="w-full">
                {state.requiredAmount ? (
                  <div className="mb-1">
                    <label className="text-xs text-primary-500 dark:text-white">
                      Amount:
                    </label>
                    <ReadOnlyText
                      copyButton
                      value={`${state.requiredAmount} ${state.asset.symbol}`}
                    />
                  </div>
                ) : null}
                <label className="text-xs text-primary-500 dark:text-white">
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
