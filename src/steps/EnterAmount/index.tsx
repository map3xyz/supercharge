import { Badge } from '@map3xyz/components';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Context } from '../../providers/Store';

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

  const [state] = useContext(Context);
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
      if (nextInputWidth > formWidth) {
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
    const base = parseFloat(formValue.base);
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

  if (!state.coin || !state.network) {
    return null;
  }

  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Enter Amount</h3>
      <h5 className="text-xs text-neutral-400">
        How much <Badge color="blue">{state.coin}</Badge> would you like to
        deposit on the{' '}
        <Badge color="indigo">{`${state.network} Network`}</Badge>?
      </h5>
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
            {formValue.inputSelected === 'crypto' ? <span>$&nbsp;</span> : null}
            <span ref={quoteRef}>{formValue.quote}</span>
            {formValue.inputSelected === 'fiat' ? <span>&nbsp;BTC</span> : null}
          </div>
          <div className="ml-4 flex items-center justify-center">
            <div
              className="flex cursor-pointer flex-col text-xxs transition-colors duration-100 hover:text-blue-600 dark:text-white hover:dark:text-blue-600"
              onClick={toggleBase}
              role="button"
            >
              <i className="fa fa-chevron-up" />
              <i className="fa fa-chevron-down" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

type Props = {};

export default EnterAmount;
