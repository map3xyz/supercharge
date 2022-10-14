import React from 'react';

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="relative h-1 w-full bg-neutral-100 dark:bg-neutral-700">
      <div
        className="absolute left-0 h-full bg-blue-600 transition-all duration-150"
        style={{ width: progress * 100 + '%' }}
      ></div>
    </div>
  );
};

type Props = {
  progress: number;
};

export default ProgressBar;
