import { Badge, Pill, ReadOnlyText } from '@map3xyz/components';
import { build } from 'eth-url-parser';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import { posthog } from 'posthog-js';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import StepTitle from '../../components/StepTitle';
import { MIN_CONFIRMATIONS } from '../../constants';
import {
  useAddWatchedAddressMutation,
  useGetAssetByMappedAssetIdAndNetworkCodeQuery,
  useRemoveWatchedAddressMutation,
} from '../../generated/apollo-gql';
import { useDepositAddress } from '../../hooks/useDepositAddress';
import { useModalSize } from '../../hooks/useModalSize';
import { useWatchedAddressProgress } from '../../hooks/useWatchedAddressProgress';
import { Context, Steps } from '../../providers/Store';
import { listenToWatchedAddress } from '../../utils/supabase';

const { encode } = require('bip21');

const ShowAddress: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const watchedAddressRef = useRef<string | null>();
  const isWatchingRef = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useModalSize(ref);
  const { getDepositAddress } = useDepositAddress();
  const { run: runWatched } = useWatchedAddressProgress();

  const [addWatchedAddress] = useAddWatchedAddressMutation();
  const [removeWatchedAddress] = useRemoveWatchedAddressMutation();

  const {
    data,
    error,
    loading,
    refetch,
  } = useGetAssetByMappedAssetIdAndNetworkCodeQuery({
    skip: state.asset?.type !== 'asset',
    variables: {
      mappedAssetId: state.asset?.config?.mappedAssetId,
      networkCode: state.network?.networkCode,
    },
  });

  useEffect(() => {
    const run = async () => {
      try {
        const { address } = await getDepositAddress();

        const { data, errors } = await addWatchedAddress({
          variables: {
            address,
            assetId: state.asset!.id!,
            confirmationsToWatch: MIN_CONFIRMATIONS,
            expectedAmount: state.requiredAmountMinor,
          },
        });

        if (typeof data?.addWatchedAddress !== 'string' || errors?.length) {
          throw new Error('Unable to watch address.');
        } else {
          watchedAddressRef.current = data.addWatchedAddress;
        }

        const submittedDate = new Date().toLocaleString();
        const listener = listenToWatchedAddress(
          data.addWatchedAddress,
          (payload: WatchAddressPayload) => {
            switch (payload.new.state) {
              case 'confirming':
              case 'confirmed':
              case 'pending':
                if (payload.new.subscribed) {
                  isWatchingRef.current = true;
                  dispatch({ payload: Steps.Result, type: 'SET_STEP' });
                  runWatched(payload, submittedDate);
                }
            }

            if (payload.new.state === 'confirmed') {
              listener.unsubscribe();
              removeWatchedAddress({
                variables: { watchedAddressId: data.addWatchedAddress! },
              });
            }
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
      if (watchedAddressRef.current && !isWatchingRef.current) {
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

    switch (state.network?.networkCode) {
      case 'bitcoin':
      case 'litecoin':
      case 'bitcoincash':
      case 'doge':
        const bip21 = encode(
          state.depositAddress.data?.address,
          {
            amount: state.requiredAmountMajor,
          },
          state.asset?.networkCode
        );

        return setQrValue(bip21);
      case 'ethereum':
      case 'goerli':
      case 'polygon':
      case 'optimism':
      case 'arbitrum':
      case 'smartchain':
      case 'avalanchec':
      case 'fantom':
      case 'cronos':
      case 'palm':
      case 'ronin':
        // TODO - support ERC20
        if (state.asset?.type === 'asset') {
          return setQrValue(state.depositAddress.data?.address);
        } else {
          const eip681 = build({
            // @ts-ignore
            chain_id: state.network?.identifiers?.chainId,
            parameters: state.requiredAmountMajor
              ? {
                  value: ethers.utils
                    .parseEther(state.requiredAmountMajor)
                    .toString(),
                }
              : {},
            target_address: state.depositAddress.data?.address,
          });
          return setQrValue(eip681);
        }
      default:
        setQrValue(state.depositAddress.data?.address);
    }
  }, [
    state.depositAddress.data?.address,
    data?.assetByMappedAssetIdAndNetworkCode?.address,
  ]);

  if (!state.asset || !state.network || !state.method) {
    dispatch({ type: 'RESET_STATE' });
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center" ref={ref}>
      <InnerWrapper>
        <StepTitle testId="show-address-method" value="Pay to Address" />
      </InnerWrapper>
      <InnerWrapper className="h-full">
        {state.depositAddress.status === 'error' || error ? (
          <ErrorWrapper
            description={state.depositAddress.error || ''}
            header="Error Generating Address"
            retry={async () => {
              try {
                await getDepositAddress();
                await refetch();
              } catch (e) {
                console.error(e);
              }
            }}
          />
        ) : state.depositAddress.status === 'loading' || loading ? (
          <LoadingWrapper message="Generating Address..." />
        ) : (
          state.depositAddress.status === 'success' &&
          state.depositAddress.data &&
          qrValue && (
            <div className="flex h-full w-full flex-col items-center justify-between gap-2 sm:text-sm">
              <div className="px-4 text-center text-sm font-bold text-primary-400 sm:text-xs">
                Only send {state.requiredAmountMajor} {state.asset.symbol} on
                the {state.network?.networkName} to this address.
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
                {state.depositAddress.data.memo &&
                !state.network.identifiers?.chainId ? (
                  <div className="mb-1">
                    <label className="text-sm text-primary-500 dark:text-white sm:text-xs">
                      Memo:{' '}
                    </label>
                    <ReadOnlyText
                      copyButton
                      value={`${state.depositAddress.data.memo}`}
                    />
                    <div className="mt-1 w-full">
                      <Badge color="red" dot>
                        WARNING! To avoid the loss of funds, you must include
                        the memo in your transaction.
                      </Badge>
                    </div>
                  </div>
                ) : null}
                {state.requiredAmountMajor ? (
                  <div className="mb-1">
                    <label className="text-sm text-primary-500 dark:text-white sm:text-xs">
                      Amount:
                    </label>
                    <ReadOnlyText
                      copyButton
                      onCopyButtonClicked={() => {
                        posthog.capture('clicked copy required amount', {
                          property: `${state.requiredAmountMajor} ${state.asset?.symbol}`,
                        });
                      }}
                      value={`${state.requiredAmountMajor} ${state.asset.symbol}`}
                    />
                  </div>
                ) : null}
                <label className="text-sm text-primary-500 dark:text-white sm:text-xs">
                  Address:
                </label>
                <ReadOnlyText
                  copyButton
                  onCopyButtonClicked={() => {
                    posthog.capture('clicked copy address', {
                      property: `${state.depositAddress.data?.address}`,
                    });
                  }}
                  value={state.depositAddress.data.address}
                />
              </div>
            </div>
          )
        )}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default ShowAddress;
