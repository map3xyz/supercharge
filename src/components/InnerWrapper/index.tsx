import React, { AriaRole, PropsWithChildren } from 'react';

const InnerWrapper: React.FC<PropsWithChildren<Props>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div {...rest} className={`w-full px-4 py-3 ${className || ''}`}>
      {children}
    </div>
  );
};

type Props = {
  className?: string;
  role?: AriaRole;
};

export default InnerWrapper;
