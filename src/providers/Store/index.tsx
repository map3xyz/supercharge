import { BigNumber, ethers } from 'ethers';
import React, { createContext, PropsWithChildren, useReducer } from 'react';

import { Asset, Network, PaymentMethod } from '../../generated/apollo-gql';
import { PrebuiltTx } from '../../utils/transactions/evm';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'SwitchChain' = 3,
  'EnterAmount' = 4,
  'WalletConnect' = 5,
  'ConfirmRequiredAmount' = 6,
  'ShowAddress' = 7,
  'Result' = 8,
  __LENGTH,
}

export enum TxSteps {
  'Submitted' = 0,
  'Confirming' = 1,
  'Confirmed' = 2,
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
  asset?: Asset;
  colors?: {
    progressBar?: string;
    scrollBar?: string;
  };
  depositAddress: {
    data?: { address: string; memo?: string };
    error?: string;
    status: RemoteType;
  };
  embed?: {
    height?: string;
    id?: string;
    width?: string;
  };
  fiat?: string;
  method?: PaymentMethod & { description?: string };
  network?: Network;
  prebuiltTx: {
    data?: {
      feeError: boolean;
      gasLimit: BigNumber;
      gasPrice: BigNumber;
      maxFeePerGas?: BigNumber;
      maxLimitFormatted: string;
      maxLimitRaw: BigNumber;
      maxPriorityFeePerGas?: BigNumber;
      memo?: string;
      tx: PrebuiltTx;
    };
    error?: string;
    status: RemoteType;
  };
  prevStep: number;
  provider?: {
    data?: ethers.providers.Web3Provider;
    error?: string;
    status: RemoteType;
  };
  providerChainId?: number;
  requiredAmount?: string;
  slug?: string;
  step: number;
  steps: (keyof typeof Steps)[];
  theme?: 'dark' | 'light';
  tx: {
    amount?: string;
    hash?: string;
    progress: {
      [key in keyof typeof TxSteps]: {
        data?: string;
        error?: string;
        status: RemoteType;
        title?: string;
      };
    };
    response?: ethers.providers.TransactionResponse;
    step: number;
    steps: (keyof typeof TxSteps)[];
  };
};

type Action =
  | { payload: Asset; type: 'SET_ASSET' }
  | { payload: Network; type: 'SET_NETWORK' }
  | { payload?: PaymentMethod; type: 'SET_PAYMENT_METHOD' }
  | { payload: number; type: 'SET_STEP' }
  | { payload: (keyof typeof Steps)[]; type: 'SET_STEPS' }
  | {
      payload: { address: string; memo?: string };
      type: 'GENERATE_DEPOSIT_ADDRESS_SUCCESS';
    }
  | { payload: string; type: 'GENERATE_DEPOSIT_ADDRESS_ERROR' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_LOADING' }
  | { type: 'GENERATE_DEPOSIT_ADDRESS_IDLE' }
  | { type: 'SET_ACCOUNT_IDLE' }
  | { type: 'SET_ACCOUNT_LOADING' }
  | { payload: string; type: 'SET_ACCOUNT_SUCCESS' }
  | { payload: string; type: 'SET_ACCOUNT_ERROR' }
  | { type: 'SET_PROVIDER_IDLE' }
  | { type: 'SET_PROVIDER_LOADING' }
  | { payload: any; type: 'SET_PROVIDER_SUCCESS' }
  | { payload: string; type: 'SET_PROVIDER_ERROR' }
  | { type: 'SET_BALANCE_LOADING' }
  | {
      payload: {
        assetBalance: ethers.BigNumber;
        chainBalance: ethers.BigNumber;
      };
      type: 'SET_BALANCE_SUCCESS';
    }
  | { payload: string; type: 'SET_BALANCE_ERROR' }
  | { type: 'SET_BALANCE_IDLE' }
  | { type: 'SET_PREBUILT_TX_LOADING' }
  | {
      payload: {
        feeError: boolean;
        gasLimit: BigNumber;
        gasPrice: BigNumber;
        maxLimitFormatted: string;
        maxLimitRaw: BigNumber;
        memo?: string;
        tx: PrebuiltTx;
      };
      type: 'SET_PREBUILT_TX_SUCCESS';
    }
  | { payload: string; type: 'SET_PREBUILT_TX_ERROR' }
  | { type: 'SET_PREBUILT_TX_IDLE' }
  | { payload?: number; type: 'SET_PROVIDER_CHAIN_ID' }
  | {
      payload: { steps: (keyof typeof TxSteps)[] };
      type: 'SET_TX_PROGRESS_STEPS';
    }
  | {
      payload: {
        data?: string;
        error?: string;
        status: RemoteType;
        step: keyof typeof TxSteps;
        title?: string;
      };
      type: 'SET_TX';
    }
  | { payload: string; type: 'SET_TX_HASH' }
  | { payload: string; type: 'SET_TX_AMOUNT' }
  | {
      payload: ethers.providers.TransactionResponse;
      type: 'SET_TX_RESPONSE';
    }
  | {
      type: 'RESET_TX';
    };

const initialState: State = {
  account: {
    data: undefined,
    status: 'idle',
  },
  asset: undefined,
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  fiat: undefined,
  method: undefined,
  network: undefined,
  prebuiltTx: {
    data: undefined,
    error: undefined,
    status: 'idle',
  },
  prevStep: Steps.AssetSelection,
  provider: {
    data: undefined,
    error: undefined,
    status: 'idle',
  },
  providerChainId: undefined,
  slug: undefined,
  step: Steps.AssetSelection,
  steps: [
    'AssetSelection',
    'NetworkSelection',
    'PaymentMethod',
    'EnterAmount',
    'Result',
  ],
  theme: undefined,
  tx: {
    progress: {
      Confirmed: {
        data: undefined,
        error: undefined,
        status: 'idle',
      },
      Confirming: {
        data: undefined,
        error: undefined,
        status: 'idle',
      },
      Submitted: {
        data: undefined,
        error: undefined,
        status: 'idle',
      },
    },
    step: 0,
    steps: ['Submitted', 'Confirming', 'Confirmed'],
  },
};

export const Store: React.FC<
  PropsWithChildren<{
    amount?: string;
    asset?: Asset;
    authorizeTransaction?: (
      fromAddress: string,
      network: string,
      amount: string
    ) => Promise<Boolean>;
    colors?: {
      progressBar?: string;
      scrollBar?: string;
    };
    embed?: {
      height?: string;
      id?: string;
      width?: string;
    };
    fiat?: string;
    generateDepositAddress: (
      asset?: string,
      network?: string,
      memoEnabled?: boolean
    ) =>
      | Promise<{ address: string; memo?: string }>
      | { address: string; memo?: string };
    network?: Network;
    onFailure?: (error: string, networkCode: string, address?: string) => void;
    onSuccess?: (txHash: string, networkCode: string, address?: string) => void;
    theme?: 'dark' | 'light';
  }>
> = ({
  amount,
  asset,
  authorizeTransaction,
  children,
  colors,
  embed,
  fiat,
  generateDepositAddress,
  network,
  onFailure,
  onSuccess,
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
            prevStep: state.step,
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
              error: action.payload,
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
        case 'SET_PREBUILT_TX_SUCCESS':
          return {
            ...state,
            prebuiltTx: {
              data: action.payload,
              error: undefined,
              status: 'success',
            },
          };
        case 'SET_PREBUILT_TX_ERROR':
          return {
            ...state,
            prebuiltTx: {
              data: undefined,
              error: action.payload,
              status: 'error',
            },
          };
        case 'SET_PREBUILT_TX_LOADING':
          return {
            ...state,
            prebuiltTx: {
              data: undefined,
              error: undefined,
              status: 'loading',
            },
          };
        case 'SET_PREBUILT_TX_IDLE':
          return {
            ...state,
            prebuiltTx: {
              data: undefined,
              error: undefined,
              status: 'idle',
            },
          };
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
        case 'SET_PROVIDER_CHAIN_ID':
          return {
            ...state,
            providerChainId: action.payload,
          };
        case 'SET_TX':
          return {
            ...state,
            tx: {
              ...state.tx,
              progress: {
                ...state.tx.progress,
                [action.payload.step]: {
                  ...state.tx.progress[action.payload.step],
                  ...action.payload,
                },
              },
              step: TxSteps[action.payload.step],
            },
          };
        case 'SET_TX_HASH':
          return {
            ...state,
            tx: {
              ...state.tx,
              hash: action.payload,
            },
          };
        case 'SET_TX_AMOUNT':
          return {
            ...state,
            tx: {
              ...state.tx,
              amount: action.payload,
            },
          };
        case 'SET_TX_RESPONSE':
          return {
            ...state,
            tx: {
              ...state.tx,
              response: action.payload,
            },
          };
        case 'RESET_TX':
          return {
            ...state,
            tx: {
              ...initialState.tx,
            },
          };
        /* istanbul ignore next */
        default:
          /* istanbul ignore next */
          return state;
      }
    },
    {
      ...initialState,
      asset,
      colors,
      embed,
      fiat,
      network,
      requiredAmount: amount,
      step,
      theme,
    }
  );

  return (
    <Context.Provider
      value={[
        state,
        dispatch,
        { authorizeTransaction, generateDepositAddress, onFailure, onSuccess },
      ]}
    >
      {children}
    </Context.Provider>
  );
};

export const Context = createContext<
  [
    State,
    React.Dispatch<Action>,
    {
      authorizeTransaction?: (
        fromAddress: string,
        network: string,
        amount: string
      ) => Promise<Boolean>;
      generateDepositAddress: (
        asset?: string,
        network?: string,
        memoEnabled?: boolean
      ) =>
        | Promise<{ address: string; memo?: string }>
        | { address: string; memo?: string };
      onFailure?: (
        error: string,
        networkCode: string,
        address?: string
      ) => void;
      onSuccess?: (
        txHash: string,
        networkCode: string,
        address?: string
      ) => void;
    }
  ]
>([
  initialState,
  () => null,
  {
    authorizeTransaction: /* istanbul ignore next */ () =>
      new Promise((resolve) => resolve(true)),
    generateDepositAddress: /* istanbul ignore next */ () =>
      new Promise((resolve) => resolve({ address: '' })),
    onFailure: /* istanbul ignore next */ () => {},
    onSuccess: /* istanbul ignore next */ () => {},
  },
]);
