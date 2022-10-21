import React from 'react';

const LoadingWrapper: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex h-64 items-center justify-center text-sm">
      <div className="flex flex-col items-center gap-2 font-semibold text-neutral-500 dark:text-neutral-700">
        <div className="animate-spin ">
          <i className="fa fa-gear"></i>
        </div>
        <span>{message || 'Loading...'}</span>
      </div>
    </div>
  );
};

type Props = {
  message?: string;
};

export default LoadingWrapper;
