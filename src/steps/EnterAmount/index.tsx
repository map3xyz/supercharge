import { Badge } from '@map3xyz/components';
import React, { useContext, useEffect, useRef, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import MethodIcon from '../../components/MethodIcon';
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

  const [state, dispatch] = useContext(Context);
  const [formValue, setFormValue] = useState<{
    base: string;
    inputSelected: 'crypto' | 'fiat';
    quote: string;
  }>({ base: '0', inputSelected: 'fiat', quote: '0' });

  useEffect(() => {
    dummyInputRef.current!.innerText = formValue.base;
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
  }, [formValue]);

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
  }, [formValue.base]);

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

  if (!state.asset || !state.network || !state.method) {
    dispatch({ payload: Steps.AssetSelection, type: 'SET_STEP' });
    return null;
  }

  return (
    <>
      <InnerWrapper>
        <h3
          className="text-lg font-semibold dark:text-white"
          data-testid="enter-amount"
        >
          Enter Amount
        </h3>
      </InnerWrapper>
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 font-bold leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
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
            {state.asset.name || ''}
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
            {state.network.name || ''}
          </Badge>
        </span>{' '}
        via{' '}
        <span
          className="text-blue-600 underline"
          onClick={() => {
            dispatch({
              payload: Steps.PaymentMethod,
              type: 'SET_STEP',
            });
          }}
          role="button"
        >
          {/* @ts-ignore */}
          <Badge color="blue" size="large">
            {/* @ts-ignore */}
            <span className="flex items-center gap-1">
              <MethodIcon method={state.method} /> {state.method.name}
            </span>
          </Badge>
        </span>
      </div>
      <InnerWrapper>
        <form
          className="flex flex-col items-center justify-center py-8 text-5xl font-semibold dark:text-white"
          onChange={(event) => {
            const target = event.target as HTMLInputElement;
            setFormValue((formValue) => ({
              ...formValue,
              [target.name]: target.value,
            }));
          }}
          ref={formRef}
        >
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
              {formValue.inputSelected === 'crypto' ? 'BTC' : '$'}
            </span>
            {formValue.inputSelected === 'crypto' ? (
              <span className="text-inherit">BTC</span>
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
                <span>&nbsp;BTC</span>
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
        </form>
      </InnerWrapper>
    </>
  );
};

type Props = {};

export default EnterAmount;
