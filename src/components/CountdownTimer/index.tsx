import React, { useContext, useEffect, useState } from 'react';

import { Context } from '../../providers/Store';

const circumference = Math.PI * 20;

const CountdownTimer: React.FC<Props> = () => {
  const [state] = useContext(Context);

  if (!state.expiration) {
    return null;
  }

  const currentTime = new Date().getTime();
  const progressedTime = currentTime - state.initTime.getTime();
  const totalTime = state.expiration.getTime() - state.initTime.getTime();
  const remainingTime = state.expiration.getTime() - currentTime;
  const remainingTimeSeconds = Math.floor(remainingTime / 1000);
  const completedPercentage = progressedTime / totalTime;
  const [seconds, setSeconds] = useState(remainingTimeSeconds);
  const [position, setPosition] = useState(0);

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

  useEffect(() => {
    const position = circumference - circumference * completedPercentage;
    setPosition(position);
  }, [seconds]);

  const hours = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const minutes = (Math.floor(seconds / 60) % 60).toString().padStart(2, '0');
  const secondsLeft = (seconds % 60).toString().padStart(2, '0');

  return seconds > 0 ? (
    <span
      aria-label={`Expires in ${
        hours === '00' ? '' : `${hours}:`
      }${minutes}:${secondsLeft}`}
      className="hint--left relative h-[22px] w-[22px] rounded-full border-[2px] border-accent-light"
    >
      <svg
        className="absolute left-[-5px] top-[-5px] h-7 w-7 scale-75 stroke-accent "
        style={{ transform: 'rotateZ(-90deg)' }}
      >
        <circle
          className="transition-all"
          cx="50%"
          cy="50%"
          r="10"
          style={{
            fill: 'none',
            strokeDasharray: `${circumference}px`,
            strokeDashoffset: `${position}px`,
            strokeLinecap: 'round',
            strokeWidth: '2px',
          }}
        ></circle>
      </svg>
    </span>
  ) : (
    <span className="text-xxs text-red-600">Expired</span>
  );
};

type Props = {};

export default CountdownTimer;
