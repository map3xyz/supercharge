import { ReadOnlyText } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../../providers/Store';

const TransactionDetails: React.FC<Props> = () => {
  const [state] = useContext(Context);

  return (
    <>
      <div className="mt-3 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
        Amount
      </div>
      <div className="text-sm font-medium dark:text-white sm:text-xs">
        <ReadOnlyText value={state.tx.displayAmount} />
      </div>
      {state.tx.response?.from ? (
        <>
          <div className="mt-2 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            From
          </div>
          <ReadOnlyText copyButton value={state.tx.response?.from} />
        </>
      ) : null}
      {state.tx.response?.to ? (
        <>
          <div className="mt-2 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            To
          </div>
          <ReadOnlyText copyButton value={state.tx.response?.to} />
        </>
      ) : null}
      {state.tx.hash ? (
        <>
          <div className="mt-2 mb-0.5 text-sm font-semibold dark:text-white sm:text-xs">
            Hash
          </div>
          <ReadOnlyText copyButton value={state.tx.hash} />
        </>
      ) : null}
    </>
  );
};

type Props = {};

export default TransactionDetails;
