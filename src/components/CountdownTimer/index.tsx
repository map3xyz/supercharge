import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../providers/Store';

const CountdownTimer: React.FC<Props> = () => {
  const [state] = useContext(Context);
  const remainingTime = 10;
  const [seconds, setSeconds] = useState(remainingTime);

  const countdown = () => {
    if (seconds <= 0) {
      return;
    }
    setSeconds((prev) => prev - 1);
  };

  useEffect(() => {
    countdown();
    const interval = setInterval(countdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return seconds > 0 ? (
    <span aria-label={`${seconds}s remaining.`} className="hint--left">
      <svg
        className="h-7 w-7 scale-75 stroke-accent"
        style={{ transform: 'rotateY(-180deg) rotateZ(-90deg)' }}
      >
        <circle
          cx="50%"
          cy="50%"
          r="10"
          style={{
            animation: `countdown ${remainingTime}s linear`,
            fill: 'none',
            strokeDasharray: `${Math.PI * 20}px`,
            strokeDashoffset: '0px',
            strokeLinecap: 'round',
            strokeWidth: '2px',
          }}
        ></circle>
      </svg>
    </span>
  ) : (
    <span className="text-xs text-red-600">Expired</span>
  );
};

type Props = {};

export default CountdownTimer;
