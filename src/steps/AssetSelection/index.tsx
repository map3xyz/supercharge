import React from 'react';

const AssetSelection: React.FC<Props> = () => {
  return (
    <>
      <h3 className="text-lg font-semibold dark:text-white">Deposit Crypto</h3>
      <h5 className="text-sm text-neutral-600">
        Select the asset you want to deposit
      </h5>
    </>
  );
};

type Props = {};

export default AssetSelection;
