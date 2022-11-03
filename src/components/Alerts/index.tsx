import { Alert } from '@map3xyz/components';
import React, { useContext, useEffect } from 'react';

import { Context } from '../../providers/Store';

const Alerts: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);

  useEffect(() => {
    if (state.alerts.length > 0) {
      let alertsToClose = state.alerts.length;

      while (alertsToClose > 0) {
        setTimeout(() => {
          dispatch({
            payload: state.alerts[alertsToClose].id,
            type: 'REMOVE_ALERT',
          });
        }, 5000);
        alertsToClose--;
      }
    }
  }, [state.alerts.length]);

  return (
    <div className="w-full">
      {state.alerts.map((alert) => {
        return (
          <Alert closable key={alert.id} withIcon {...alert}>
            {alert.message}
          </Alert>
        );
      })}
    </div>
  );
};

type Props = {};

export default Alerts;
