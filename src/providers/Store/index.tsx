import { BigNumber, ethers } from 'ethers';
import posthog from 'posthog-js';
import React, { createContext, PropsWithChildren, useReducer } from 'react';

import { Map3InitConfig } from '../..';
import { ISO_4217_TO_SYMBOL } from '../../constants/iso4217';
import {
  Asset,
  BridgeQuote,
  BridgeTransactionWithAssetsAndNetworks,
  Network,
  PaymentMethod,
} from '../../generated/apollo-gql';
import { parseJwt } from '../../utils/parseJwt';
import { PrebuiltTx } from '../../utils/transactions/evm';

export enum Steps {
  'AssetSelection' = 0,
  'NetworkSelection' = 1,
  'PaymentMethod' = 2,
  'SwitchChain' = 3,
  'EnterAmount' = 4,
  'BinancePay' = 5,
  'WalletConnect' = 6,
  'ConfirmRequiredAmount' = 7,
  'ShowAddress' = 8,
  'History' = 9,
  'Result' = 10,
  __LENGTH,
}

export enum TxSteps {
  'ApproveToken' = 0,
  'Submitted' = 1,
  'Confirming' = 2,
  'Confirmed' = 3,
  'DestinationNetwork' = 4,
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
  anonKey: string;
  asset?: Asset;
  bridgeQuote?: BridgeQuote;
  bridgeTransaction?: BridgeTransactionWithAssetsAndNetworks;
  depositAddress: {
    data?: { address: string; memo?: string };
    error?: string;
    status: RemoteType;
  };
  destinationNetwork?: Network;
  embed?: {
    height?: string;
    id?: string;
    width?: string;
  };
  expiration?: Date;
  fiat?: string;
  fiatDisplaySymbol?: string;
  initTime: Date;
  method?: PaymentMethod & { description?: string };
  minStep: number;
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
  prevSteps: (keyof typeof Steps)[];
  provider?: {
    data?: ethers.providers.Web3Provider;
    error?: string;
    status: RemoteType;
  };
  providerChainId?: number;
  rate?: number;
  requiredAmountMajor?: string;
  requiredAmountMinor?: string;
  requiredPaymentMethod?: 'binance-pay' | 'show-address';
  shortcutAmounts?: number[];
  slug?: string;
  step: number;
  stepInView: number;
  steps: (keyof typeof Steps)[];
  theme?: 'dark' | 'light';
  tx: {
    amount?: string;
    hash?: string;
    progress: {
      [key in keyof typeof TxSteps]: {
        data?: string;
        status: RemoteType;
        title?: string;
      };
    };
    response?: ethers.providers.TransactionResponse;
    step: number;
    steps: (keyof typeof TxSteps)[];
  };
  userId: string;
};

type Action =
  | { payload: Asset; type: 'SET_ASSET' }
  | { payload: Network; type: 'SET_NETWORK' }
  | { payload?: BridgeQuote; type: 'SET_BRIDGE_QUOTE' }
  | {
      payload: BridgeTransactionWithAssetsAndNetworks;
      type: 'SET_BRIDGE_TRANSACTION';
    }
  | { payload: Network; type: 'SET_DESTINATION_NETWORK' }
  | { payload?: PaymentMethod; type: 'SET_PAYMENT_METHOD' }
  | { payload: number; type: 'SET_STEP' }
  | { payload: number; type: 'SET_STEP_IN_VIEW' }
  | { payload: (keyof typeof Steps)[]; type: 'SET_STEPS' }
  | { payload: number; type: 'SET_MIN_STEP' }
  | {
      payload: {
        id: string;
        state: 'subscribed' | 'quoted' | 'completed' | 'failed';
      }[];
      type: 'SET_ORDER_HISTORY';
    }
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
        status: RemoteType;
        step: keyof typeof TxSteps;
        title?: string;
      };
      type: 'SET_TX';
    }
  | {
      payload: (keyof typeof TxSteps)[];
      type: 'SET_TX_STEPS';
    }
  | { payload: string; type: 'SET_TX_HASH' }
  | { payload: string; type: 'SET_TX_AMOUNT' }
  | {
      payload: ethers.providers.TransactionResponse;
      type: 'SET_TX_RESPONSE';
    }
  | {
      payload: {
        assetId: string;
        symbol: string;
        txAmount: string;
      };
      type: 'SET_COMMITTED_TX_AMOUNT';
    }
  | {
      type: 'RESET_TX';
    }
  | {
      type: 'RESET_STATE';
    };

const initialState: State = {
  account: {
    data: undefined,
    status: 'idle',
  },
  anonKey: '',
  asset: undefined,
  depositAddress: {
    data: undefined,
    status: 'idle',
  },
  destinationNetwork: undefined,
  expiration: undefined,
  fiat: undefined,
  initTime: new Date(),
  method: undefined,
  minStep: Steps.AssetSelection,
  network: undefined,
  prebuiltTx: {
    data: undefined,
    error: undefined,
    status: 'idle',
  },
  prevStep: Steps.AssetSelection,
  prevSteps: [],
  provider: {
    data: undefined,
    error: undefined,
    status: 'idle',
  },
  providerChainId: undefined,
  rate: undefined,
  shortcutAmounts: [],
  slug: undefined,
  step: Steps.AssetSelection,
  stepInView: Steps.AssetSelection,
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
      ApproveToken: {
        data: undefined,
        status: 'idle',
      },
      Confirmed: {
        data: undefined,
        status: 'idle',
      },
      Confirming: {
        data: undefined,
        status: 'idle',
      },
      DestinationNetwork: {
        data: undefined,
        status: 'idle',
      },
      Submitted: {
        data: undefined,
        status: 'idle',
      },
    },
    step: 0,
    steps: ['Submitted', 'Confirming', 'Confirmed'],
  },
  userId: '',
};

export const Store: React.FC<
  PropsWithChildren<Map3InitConfig & { asset?: Asset; network?: Network }>
> = ({ anonKey, asset, children, network, options, userId }) => {
  const { org_id } = parseJwt(anonKey);
  posthog.identify(userId, { organizationId: org_id });
  const { callbacks, selection, style } = options || {};
  const { amount, canBridge, fiat, paymentMethod, rate, shortcutAmounts } =
    selection || {};
  const { embed, theme } = style || {};
  const {
    handleAuthorizeTransaction,
    handleOrderFeeCalculation,
    onAddressRequested,
    onExpire,
    onFailure,
    onOrderCreated,
    onSuccess,
  } = callbacks || {};

  let step = 0;

  if (asset) {
    step = Steps.NetworkSelection;
  }

  if (asset && network && !canBridge) {
    step = Steps.PaymentMethod;
  }

  let requiredAmountMajor: string | undefined;
  let requiredAmountMinor: string | undefined;
  if (amount && asset?.decimals) {
    requiredAmountMajor = ethers.utils.formatUnits(amount, asset.decimals);
    requiredAmountMinor = amount;
  }

  let expiration;
  if (selection?.expiration) {
    expiration = new Date(selection.expiration);
  }

  const requiredPaymentMethod = paymentMethod;

  const fiatDisplaySymbol = ISO_4217_TO_SYMBOL[fiat || 'USD'];

  const rest = {
    anonKey,
    asset,
    embed,
    expiration,
    fiat,
    fiatDisplaySymbol,
    minStep: step,
    network,
    rate,
    requiredAmountMajor,
    requiredAmountMinor,
    requiredPaymentMethod,
    shortcutAmounts,
    step,
    theme,
    userId,
  };

  const [state, dispatch] = useReducer(
    (state: State, action: Action): State => {
      posthog.capture(action.type, { property: action }, {});
      switch (action.type) {
        case 'SET_ASSET':
          return { ...state, asset: action.payload };
        case 'SET_DESTINATION_NETWORK':
          return { ...state, destinationNetwork: action.payload };
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
        case 'SET_STEP_IN_VIEW':
          return {
            ...state,
            stepInView: state.steps.indexOf(
              Steps[action.payload] as keyof typeof Steps
            ),
          };
        case 'SET_STEPS': {
          return { ...state, prevSteps: state.steps, steps: action.payload };
        }
        case 'SET_MIN_STEP':
          return {
            ...state,
            minStep: state.steps.indexOf(
              Steps[action.payload] as keyof typeof Steps
            ),
          };
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
        case 'SET_BRIDGE_QUOTE':
          return {
            ...state,
            bridgeQuote: action.payload,
          };
        case 'SET_BRIDGE_TRANSACTION':
          return {
            ...state,
            bridgeTransaction: action.payload,
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
        case 'SET_TX_STEPS':
          return {
            ...state,
            tx: {
              ...state.tx,
              steps: action.payload,
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
            bridgeQuote: undefined,
            bridgeTransaction: undefined,
            tx: {
              ...initialState.tx,
            },
          };
        case 'RESET_STATE':
          return {
            ...initialState,
            ...rest,
          };
        /* istanbul ignore next */
        default:
          /* istanbul ignore next */
          return state;
      }
    },
    {
      ...initialState,
      ...rest,
    }
  );

  return (
    <Context.Provider
      value={[
        state,
        dispatch,
        {
          handleAuthorizeTransaction,
          handleOrderFeeCalculation,
          onAddressRequested,
          onExpire,
          onFailure,
          onOrderCreated,
          onSuccess,
        },
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
      handleAuthorizeTransaction?: (
        fromAddress: string,
        network: string,
        amount: string
      ) => Promise<Boolean>;
      handleOrderFeeCalculation?: (
        asset: string,
        network: string,
        amount: string
      ) => Promise<{
        fixedFee?: number;
        message?: string;
        variableFee?: number;
      }>;
      onAddressRequested?: (
        asset: string,
        network: string,
        memoEnabled?: boolean
      ) =>
        | Promise<{ address: string; memo?: string }>
        | { address: string; memo?: string };
      onExpire?: () => void;
      onFailure?: (
        error: string,
        networkCode: string,
        address?: string
      ) => void;
      onOrderCreated?: (orderId: string, type: string) => void;
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
    handleAuthorizeTransaction: /* istanbul ignore next */ () =>
      new Promise((resolve) => resolve(true)),
    handleOrderFeeCalculation: /* istanbul ignore next */ () =>
      new Promise((resolve) => resolve({})),
    onAddressRequested: /* istanbul ignore next */ () =>
      new Promise((resolve) => resolve({ address: '' })),
    onExpire: /* istanbul ignore next */ () => {},
    onFailure: /* istanbul ignore next */ () => {},
    onOrderCreated: /* istanbul ignore next */ () => {},
    onSuccess: /* istanbul ignore next */ () => {},
  },
]);
