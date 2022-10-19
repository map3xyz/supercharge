import React, { PropsWithChildren } from 'react';

const InnerWrapper: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  return <div className="w-full px-4 py-3">{children}</div>;
};

type Props = {};

export default InnerWrapper;
