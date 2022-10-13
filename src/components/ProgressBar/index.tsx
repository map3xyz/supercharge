import React from 'react';

const ProgressBar: React.FC<Props> = () => {
  return <div className="w-full border-t-2 border-neutral-700"></div>;
};

type Props = {
  progress: number;
};

export default ProgressBar;
