import { Badge } from '@map3xyz/components';
import { ethers } from 'ethers';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { isChrome, isEdge, isFirefox, isOpera } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import BinancePay from '../../components/methods/BinancePay';
import WalletConnect from '../../components/methods/WalletConnect';
import WindowEthereum from '../../components/methods/WindowEthereum';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import StepTitle from '../../components/StepTitle';
import {
  CreateBridgeQuoteMutation,
  useCreateBridgeQuoteMutation,
  useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery,
  useGetAssetByMappedAssetIdAndNetworkCodeQuery,
  useGetAssetPriceQuery,
} from '../../generated/apollo-gql';
import { usePrebuildTx } from '../../hooks/usePrebuildTx';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps } from '../../providers/Store';

const BASE_FONT_SIZE = 16;
const BASE_FONT_MULTIPLIER = 3;
const INSUFFICIENT_FUNDS = 'This amount exceeds your ';
export const DECIMAL_FALLBACK = 8;
export const DOWNLOAD_EXTENSION = 'Download Extension';

export type SubmitHandler = {
  submit: () => void;
};

const EnterAmountForm: React.FC<{ price: number }> = ({ price }) => {
  const { t } = useTranslation();
  const [state, dispatch, { onAddressRequested }] = useContext(Context);
  const [isConfirming, setIsConfirming] = useState(false);
  const [formError, setFormError] = useState<string | undefined>('');
  const [formValue, setFormValue] = useState<{
    base: string;
    inputSelected: 'crypto' | 'fiat';
    quote: string;
  }>({ base: '0', inputSelected: price ? 'fiat' : 'crypto', quote: '0' });
  const [amount, setAmount] = useState<string>('0');
  const dummyFormRef = useRef<HTMLSpanElement>(null);
  const dummyInputRef = useRef<HTMLSpanElement>(null);
  const dummySymbolRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const quoteRef = useRef<HTMLSpanElement>(null);
  const submitRef = useRef<SubmitHandler>(null);
  const extensionLink =
    state.method?.links?.[
      isChrome
        ? 'chrome'
        : isEdge
        ? 'edge'
        : isFirefox
        ? 'firefox'
        : isOpera
        ? 'opera'
        : 'chrome'
    ];

  useEffect(() => {
    if (!state.requiredAmount) return;

    if (inputRef.current && dummyInputRef.current) {
      inputRef.current.value = state.requiredAmount;
    }

    setFormValue({
      base: state.requiredAmount,
      inputSelected: 'crypto',
      quote: (Number(state.requiredAmount) * (price || 0)).toFixed(2),
    });
  }, [
    inputRef.current,
    state.requiredAmount,
    state.prebuiltTx.data?.maxLimitFormatted,
  ]);

  const [
    getAssetMappedAssetIdAndNetworkCodeQueryLazy,
  ] = useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery();
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
  const [
    createBridgeQuote,
    { loading: bridgeQuoteLoading },
  ] = useCreateBridgeQuoteMutation();

  const { handleAuthorizeTransactionProxy } = useWeb3();
  const { prebuildTx } = usePrebuildTx();

  useEffect(() => {
    if (!dummyInputRef.current || !dummySymbolRef.current) return;

    dummyInputRef.current.innerText = formValue.base;
    dummySymbolRef.current.innerText =
      formValue.inputSelected === 'crypto'
        ? state.asset?.symbol || 'BTC'
        : state.fiatDisplaySymbol || '$';
    let nextInputWidth = dummyInputRef.current!.getBoundingClientRect().width;
    const dummyFormWidth = dummyFormRef.current!.getBoundingClientRect().width;
    const formWidth = formRef.current!.getBoundingClientRect().width;
    const htmlFontSize =
      parseFloat(window.getComputedStyle(document.documentElement).fontSize) ||
      BASE_FONT_SIZE;

    if (inputRef.current && formRef.current) {
      if (dummyFormWidth > formWidth) {
        /* istanbul ignore next */
        const percentFontChange = formWidth / dummyFormWidth;
        /* istanbul ignore next */
        const fontSize =
          Math.floor(htmlFontSize * BASE_FONT_MULTIPLIER * percentFontChange) -
          0.5;

        /* istanbul ignore next */
        nextInputWidth = formWidth;

        /* istanbul ignore next */
        formRef.current.style.fontSize = `${fontSize}px`;
        /* istanbul ignore next */
        inputRef.current.style.maxWidth = `${nextInputWidth}px`;
      } else {
        inputRef.current.style.maxWidth = `${nextInputWidth}px`;
        formRef.current.style.fontSize = `${
          BASE_FONT_SIZE * BASE_FONT_MULTIPLIER
        }px`;
      }
    }
  }, [
    formValue,
    state.depositAddress.data,
    data?.assetByMappedAssetIdAndNetworkCode?.address,
  ]);

  useEffect(() => {
    try {
      const base = ethers.FixedNumber.from(formValue.base || '0');
      const fixedRate = ethers.FixedNumber.from(price.toString());
      const decimals = state.asset?.decimals || DECIMAL_FALLBACK;
      const maxDisplayDecimals = Math.min(6, decimals);

      const quote =
        formValue.inputSelected === 'crypto'
          ? base.mulUnsafe(fixedRate)
          : base.divUnsafe(fixedRate);

      setFormValue((formValue) => ({
        ...formValue,
        quote:
          formValue.inputSelected === 'crypto'
            ? quote.round(2).toString()
            : quote.round(maxDisplayDecimals).toString(),
      }));

      if (base.isZero()) return setAmount('0');

      setAmount(
        formValue.inputSelected === 'crypto'
          ? base.round(decimals).toString()
          : quote.round(maxDisplayDecimals).toString()
      );
    } catch (e) {
      console.error(e);
    }
  }, [formValue.base]);

  useEffect(() => {
    if (!formValue.base || !formValue.quote) {
      setFormError(undefined);
      return;
    }
    if (!state.prebuiltTx.data?.maxLimitFormatted) return;
    const { maxLimitRaw } = state.prebuiltTx.data;
    const cryptoAmt =
      formValue.inputSelected === 'crypto' ? formValue.base : formValue.quote;
    let cryptoAmtWei: ethers.BigNumber;
    try {
      cryptoAmtWei = ethers.utils.parseUnits(
        cryptoAmt,
        state.asset?.decimals || DECIMAL_FALLBACK
      );
    } catch (e) {
      const decimals = cryptoAmt
        .split('.')[1]
        .slice(0, state.asset?.decimals || DECIMAL_FALLBACK);
      cryptoAmtWei = ethers.utils.parseUnits(
        cryptoAmt.split('.')[0] + '.' + decimals,
        state.asset?.decimals || DECIMAL_FALLBACK
      );
    }

    if (maxLimitRaw.lt(cryptoAmtWei)) {
      setFormError(INSUFFICIENT_FUNDS + state.asset?.symbol + ' balance.');
    } else {
      setFormError(undefined);
    }
  }, [formValue.base, formValue.quote, state.prebuiltTx.data?.maxLimitRaw]);

  useEffect(() => {
    if (loading || error) return;

    const run = async () => {
      prebuildTx(amount, data?.assetByMappedAssetIdAndNetworkCode?.address);
    };

    run();
  }, [
    state.provider?.status,
    state.account.status,
    state.account.data,
    loading,
    error,
  ]);

  useEffect(() => {
    dispatch({
      payload: undefined,
      type: 'SET_BRIDGE_QUOTE',
    });
    dispatch({
      type: 'RESET_TX',
    });
  }, [amount]);

  useEffect(() => {
    return () => {
      dispatch({
        type: 'GENERATE_DEPOSIT_ADDRESS_IDLE',
      });
      dispatch({
        type: 'SET_PREBUILT_TX_IDLE',
      });
    };
  }, []);

  const toggleBase = () => {
    if (inputRef.current) {
      inputRef.current.value = quoteRef.current!.innerText;
      inputRef.current.focus();

      setFormValue((formValue) => ({
        base: quoteRef.current!.innerText,
        inputSelected: formValue.inputSelected === 'fiat' ? 'crypto' : 'fiat',
        quote: formValue.base,
      }));
    }
  };

  const setMax = () => {
    if (!inputRef.current) return;
    if (state.requiredAmount) return;
    if (formValue.inputSelected === 'fiat') toggleBase();
    inputRef.current.value = state.prebuiltTx.data!.maxLimitFormatted;
    setFormValue({
      ...formValue,
      base: state.prebuiltTx.data!.maxLimitFormatted,
      inputSelected: 'crypto',
    });
  };

  const setFiatAmountAndSubmit = (amount: string) => {
    if (!inputRef.current) return;
    if (formValue.inputSelected === 'crypto') toggleBase();
    inputRef.current.value = amount;
    setFormValue({
      ...formValue,
      base: amount,
      inputSelected: 'fiat',
    });
    setTimeout(() => {
      submitRef.current?.submit();
    }, 100);
  };

  const handleBinancePayTransaction = () => {
    submitRef.current?.submit();
  };

  const handleBridgeTransaction = async () => {
    if (!state.account.data) {
      throw new Error('Account not found.');
    }

    if (isConfirming) {
      if (!state.bridgeQuote) {
        throw new Error('Quote not found.');
      }
      dispatch({
        payload: ['ApproveToken', 'Confirming', 'DestinationNetwork'],
        type: 'SET_TX_STEPS',
      });
      dispatch({ payload: Steps.Result, type: 'SET_STEP' });
    } else {
      if (!state.asset?.symbol) throw new Error('Asset not found.');
      if (!state.destinationNetwork?.networkCode)
        throw new Error('Network not found.');

      const requestedAddress = await onAddressRequested?.(
        state.asset?.symbol,
        state.destinationNetwork?.networkCode
      );
      if (!requestedAddress?.address) {
        throw new Error('Address not found.');
      }
      const {
        data: fromAsset,
      } = await getAssetMappedAssetIdAndNetworkCodeQueryLazy({
        variables: {
          mappedAssetId: state.asset?.id!,
          networkCode: state.network?.networkCode!,
        },
      });
      const {
        data: destinationAsset,
      } = await getAssetMappedAssetIdAndNetworkCodeQueryLazy({
        variables: {
          mappedAssetId: state.asset?.id!,
          networkCode: state.destinationNetwork?.networkCode!,
        },
      });
      const fromAssetId = fromAsset?.assetByMappedAssetIdAndNetworkCode?.id;
      const toAssetId =
        destinationAsset?.assetByMappedAssetIdAndNetworkCode?.id ||
        state.asset.id;
      if (!fromAssetId || !toAssetId) {
        throw new Error(
          'Cannot create bridge quote without to and destination assets.'
        );
      }
      const quoteParams = {
        fromAddress: state.account.data,
        fromAssetId,
        toAddress: requestedAddress.address,
        toAssetId,
        userId: state.userId,
      };
      let bridgeQuote: CreateBridgeQuoteMutation['prepareBridgeQuote'];
      const {
        data: preQuoteData,
        errors: preQuoteErrors,
      } = await createBridgeQuote({
        variables: {
          amount: ethers.utils
            .parseUnits(amount, state.asset?.decimals!)
            .toString(),
          ...quoteParams,
        },
      });
      bridgeQuote = preQuoteData?.prepareBridgeQuote;
      if (preQuoteErrors?.[0]) {
        throw new Error('Error creating bridge quote.');
      }
      if (state.requiredAmount) {
        const paddedAmountMajor =
          Number(amount) +
          Number(amount) -
          Number(preQuoteData?.prepareBridgeQuote?.estimate?.amountToReceive);
        const paddedAmountMinor = ethers.utils.parseUnits(
          paddedAmountMajor.toFixed(state.asset?.decimals!),
          state.asset?.decimals!
        );
        if (paddedAmountMinor.gt(state.prebuiltTx.data?.maxLimitRaw!)) {
          throw new Error('Amount exceeds max limit.');
        }
        const { data, errors } = await createBridgeQuote({
          variables: {
            amount: paddedAmountMinor.toString(),
            ...quoteParams,
          },
        });
        if (errors?.[0]) {
          throw new Error('Error creating final bridge quote.');
        }
        bridgeQuote = data?.prepareBridgeQuote;
      }
      if (!bridgeQuote) {
        throw new Error('Error creating bridge quote.');
      }
      dispatch({
        payload: bridgeQuote,
        type: 'SET_BRIDGE_QUOTE',
      });
      setIsConfirming(true);
    }
  };

  const handleProviderTransaction = async () => {
    dispatch({ payload: Steps.Result, type: 'SET_STEP' });
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();
      setFormError(undefined);

      switch (state.method?.value) {
        case 'binance-pay':
          return handleBinancePayTransaction();
        case 'isCoinbaseWallet':
        case 'isWalletConnect':
        case 'isMetaMask':
          if (
            state.account.status === 'idle' ||
            state.account.status === 'error'
          ) {
            submitRef.current?.submit();
            return;
          }

          if (state.depositAddress.status !== 'success') {
            throw new Error('Deposit address not found.');
          }

          if (state.prebuiltTx.status !== 'success') {
            throw new Error('Prebuilt transaction not found.');
          }

          if (
            state.asset?.type === 'asset' &&
            !data?.assetByMappedAssetIdAndNetworkCode?.address
          ) {
            throw new Error('Asset contract not found.');
          }

          await handleAuthorizeTransactionProxy(
            state.account.data,
            state.network?.networkCode,
            amount
          );

          dispatch({
            payload: amount + ' ' + state.asset?.symbol,
            type: 'SET_TX_DISPLAY_AMOUNT',
          });
          dispatch({
            payload: amount,
            type: 'SET_TX_AMOUNT',
          });

          if (state.network?.bridged) {
            await handleBridgeTransaction();
          } else {
            await handleProviderTransaction();
          }
      }
    } catch (e: any) {
      if (e.message) {
        setFormError(e.message);
        dispatch({
          payload: {
            status: 'error',
            step: 'Submitted',
            title: 'Action Denied',
          },
          type: 'SET_TX',
        });
      }
      console.error(e);
    }
  };

  if (!state.asset || !state.network || !state.method) {
    dispatch({ type: 'RESET_STATE' });
    return null;
  }

  if (error) {
    return (
      <ErrorWrapper
        description="We had an issue loading the selected asset. Please go back and try again."
        header="Failed to Fetch Asset"
        retry={refetch}
        stacktrace={JSON.stringify(error, null, 2)}
      />
    );
  }

  return loading ? (
    <LoadingWrapper />
  ) : (
    <form
      className="flex h-full flex-col items-center justify-between text-5xl font-semibold dark:text-white"
      data-testid="enter-amount-form"
      onChange={(event) => {
        const target = event.target as HTMLInputElement;
        setFormValue((formValue) => ({
          ...formValue,
          [target.name]: target.value,
        }));
      }}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <div />
      <div className={`w-full ${isConfirming ? 'blur-[2px]' : ''}`}>
        <div className="relative box-border flex max-w-full items-center justify-center px-3">
          {formValue.inputSelected === 'fiat' ? (
            <span className="text-inherit">
              {state.fiatDisplaySymbol}&nbsp;
            </span>
          ) : null}
          <input
            autoFocus
            className="flex h-14 w-full max-w-full bg-transparent text-center text-inherit outline-0 ring-0"
            data-testid="input"
            disabled={!!state.requiredAmount}
            name="base"
            placeholder="0"
            ref={inputRef}
            step={
              formValue.inputSelected === 'fiat'
                ? '0.01'
                : '0.' +
                  '0'.repeat((state.asset.decimals || DECIMAL_FALLBACK) - 1) +
                  '1'
            }
            style={{ minWidth: `${BASE_FONT_SIZE * BASE_FONT_MULTIPLIER}px` }}
            type="number"
          />
          {formValue.inputSelected === 'crypto' ? (
            <span className="text-inherit">&nbsp;{state.asset.symbol}</span>
          ) : null}
        </div>
        <span
          className="invisible absolute top-96 left-96 box-border block whitespace-nowrap px-3"
          ref={dummyFormRef}
          style={{ fontSize: `${BASE_FONT_SIZE * BASE_FONT_MULTIPLIER}px` }}
        >
          <span ref={dummyInputRef} /> <span ref={dummySymbolRef} />
        </span>
        <div className="mt-4 flex items-center justify-center text-primary-400">
          {price ? (
            <>
              <div className="text-xs">
                {formValue.inputSelected === 'crypto' ? (
                  <span>{state.fiatDisplaySymbol}&nbsp;</span>
                ) : null}
                <span data-testid="quote" ref={quoteRef}>
                  {formValue.quote}
                </span>
                {formValue.inputSelected === 'fiat' ? (
                  <span>&nbsp;{state.asset.symbol}</span>
                ) : null}
              </div>
              <div className="ml-4 flex items-center justify-center">
                {state.requiredAmount ? null : (
                  <div
                    className="flex cursor-pointer flex-col text-xxs transition-colors duration-100 hover:text-blue-600 hover:dark:text-blue-600"
                    data-testid="toggle-base"
                    onClick={toggleBase}
                    role="button"
                  >
                    <i className="fa fa-chevron-up" />
                    <i className="fa fa-chevron-down" />
                  </div>
                )}
              </div>
            </>
          ) : (
            <Badge color="yellow">{t('copy.no_pricing_available')}</Badge>
          )}
        </div>
      </div>
      <InnerWrapper className="relative w-full">
        <span className="absolute -top-1 left-1/2 flex w-full -translate-x-1/2 -translate-y-full justify-center px-4">
          {formError?.includes(INSUFFICIENT_FUNDS) ? (
            <motion.span
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={setMax}
              role="button"
            >
              <Badge color="red" dot>
                {formError}
              </Badge>
            </motion.span>
          ) : formError ? (
            formError.includes(DOWNLOAD_EXTENSION) ? (
              extensionLink ? (
                <Badge color="yellow" dot>
                  {/* @ts-ignore */}
                  <span>
                    Please{' '}
                    <a
                      className="text-blue-600 underline"
                      href={extensionLink}
                      target="_blank"
                    >
                      download
                    </a>{' '}
                    the {state.method.name} extension. After installing please
                    refresh.
                  </span>
                </Badge>
              ) : (
                // @ts-ignore
                <Badge color="yellow" dot>
                  Please download the {state.method.name} extension.
                </Badge>
              )
            ) : (
              <Badge color="red" dot>
                {formError}
              </Badge>
            )
          ) : state.prebuiltTx.status === 'loading' ? (
            <span className="sbui-badge--blue flex h-5 w-5 animate-spin items-center justify-center rounded-full">
              {<i className="fa fa-gear text-xs" />}
            </span>
          ) : state.prebuiltTx.data?.feeError ? (
            <Badge color="red" dot>
              {`You need at least ${ethers.utils.formatEther(
                state.prebuiltTx.data.gasPrice.mul(
                  state.prebuiltTx.data.gasLimit
                )
              )} ${state.network?.symbol} to complete this transaction.`}
            </Badge>
          ) : state.prebuiltTx.status === 'error' ? (
            <Badge color="red">
              {/* @ts-ignore */}
              <span className="flex items-center whitespace-nowrap">
                {state.prebuiltTx.error ||
                  'Unknown error building transaction.'}
                <span
                  className="ml-1 cursor-pointer text-xxs"
                  onClick={(e) => {
                    e.stopPropagation();
                    prebuildTx(
                      '0',
                      data?.assetByMappedAssetIdAndNetworkCode?.address
                    );
                  }}
                >
                  <i className="fa fa-refresh" />
                </span>
              </span>
            </Badge>
          ) : state.prebuiltTx.status === 'success' ? (
            <motion.span
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={setMax}
              role="button"
            >
              <Badge color="blue" size="large">
                {/* @ts-ignore */}
                <span className="flex items-center whitespace-nowrap">
                  Max: {state.prebuiltTx.data?.maxLimitFormatted}{' '}
                  {state.asset.symbol}
                  <span
                    className="ml-1 text-xxs"
                    onClick={(e) => {
                      e.stopPropagation();
                      prebuildTx(
                        '0',
                        data?.assetByMappedAssetIdAndNetworkCode?.address
                      );
                    }}
                  >
                    <i className="fa fa-refresh" />
                  </span>
                </span>
              </Badge>
            </motion.span>
          ) : state.method.value === 'binance-pay' && price ? (
            <AnimatePresence>
              <motion.div
                animate="show"
                className="mb-1 flex w-full justify-around"
                initial="hidden"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
              >
                {(state.shortcutAmounts || []).map((amount) => (
                  <motion.span
                    className="relative"
                    key={amount}
                    onClick={() => setFiatAmountAndSubmit(amount.toString())}
                    role="button"
                    variants={{
                      hidden: { opacity: 0, top: '10px' },
                      show: { opacity: 1, top: '0px' },
                    }}
                  >
                    <Badge color="green" size="large">
                      {/* @ts-ignore */}
                      <span className="whitespace-nowrap">
                        {state.fiatDisplaySymbol}
                        {amount.toFixed(2)}
                      </span>
                    </Badge>
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : null}
        </span>
        {state.method.value === 'binance-pay' ? (
          <BinancePay
            amount={amount}
            isConfirming={isConfirming}
            ref={submitRef}
            setFormError={setFormError}
            setIsConfirming={setIsConfirming}
          />
        ) : state.method.value === 'isWalletConnect' ? (
          <WalletConnect
            amount={amount}
            disabled={
              state.depositAddress.status === 'loading' ||
              state.prebuiltTx.status !== 'success' ||
              state.prebuiltTx.data?.feeError ||
              bridgeQuoteLoading ||
              !!formError?.includes(INSUFFICIENT_FUNDS)
            }
            isConfirming={isConfirming}
            loading={bridgeQuoteLoading}
            setFormError={setFormError}
            setIsConfirming={setIsConfirming}
          />
        ) : (
          <WindowEthereum
            amount={amount}
            disabled={
              state.depositAddress.status === 'loading' ||
              state.prebuiltTx.status !== 'success' ||
              state.prebuiltTx.data?.feeError ||
              bridgeQuoteLoading ||
              !!formError?.includes(INSUFFICIENT_FUNDS)
            }
            isConfirming={isConfirming}
            loading={bridgeQuoteLoading}
            ref={submitRef}
            setFormError={setFormError}
            setIsConfirming={setIsConfirming}
          />
        )}
      </InnerWrapper>
    </form>
  );
};

type Props = {};

const EnterAmount: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { data, loading } = useGetAssetPriceQuery({
    skip: !!state.rate,
    variables: {
      assetId: state.asset?.id,
      currency: state.fiat,
    },
  });
  const { t } = useTranslation();

  if (!state.asset || !state.network || !state.method || !state.asset.config) {
    dispatch({ type: 'RESET_STATE' });
    return null;
  }

  const price = state.rate || data?.assetPrice?.price || 0;

  return (
    <div className="flex h-full flex-col">
      <InnerWrapper>
        <StepTitle testId="enter-amount" value={t('title.enter_amount')} />
      </InnerWrapper>
      <StateDescriptionHeader />
      {loading ? <LoadingWrapper /> : <EnterAmountForm price={price} />}
    </div>
  );
};

export default EnterAmount;
