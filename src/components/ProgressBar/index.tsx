import React, { useContext, useEffect } from 'react';

import { Context } from '../../providers/Store';

const ProgressBar: React.FC<Props> = ({ progress }) => {
  const [state] = useContext(Context);

  useEffect(() => {
    if (state.colors?.progressBar) {
      const progressBar = document.getElementById('progress-bar');
      if (progressBar) {
        progressBar.style.backgroundColor = state.colors.progressBar;
      }
    }
  }, [state.colors?.progressBar]);

  return (
    <div className="relative h-1 w-full rounded-lg bg-neutral-100 dark:bg-neutral-800">
      <div
        className="rainbow-background absolute left-0 h-full rounded-lg bg-orange-600 transition-all duration-150"
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
