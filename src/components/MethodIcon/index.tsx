import React from 'react';

import { PaymentMethod } from '../../generated/apollo-gql';

const MethodIcon: React.FC<Props> = ({ method }) => {
  return (
    <>
      {method.icon ? (
        <i className={method.icon + ' h-4 w-4'} />
      ) : method.logo ? (
        <img className="h-4 w-4" src={method.logo} />
      ) : null}
    </>
  );
};

type Props = {
  method: PaymentMethod;
};

export default MethodIcon;
