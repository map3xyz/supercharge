import { Badge, CryptoAddress } from '@map3xyz/components';
import { ethers } from 'ethers';
import { motion } from 'framer-motion';
import React, { useContext, useEffect, useRef, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import MethodIcon from '../../components/MethodIcon';
import WalletConnect from '../../components/methods/WalletConnect';
import WindowEthereum, {
  ConnectHandler,
} from '../../components/methods/WindowEthereum';
import { useGetAssetByMappedAssetIdAndNetworkCodeQuery } from '../../generated/apollo-gql';
import { usePrebuildTx } from '../../hooks/usePrebuildTx';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps } from '../../providers/Store';

const BASE_FONT_SIZE = 48;
const DECIMAL_FALLBACK = 8;
const CHAIN_MISSING = 'Unrecognized chain ID';
const INSUFFICIENT_FUNDS = 'Amount exceeds maximum limit.';

const EnterAmount: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const rate = state.asset?.price?.price;

  const [formError, setFormError] = useState<string | undefined>('');
  const [formValue, setFormValue] = useState<{
    base: string;
    inputSelected: 'crypto' | 'fiat';
    quote: string;
  }>({ base: '0', inputSelected: rate ? 'fiat' : 'crypto', quote: '0' });
  const [amount, setAmount] = useState<string>('0');
  const dummyInputRef = useRef<HTMLSpanElement>(null);
  const dummySymbolRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const quoteRef = useRef<HTMLSpanElement>(null);
  const connectRef = useRef<ConnectHandler>(null);

  const { data, error, loading } =
    useGetAssetByMappedAssetIdAndNetworkCodeQuery({
      skip: state.asset?.type !== 'asset',
      variables: {
        mappedAssetId: state.asset?.config?.mappedAssetId,
        networkCode: state.network?.networkCode,
      },
    });

  const {
    addChain,
    authorizeTransactionProxy,
    getChainID,
    sendTransaction,
    switchChain,
  } = useWeb3();
  const { prebuildTx } = usePrebuildTx();

  useEffect(() => {
    if (!dummyInputRef.current || !dummySymbolRef.current) return;

    dummyInputRef.current.innerText = formValue.base;
    let nextInputWidth = dummyInputRef.current!.getBoundingClientRect().width;
    const symbolWidth = dummySymbolRef.current!.getBoundingClientRect().width;
    const formWidth = formRef.current!.getBoundingClientRect().width;

    if (inputRef.current && formRef.current) {
      if (nextInputWidth + symbolWidth > formWidth) {
        /* istanbul ignore next */
        const percentFontChange = formWidth / (nextInputWidth + symbolWidth);
        /* istanbul ignore next */
        const fontSize = Math.floor(BASE_FONT_SIZE * percentFontChange) - 0.5;

        /* istanbul ignore next */
        nextInputWidth = formWidth;

        /* istanbul ignore next */
        formRef.current.style.fontSize = `${fontSize}px`;
        /* istanbul ignore next */
        inputRef.current.style.maxWidth = `${nextInputWidth}px`;
      } else {
        inputRef.current.style.maxWidth = `${nextInputWidth}px`;
        formRef.current.style.fontSize = `${BASE_FONT_SIZE}px`;
      }
    }
  }, [
    formValue,
    state.depositAddress.data,
    data?.assetByMappedAssetIdAndNetworkCode?.address,
  ]);

  useEffect(() => {
    const base = parseFloat(formValue.base || '0');
    const quote =
      formValue.inputSelected === 'crypto'
        ? base * (rate || 0)
        : base / (rate || 0);
    setFormValue((formValue) => ({
      ...formValue,
      quote:
        formValue.inputSelected === 'crypto'
          ? quote.toFixed(2)
          : quote.toFixed(state.asset?.decimals || DECIMAL_FALLBACK),
    }));

    if (base === 0) return setAmount('0');

    setAmount(
      formValue.inputSelected === 'crypto'
        ? base.toFixed(state.asset?.decimals || DECIMAL_FALLBACK)
        : quote.toFixed(state.asset?.decimals || DECIMAL_FALLBACK)
    );
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
    const cryptoAmtWei = ethers.utils.parseUnits(
      cryptoAmt,
      state.asset?.decimals || DECIMAL_FALLBACK
    );

    if (maxLimitRaw.lt(cryptoAmtWei)) {
      setFormError(INSUFFICIENT_FUNDS);
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
  }, [state.provider?.status, state.account.status, loading, error, amount]);

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

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    try {
      e?.preventDefault();
      setFormError(undefined);

      if (state.account.status === 'idle' || state.account.status === 'error') {
        connectRef.current?.connect();
        return;
      }

      if (state.depositAddress.status !== 'success') {
        throw new Error('Deposit address not found.');
      }

      console.log(state.prebuiltTx);

      if (state.prebuiltTx.status !== 'success') {
        throw new Error('Prebuilt transaction not found.');
      }

      await authorizeTransactionProxy(
        state.account.data,
        state.network?.networkCode,
        amount
      );

      const currentChainId = await getChainID();

      if (
        state.network?.identifiers?.chainId &&
        Number(currentChainId) !== state.network?.identifiers?.chainId
      ) {
        await switchChain(state.network?.identifiers?.chainId);
      }

      await sendTransaction();
      dispatch({ payload: Steps.Result, type: 'SET_STEP' });
    } catch (e: any) {
      if (e.message?.includes(CHAIN_MISSING)) {
        try {
          await addChain();
          handleSubmit();
          return;
        } catch (addChainError) {
          e = addChainError as Error;
        }
      }

      if (e.message) {
        setFormError(e.message);
      }
      console.error(e);
    }
  };

  if (!state.asset || !state.network || !state.method) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <InnerWrapper className="!pt-0">
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="enter-amount"
        >
          Enter Amount
        </h3>
      </InnerWrapper>
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        Send{' '}
        <Badge color="blue" size="large">
          {state.asset.symbol || ''}
        </Badge>{' '}
        on the {/* @ts-ignore */}
        <Badge color="blue" size="large">
          {state.network.name || ''} Network
        </Badge>{' '}
        via {/* @ts-ignore */}
        <Badge
          color={
            state.account.status === 'loading' ||
            state.account.status === 'idle'
              ? 'yellow'
              : state.account.status === 'error'
              ? 'red'
              : 'green'
          }
          dot
          size="large"
        >
          {/* @ts-ignore */}
          <span className="flex items-center gap-1">
            <MethodIcon method={state.method} /> {state.method.name}{' '}
            {state.account.status === 'success' && state.account.data ? (
              <CryptoAddress hint={false}>{state.account.data}</CryptoAddress>
            ) : (
              ''
            )}
          </span>
        </Badge>
      </div>
      <InnerWrapper className="h-full">
        {loading || !!error ? (
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
            <div className="w-full">
              <div className="relative box-border flex max-w-full items-center justify-center">
                {formValue.inputSelected === 'fiat' ? (
                  <span className="text-inherit">$</span>
                ) : null}
                <input
                  autoFocus
                  className="flex h-14 w-full max-w-full bg-transparent text-center text-inherit outline-0 ring-0"
                  data-testid="input"
                  name="base"
                  placeholder="0"
                  ref={inputRef}
                  step={
                    formValue.inputSelected === 'fiat'
                      ? '0.01'
                      : '0.' +
                        '0'.repeat(
                          (state.asset.decimals || DECIMAL_FALLBACK) - 1
                        ) +
                        '1'
                  }
                  style={{ minWidth: `${BASE_FONT_SIZE}px` }}
                  type="number"
                />
                <span
                  className="invisible absolute -left-96 -top-96 pr-3 !text-5xl"
                  ref={dummyInputRef}
                />
                <span
                  className="invisible absolute -left-96 -top-96 !text-5xl"
                  ref={dummySymbolRef}
                >
                  {formValue.inputSelected === 'crypto'
                    ? state.asset.symbol
                    : '$'}
                </span>
                {formValue.inputSelected === 'crypto' ? (
                  <span className="text-inherit">{state.asset.symbol}</span>
                ) : null}
              </div>
              <div className="mt-8 flex items-center justify-center text-neutral-400">
                {rate ? (
                  <>
                    <div className="text-xs">
                      {formValue.inputSelected === 'crypto' ? (
                        <span>$&nbsp;</span>
                      ) : null}
                      <span data-testid="quote" ref={quoteRef}>
                        {formValue.quote}
                      </span>
                      {formValue.inputSelected === 'fiat' ? (
                        <span>&nbsp;{state.asset.symbol}</span>
                      ) : null}
                    </div>
                    <div className="ml-4 flex items-center justify-center">
                      <div
                        className="flex cursor-pointer flex-col text-xxs transition-colors duration-100 hover:text-blue-600 hover:dark:text-blue-600"
                        data-testid="toggle-base"
                        onClick={toggleBase}
                        role="button"
                      >
                        <i className="fa fa-chevron-up" />
                        <i className="fa fa-chevron-down" />
                      </div>
                    </div>
                  </>
                ) : (
                  <Badge color="yellow">
                    No pricing available for this asset.
                  </Badge>
                )}
              </div>
            </div>
            <div className="relative w-full">
              <span className="absolute -top-2 left-1/2 flex w-full -translate-x-1/2 -translate-y-full justify-center">
                {formError ? (
                  <Badge color="red" dot>
                    {formError}
                  </Badge>
                ) : state.prebuiltTx.status === 'error' ? (
                  <Badge color="yellow" dot>
                    {/* @ts-ignore */}
                    <span>
                      Unknown balance.{' '}
                      <span
                        className="cursor-pointer text-blue-600 underline"
                        onClick={() => {
                          switchChain(state.network?.identifiers?.chainId!);
                        }}
                      >
                        Click here
                      </span>{' '}
                      to change the network on {state.method?.name} to{' '}
                      {state.network?.name}.
                    </span>
                  </Badge>
                ) : state.prebuiltTx.error ? (
                  <Badge color="red" dot>
                    {`You don't have enough ${state.network.symbol} to complete this transaction.`}
                  </Badge>
                ) : state.prebuiltTx.status === 'success' ? (
                  <motion.span
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    onClick={() => {
                      if (!inputRef.current) return;
                      if (formValue.inputSelected === 'fiat') toggleBase();
                      inputRef.current.value =
                        state.prebuiltTx.data!.maxLimitFormatted;
                      setFormValue({
                        ...formValue,
                        base: state.prebuiltTx.data!.maxLimitFormatted,
                        inputSelected: 'crypto',
                      });
                    }}
                    role="button"
                  >
                    <Badge color="blue">
                      {/* @ts-ignore */}
                      <span className="whitespace-nowrap">
                        Max: {state.prebuiltTx.data?.maxLimitFormatted}{' '}
                        {state.asset.name}
                      </span>
                    </Badge>
                  </motion.span>
                ) : null}
              </span>
              {state.method.value !== 'isWalletConnect' ? (
                <WindowEthereum
                  amount={amount}
                  disabled={
                    state.depositAddress.status === 'loading' ||
                    state.transaction?.status === 'loading' ||
                    state.prebuiltTx.data?.feeError ||
                    formError === INSUFFICIENT_FUNDS
                  }
                  ref={connectRef}
                  setFormError={setFormError}
                />
              ) : (
                <WalletConnect
                  amount={amount}
                  disabled={
                    state.depositAddress.status === 'loading' ||
                    state.prebuiltTx.data?.feeError ||
                    formError === INSUFFICIENT_FUNDS
                  }
                />
              )}
            </div>
          </form>
        )}
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default EnterAmount;
