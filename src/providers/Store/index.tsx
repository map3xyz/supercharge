import React, { createContext, PropsWithChildren, useReducer } from 'react';

import { Asset, Network, PaymentMethod } from '../../generated/apollo-gql';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  // 'EnterAmount' = 3,
  'Summary' = 3,
  __LENGTH,
}

type State = {
  asset?: Asset;
  depositAddress: {
    data: string | undefined;
    status: 'loading' | 'success' | 'error' | 'idle';
  };
  method?: PaymentMethod;
  network?: Network;
  slug?: string;
  step: number;
  theme?: 'dark' | 'light';
};

type Action =
  | { payload: Asset; type: 'SET_ASSET' }
  | { payload: Network; type: 'SET_NETWORK' }
  | { payload: PaymentMethod; type: 'SET_PAYMENT_METHOD' }
  | { payload: number; type: 'SET_STEP' }
  | { payload: string; type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' };

const initialState: State = {
  asset: undefined,
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  method: undefined,
  network: undefined,
  slug: undefined,
  step: Steps.AssetSelection,
  theme: undefined,
};

export const Store: React.FC<
  PropsWithChildren<{
    generateDepositAddress: (
      asset?: string,
      network?: string
    ) => Promise<string>;
    slug?: string;
    theme?: 'dark' | 'light';
  }>
> = ({ children, generateDepositAddress, slug, theme }) => {
  let step = 0;
  const [coin, network] = slug?.split(':') ?? [];

  if (coin) {
    step = Steps.NetworkSelection;
  }

  if (coin && network) {
    step = Steps.PaymentMethod;
  }

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      switch (action.type) {
        case 'SET_ASSET':
          return { ...state, asset: action.payload };
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
    { ...initialState, slug, step, theme }
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
        asset?: string,
        network?: string
      ) => Promise<string>;
    }
  ]
>([
  initialState,
  () => null,
  { generateDepositAddress: () => new Promise((resolve) => resolve('')) },
]);
