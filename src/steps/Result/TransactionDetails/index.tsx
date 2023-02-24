import { ReadOnlyText } from '@map3xyz/components';
import React, { useContext } from 'react';

import { Context } from '../../../providers/Store';

const TransactionDetails: React.FC<Props> = () => {
  const [state] = useContext(Context);

  return (
    <>
      <div className="mt-3 mb-0.5 text-xs font-semibold dark:text-white">
        Amount
      </div>
      <div className="text-xs font-medium dark:text-white">
        <ReadOnlyText value={state.tx.amount} />
      </div>
      {state.tx.response ? (
        <>
          <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
            From
          </div>
          <ReadOnlyText copyButton value={state.tx.response?.from} />
          <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
            To
          </div>
          <ReadOnlyText copyButton value={state.tx.response?.to} />
        </>
      ) : null}
      {state.tx.hash ? (
        <>
          <div className="mt-2 mb-0.5 text-xs font-semibold dark:text-white">
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
