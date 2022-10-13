import React from 'react';

const PaymentMethod: React.FC<Props> = () => {
  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Payment Method</h3>
      <h5 className="text-xs text-neutral-600">
        Select the payment method you want to use.
      </h5>
    </>
  );
};

type Props = {};

export default PaymentMethod;
