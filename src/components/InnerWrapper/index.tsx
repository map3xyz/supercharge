import React, { PropsWithChildren } from 'react';

const InnerWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return <div className={`w-full px-4 py-3 ${className}`}>{children}</div>;
};

type Props = {
  className?: string;
};

export default InnerWrapper;
