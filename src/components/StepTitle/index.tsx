import React from 'react';

import CountdownTimer from '../CountdownTimer';

const StepTitle: React.FC<Props> = (props) => {
  return (
    <h3
      className="flex items-center justify-between text-lg font-semibold dark:text-white"
      data-testid={props.testId}
    >
      <span>{props.value}</span> <CountdownTimer />
    </h3>
  );
};

type Props = {
  testId?: string;
  value: string;
};

export default StepTitle;
