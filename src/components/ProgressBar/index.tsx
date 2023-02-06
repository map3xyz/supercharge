import React from 'react';

const ProgressBar: React.FC<Props> = ({ progress }) => {
  return (
    <div className="relative h-1 w-full rounded-lg bg-primary-100 dark:bg-primary-800">
      <div
        className="rainbow-background absolute left-0 h-full rounded-lg bg-accent transition-all duration-150"
        data-testid="progress-bar"
        id="progress-bar"
        style={{ width: progress * 100 + '%' }}
      ></div>
    </div>
  );
};

type Props = {
  progress: number;
};

export default ProgressBar;
