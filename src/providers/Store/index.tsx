import WalletConnect from '@walletconnect/client';
import { ethers } from 'ethers';
import React, { createContext, PropsWithChildren, useReducer } from 'react';

import {
  AssetWithPrice,
  Network,
  PaymentMethod,
} from '../../generated/apollo-gql';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'EnterAmount' = 3,
  'WalletConnect' = 4,
  'Summary' = 5,
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
  asset?: AssetWithPrice;
  connector?: {
    data?: WalletConnect;
    error?: string;
    status: RemoteType;
    waiting: boolean;
  };
  depositAddress: {
    data: string | undefined;
    status: RemoteType;
  };
  fiat?: string;
  method?: PaymentMethod & { description?: string };
  network?: Network;
  provider?: {
    data?: ethers.providers.Web3Provider;
    error?: string;
    status: RemoteType;
  };
  slug?: string;
  step: number;
  steps: (keyof typeof Steps)[];
  theme?: 'dark' | 'light';
};

type Action =
  | { payload: AssetWithPrice; type: 'SET_ASSET' }
  | { payload: Network; type: 'SET_NETWORK' }
  | { payload?: PaymentMethod; type: 'SET_PAYMENT_METHOD' }
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
  | { type: 'SET_CONNECTOR_IDLE' }
  | { type: 'SET_CONNECTOR_LOADING' }
  | { payload: any; type: 'SET_CONNECTOR_SUCCESS' }
  | { payload: string; type: 'SET_CONNECTOR_ERROR' }
  // | { payload: boolean; type: 'SET_CONNECTOR_WAITING' }
  | { type: 'SET_PROVIDER_IDLE' }
  | { type: 'SET_PROVIDER_LOADING' }
  | { payload: any; type: 'SET_PROVIDER_SUCCESS' }
  | { payload: string; type: 'SET_PROVIDER_ERROR' };

const initialState: State = {
  account: {
    data: undefined,
    status: 'idle',
  },
  asset: undefined,
  connector: {
    data: undefined,
    error: undefined,
    status: 'idle',
    waiting: false,
  },
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  fiat: undefined,
  method: undefined,
  network: undefined,
  provider: {
    data: undefined,
    error: undefined,
    status: 'idle',
  },
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
    asset?: AssetWithPrice;
    fiat?: string;
    generateDepositAddress: (
      asset?: string,
      network?: string
    ) => Promise<{ address: string; memo?: string }>;
    network?: Network;
    slug?: string;
    theme?: 'dark' | 'light';
  }>
> = ({
  asset,
  children,
  fiat,
  generateDepositAddress,
  network,
  slug,
  theme,
}) => {
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
        case 'SET_CONNECTOR_SUCCESS':
          return {
            ...state,
            connector: {
              data: action.payload,
              error: undefined,
              status: 'success',
              waiting: false,
            },
          };
        case 'SET_CONNECTOR_ERROR':
          return {
            ...state,
            connector: {
              data: undefined,
              error: action.payload,
              status: 'error',
              waiting: false,
            },
          };
        case 'SET_CONNECTOR_LOADING':
          return {
            ...state,
            connector: {
              data: undefined,
              error: undefined,
              status: 'loading',
              waiting: false,
            },
          };
        case 'SET_CONNECTOR_IDLE':
          return {
            ...state,
            connector: {
              data: undefined,
              error: undefined,
              status: 'idle',
              waiting: false,
            },
          };
        // case 'SET_CONNECTOR_WAITING':
        //   return {
        //     ...state,
        //     connector: {
        //       ...state.connector!,
        //       waiting: action.payload,
        //     },
        //   };
        case 'SET_PROVIDER_SUCCESS':
          return {
            ...state,
            provider: {
              data: action.payload,
              error: undefined,
              status: 'success',
            },
          };
        case 'SET_PROVIDER_ERROR':
          return {
            ...state,
            provider: {
              data: undefined,
              error: action.payload,
              status: 'error',
            },
          };
        case 'SET_PROVIDER_LOADING':
          return {
            ...state,
            provider: {
              data: undefined,
              error: undefined,
              status: 'loading',
            },
          };
        case 'SET_PROVIDER_IDLE':
          return {
            ...state,
            provider: {
              data: undefined,
              error: undefined,
              status: 'idle',
            },
          };
        default:
          return state;
      }
    },
    { ...initialState, asset, fiat, network, slug, step, theme }
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
        network?: string,
        memoEnabled?: boolean
      ) => Promise<{ address: string; memo?: string }>;
    }
  ]
>([
  initialState,
  () => null,
  {
    generateDepositAddress: () =>
      new Promise((resolve) => resolve({ address: '' })),
  },
]);
