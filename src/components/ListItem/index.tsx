import React, { PropsWithChildren } from 'react';

import InnerWrapper from '../InnerWrapper';

const ListItem: React.FC<
  PropsWithChildren<Props> & React.HTMLAttributes<HTMLDivElement>
> = ({ children, ...rest }) => {
  return (
    <InnerWrapper
      {...rest}
      className="flex items-center justify-between border-b border-primary-200 sm:text-sm hover:bg-primary-100 dark:border-primary-700 hover:dark:bg-primary-800"
      role="button"
    >
      {children}
    </InnerWrapper>
  );
};

type Props = {};

export default ListItem;
