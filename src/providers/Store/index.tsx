import React, { createContext, useReducer } from 'react';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'EnterAmount' = 3,
  __LENGTH,
}

type State = {
  coin: string | null;
  network: string | null;
  step: number;
};

type Action =
  | { payload: string; type: 'SET_COIN' }
  | { payload: string; type: 'SET_NETWORK' }
  | { payload: number; type: 'SET_STEP' };

const initialState: State = {
  coin: null,
  network: null,
  step: Steps.AssetSelection,
};

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case 'SET_COIN':
        return { ...state, coin: action.payload };
      case 'SET_NETWORK':
        return { ...state, network: action.payload };
      case 'SET_STEP':
        return { ...state, step: action.payload };
      default:
        return state;
    }
  }, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export const Context = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => null,
]);
