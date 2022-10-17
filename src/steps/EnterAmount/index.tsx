import React from 'react';

const EnterAmount: React.FC<Props> = () => {
  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Enter Amount</h3>
      <h5 className="text-xs text-neutral-600">
        How much would you like to deposit?
      </h5>
    </>
  );
};

type Props = {};

export default EnterAmount;
