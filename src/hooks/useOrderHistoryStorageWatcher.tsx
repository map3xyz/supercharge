import { useContext, useEffect } from 'react';

import { Context } from '../providers/Store';

export const MAP3_ORDER_HISTORY_STORAGE_KEY = 'MAP3_ORDER_HISTORY';

export const useOrderHistoryStorageWatcher = () => {
  const [state, dispatch] = useContext(Context);

  function checkOrderHistory() {
    const orderHistory = localStorage.getItem(MAP3_ORDER_HISTORY_STORAGE_KEY);

    if (state.orderHistory?.length !== orderHistory?.length && orderHistory) {
      dispatch({
        payload: JSON.parse(orderHistory),
        type: 'SET_ORDER_HISTORY',
      });
    }
  }

  useEffect(() => {
    checkOrderHistory();
  }, []);

  window.addEventListener('storage', checkOrderHistory);

  return () => {
    window.removeEventListener('storage', checkOrderHistory);
  };
};
