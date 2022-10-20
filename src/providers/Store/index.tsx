import React, { createContext, PropsWithChildren, useReducer } from 'react';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'EnterAmount' = 3,
  'QRCode' = 4,
  __LENGTH,
}

export enum Method {
  'binance' = 'binance',
  'cb-pay' = 'cb-pay',
  'metamask' = 'metamask',
  'qr' = 'qr',
}

type State = {
  coin: string | undefined;
  depositAddress: {
    data: string | undefined;
    status: 'loading' | 'success' | 'error' | 'idle';
  };
  method?: Method;
  network: string | undefined;
  step: number;
  theme?: 'dark' | 'light';
};

type Action =
  | { payload: string; type: 'SET_COIN' }
  | { payload: string; type: 'SET_NETWORK' }
  | { payload: State['method']; type: 'SET_PAYMENT_METHOD' }
  | { payload: number; type: 'SET_STEP' }
  | { payload: string; type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' };

const initialState: State = {
  coin: undefined,
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  method: undefined,
  network: undefined,
  step: Steps.AssetSelection,
  theme: undefined,
};

export const Store: React.FC<
  PropsWithChildren<{
    coin?: string;
    generateDepositAddress: (coin: string, network: string) => Promise<string>;
    network?: string;
    theme?: 'dark' | 'light';
  }>
> = ({ children, coin, generateDepositAddress, network, theme }) => {
  let step = 0;

  if (coin) {
    step = 1;
  }

  if (coin && network) {
    step = 2;
  }

  if (coin && network) {
    step = 3;
  }

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'SET_COIN':
          return { ...state, coin: action.payload };
        case 'SET_NETWORK':
          return { ...state, network: action.payload };
        case 'SET_STEP':
          return { ...state, step: action.payload };
        case 'SET_PAYMENT_METHOD':
          return { ...state, method: action.payload };
        case 'GENERATE_DEPOSIT_ADDRESS_SUCCESS':
          return {
            ...state,
            depositAddress: {
              data: action.payload,
              status: 'success',
            },
          };
        case 'GENERATE_DEPOSIT_ADDRESS_ERROR':
          return {
            ...state,
            depositAddress: {
              data: undefined,
              status: 'error',
            },
          };
        case 'GENERATE_DEPOSIT_ADDRESS_LOADING':
          return {
            ...state,
            depositAddress: {
              data: undefined,
              status: 'loading',
            },
          };
        case 'GENERATE_DEPOSIT_ADDRESS_IDLE':
          return {
            ...state,
            depositAddress: {
              data: undefined,
              status: 'idle',
            },
          };
        default:
          return state;
      }
    },
    { ...initialState, coin, network, step, theme }
  );

  return (
    <Context.Provider value={[state, dispatch, { generateDepositAddress }]}>
      {children}
    </Context.Provider>
  );
};

export const Context = createContext<
  [
    State,
    React.Dispatch<Action>,
    {
      generateDepositAddress: (
        coin: string,
        network: string
      ) => Promise<string>;
    }
  ]
>([
  initialState,
  () => null,
  { generateDepositAddress: () => new Promise((resolve) => resolve('')) },
]);
