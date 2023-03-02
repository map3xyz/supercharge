import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../providers/Store';

const CountdownTimer: React.FC<Props> = () => {
  const [state] = useContext(Context);
  const remainingTime = 10;
  const [seconds, setSeconds] = useState(remainingTime);

  const countdown = () => {
    setSeconds((prev) => prev - 1);
  };

  useEffect(() => {
    if (seconds < 0) {
      return;
    }
    countdown();
    const interval = setInterval(countdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return seconds >= 0 ? (
    <svg
      className="h-7 w-7 stroke-accent"
      style={{ transform: 'rotateY(-180deg) rotateZ(-90deg)' }}
    >
      <circle
        cx="50%"
        cy="50%"
        r="10"
        style={{
          animation: `countdown ${remainingTime}s linear`,
          fill: 'none',
          strokeDasharray: '63px',
          strokeDashoffset: '0px',
          strokeLinecap: 'round',
          strokeWidth: '2px',
        }}
      ></circle>
    </svg>
  ) : (
    <span className="text-xs text-red-600">Expired</span>
  );
};

type Props = {};

export default CountdownTimer;
