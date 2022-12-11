import React, { PropsWithChildren } from 'react';

import InnerWrapper from '../InnerWrapper';

const ErrorWrapper: React.FC<PropsWithChildren<Props>> = ({
  description,
  header,
  retry,
  stacktrace,
}) => {
  return (
    <InnerWrapper>
      <div className="flex items-center gap-2 text-lg font-bold leading-5">
        <i className="fa fa-circle-xmark text-red-600"></i>{' '}
        <h3 className=" dark:text-white">{header}</h3>
      </div>
      <div className="mt-1 text-xs text-neutral-500">
        {description} Please{' '}
        <a className="cursor-pointer text-blue-600 underline" onClick={retry}>
          click here
        </a>{' '}
        to retry. If the error persists, please contact support.
      </div>
      {stacktrace ? (
        <details className="mt-2 text-xs text-white">
          <summary>View the raw error:</summary> <pre>{stacktrace}</pre>
        </details>
      ) : null}
    </InnerWrapper>
  );
};

type Props = {
  description: string;
  header: string;
  retry: () => void;
  stacktrace?: string;
};

export default ErrorWrapper;
