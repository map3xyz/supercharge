import { Badge } from '@map3xyz/components';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { Context } from '../../providers/Store';

const BASE_FONT_SIZE = 48;

const EnterAmount: React.FC<Props> = () => {
  const dummyRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [state] = useContext(Context);
  const [formValue, setFormValue] = useState<{
    base: string;
    quote: string;
  }>({ base: '0', quote: '0' });

  useEffect(() => {
    dummyRef.current!.innerText = formValue.base;
    let nextInputWidth = dummyRef.current!.getBoundingClientRect().width;
    const formWidth = formRef.current!.getBoundingClientRect().width;

    if (inputRef.current && formRef.current) {
      inputRef.current.style.width = `${nextInputWidth}px`;
      if (nextInputWidth > formWidth) {
        const percentFontChange = formWidth / nextInputWidth;
        const fontSize = Math.floor(BASE_FONT_SIZE * percentFontChange) - 1;

        nextInputWidth = formWidth;

        formRef.current.style.fontSize = `${fontSize}px`;
        inputRef.current.style.width = `${nextInputWidth}px`;
      } else {
        formRef.current.style.fontSize = `${BASE_FONT_SIZE}px`;
      }
    }
  }, [formValue]);

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
          <span className="text-inherit">$</span>
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
            ref={dummyRef}
          />
        </div>
      </form>
    </>
  );
};

type Props = {};

export default EnterAmount;
