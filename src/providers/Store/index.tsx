import React, { createContext, PropsWithChildren, useReducer } from 'react';

import { Asset, Network, PaymentMethod } from '../../generated/apollo-gql';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'EnterAmount' = 3,
  'Summary' = 4,
  __LENGTH,
}

type RemoteType = 'loading' | 'success' | 'error' | 'idle';

export type AlertType = {
  id: number;
  message: string;
  title: string;
  variant?: 'success' | 'danger' | 'warning' | 'info';
};

type State = {
  account: {
    data: string | undefined;
    status: RemoteType;
  };
  alerts: AlertType[];
  asset?: Asset;
  depositAddress: {
    data: string | undefined;
    status: RemoteType;
  };
  method?: PaymentMethod;
  network?: Network;
  slug?: string;
  step: number;
  steps: (keyof typeof Steps)[];
  theme?: 'dark' | 'light';
};

type Action =
  | { payload: Asset; type: 'SET_ASSET' }
  | { payload: Network; type: 'SET_NETWORK' }
  | { payload: PaymentMethod; type: 'SET_PAYMENT_METHOD' }
  | { payload: number; type: 'SET_STEP' }
  | { payload: (keyof typeof Steps)[]; type: 'SET_STEPS' }
  | { payload: string; type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' }
  | { type: 'SET_ACCOUNT_IDLE' }
  | { type: 'SET_ACCOUNT_LOADING' }
  | { payload: string; type: 'SET_ACCOUNT_SUCCESS' }
  | { payload: string; type: 'SET_ACCOUNT_ERROR' }
  | { payload: Omit<AlertType, 'id'>; type: 'DISPLAY_ALERT' }
  | { payload: number; type: 'REMOVE_ALERT' };

const initialState: State = {
  account: {
    data: undefined,
    status: 'idle',
  },
  alerts: [],
  asset: undefined,
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  method: undefined,
  network: undefined,
  slug: undefined,
  step: Steps.AssetSelection,
  steps: [
    'AssetSelection',
    'NetworkSelection',
    'PaymentMethod',
    'EnterAmount',
    'Summary',
  ],
  theme: undefined,
};

export const Store: React.FC<
  PropsWithChildren<{
    asset?: Asset;
    generateDepositAddress: (
      asset?: string,
      network?: string
    ) => Promise<string>;
    network?: Network;
    slug?: string;
    theme?: 'dark' | 'light';
  }>
> = ({ asset, children, generateDepositAddress, network, slug, theme }) => {
  let step = 0;

  if (asset) {
    step = Steps.NetworkSelection;
  }

  if (asset && network) {
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
          return {
            ...state,
            step: state.steps.indexOf(
              Steps[action.payload] as keyof typeof Steps
            ),
          };
        case 'SET_STEPS': {
          return { ...state, steps: action.payload };
        }
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
        case 'SET_ACCOUNT_SUCCESS':
          return {
            ...state,
            account: {
              data: action.payload,
              status: 'success',
            },
          };
        case 'SET_ACCOUNT_ERROR':
          return {
            ...state,
            account: {
              data: action.payload,
              status: 'error',
            },
          };
        case 'SET_ACCOUNT_LOADING':
          return {
            ...state,
            account: {
              data: undefined,
              status: 'loading',
            },
          };
        case 'SET_ACCOUNT_IDLE':
          return {
            ...state,
            account: {
              data: undefined,
              status: 'idle',
            },
          };
        case 'DISPLAY_ALERT':
          return {
            ...state,
            alerts: [
              ...state.alerts,
              { ...action.payload, id: state.alerts.length },
            ],
          };
        case 'REMOVE_ALERT':
          return {
            ...state,
            alerts: state.alerts.filter((alert) => alert.id !== action.payload),
          };
        default:
          return state;
      }
    },
    { ...initialState, asset, network, slug, step, theme }
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
