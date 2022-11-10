import { Badge, CryptoAddress } from '@map3xyz/components';
import { ethers } from 'ethers';
import React, { useContext, useEffect, useRef, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import MethodIcon from '../../components/MethodIcon';
import Web3 from '../../components/methods/Web3';
import { Context, Steps } from '../../providers/Store';

const BASE_FONT_SIZE = 48;

const rates = {
  'BTC/USD': 20_000,
};

const EnterAmount: React.FC<Props> = () => {
  const dummyInputRef = useRef<HTMLSpanElement>(null);
  const dummySymbolRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const quoteRef = useRef<HTMLSpanElement>(null);

  const [state, dispatch, { generateDepositAddress }] = useContext(Context);
  const [formValue, setFormValue] = useState<{
    base: string;
    inputSelected: 'crypto' | 'fiat';
    quote: string;
  }>({ base: '0', inputSelected: 'fiat', quote: '0' });
  const [amount, setAmount] = useState<number>(0);
  const [formError, setFormError] = useState<string | undefined>('');

  useEffect(() => {
    if (!dummyInputRef.current || !dummySymbolRef.current) return;

    dummyInputRef.current.innerText = formValue.base;
    let nextInputWidth = dummyInputRef.current!.getBoundingClientRect().width;
    const symbolWidth = dummySymbolRef.current!.getBoundingClientRect().width;
    const formWidth = formRef.current!.getBoundingClientRect().width;

    if (inputRef.current && formRef.current) {
      if (nextInputWidth + symbolWidth > formWidth) {
        const percentFontChange = formWidth / (nextInputWidth + symbolWidth);
        const fontSize = Math.floor(BASE_FONT_SIZE * percentFontChange) - 1;

        nextInputWidth = formWidth;

        formRef.current.style.fontSize = `${fontSize}px`;
        inputRef.current.style.width = `${nextInputWidth}px`;
      } else {
        inputRef.current.style.width = `${nextInputWidth}px`;
        formRef.current.style.fontSize = `${BASE_FONT_SIZE}px`;
      }
    }
  }, [formValue, state.depositAddress.data]);

  useEffect(() => {
    const rate = rates['BTC/USD'];
    const base = parseFloat(formValue.base || '0');
    const quote =
      formValue.inputSelected === 'crypto' ? base * rate : base / rate;
    setFormValue((formValue) => ({
      ...formValue,
      quote:
        formValue.inputSelected === 'crypto'
          ? quote.toFixed(2)
          : quote.toFixed(8),
    }));
    setAmount(formValue.inputSelected === 'crypto' ? base : quote);
  }, [formValue.base]);

  useEffect(() => {
    if (state.account.status === 'success') {
      setFormError(undefined);
    }
  }, [state.account.status]);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setFormError(undefined);

      if (state.account.status === 'idle' || state.account.status === 'error') {
        window.postMessage({ type: 'web3_connect' }, '*');
        return;
      }

      let currentChainId;
      let provider = window.ethereum;
      try {
        currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
      } catch (e) {
        provider = window.ethereum.providers.find(
          (provider: any) => provider[state.method?.value!] === true
        ).request;
        currentChainId = await provider({ method: 'eth_chainId' });
      }

      if (
        state.network?.identifiers?.chainId &&
        Number(currentChainId) !== state.network?.identifiers?.chainId
      ) {
        try {
          await provider({
            method: 'wallet_switchEthereumChain',
            params: [
              {
                chainId: ethers.utils.hexlify(
                  state.network?.identifiers?.chainId
                ),
              },
            ],
          });
        } catch (e: any) {
          console.log(e);
          setFormError(
            `Please switch to ${state.network?.name} network in ${state.method?.name}`
          );
          return;
        }
      }

      let address = '';
      try {
        dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' });
        address = await generateDepositAddress(
          state.asset?.symbol as string,
          state.network?.symbol as string
        );
        dispatch({
          payload: address,
          type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS',
        });
      } catch (e) {
        dispatch({ type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' });
        throw new Error('Error generating a deposit address.');
      }

      const transactionParameters = {
        from: state.account.data,
        to: address,
        value: ethers.utils.parseEther(amount.toString()).toHexString(),
      };

      try {
        const currentProvider = window.ethereum.providers.find(
          (x: any) => x[state.method!.value || 'isMetaMask']
        );
        await currentProvider.send('eth_sendTransaction', [
          transactionParameters,
        ]);
      } catch (e: any) {
        setFormError(e.message);
      }
    } catch (e: any) {
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
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-8 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        Deposit{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({
              payload: Steps.AssetSelection,
              type: 'SET_STEP',
            });
          }}
          role="button"
        >
          <Badge color="blue" size="large">
            {state.asset.symbol || ''}
          </Badge>
        </span>{' '}
        on{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({ payload: Steps.NetworkSelection, type: 'SET_STEP' });
          }}
          role="button"
        >
          <Badge color="blue" size="large">
            {state.network.symbol || ''}
          </Badge>
        </span>{' '}
        via{' '}
        <span
          onClick={() => {
            if (state.account.status === 'success') {
              dispatch({
                payload: Steps.PaymentMethod,
                type: 'SET_STEP',
              });
            } else {
              window.postMessage({ type: 'web3_connect' }, '*');
            }
          }}
          role="button"
        >
          {/* @ts-ignore */}
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
        </span>
      </div>
      <InnerWrapper className="h-full">
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
                className="flex h-14 max-w-full bg-transparent text-center text-inherit outline-0 ring-0"
                data-testid="input"
                name="base"
                placeholder="0"
                ref={inputRef}
                step={
                  formValue.inputSelected === 'fiat' ? '0.01' : '0.00000001'
                }
                style={{ minWidth: `${BASE_FONT_SIZE}px` }}
                type="number"
              />
              <span
                className="invisible absolute -left-96 -top-96 pl-6 !text-5xl"
                ref={dummyInputRef}
              />
              <span
                className="invisible absolute -left-96 -top-96 pl-6 !text-5xl"
                ref={dummySymbolRef}
              >
                {formValue.inputSelected === 'crypto'
                  ? state.network.symbol
                  : '$'}
              </span>
              {formValue.inputSelected === 'crypto' ? (
                <span className="text-inherit">{state.network.symbol}</span>
              ) : null}
            </div>
            <div className="mt-8 flex items-center justify-center text-neutral-400">
              <div className="text-xs">
                {formValue.inputSelected === 'crypto' ? (
                  <span>$&nbsp;</span>
                ) : null}
                <span data-testid="quote" ref={quoteRef}>
                  {formValue.quote}
                </span>
                {formValue.inputSelected === 'fiat' ? (
                  <span>&nbsp;{state.network.symbol}</span>
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
            </div>
          </div>
          <div className="relative w-full">
            {formError ? (
              <span className="absolute -top-2 flex w-full -translate-y-full">
                <Badge color="red" dot>
                  {formError}
                </Badge>
              </span>
            ) : null}
            <Web3
              amount={amount}
              disabled={state.depositAddress.status === 'loading'}
              setFormError={setFormError}
            />
          </div>
        </form>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default EnterAmount;
