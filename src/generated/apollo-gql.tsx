import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Asset = {
  __typename?: 'Asset';
  address?: Maybe<Scalars['String']>;
  config?: Maybe<Config>;
  decimals?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networkName?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  symbol?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type BinanceSettingsData = {
  __typename?: 'BinanceSettingsData';
  apiKey?: Maybe<Scalars['String']>;
  apiSecret?: Maybe<Scalars['String']>;
  cancelUrl?: Maybe<Scalars['String']>;
  returnUrl?: Maybe<Scalars['String']>;
};

export type BridgeQuote = {
  __typename?: 'BridgeQuote';
  aggregator?: Maybe<Scalars['String']>;
  approval?: Maybe<QuoteApprovalInfo>;
  estimate?: Maybe<QuoteEstimate>;
  id?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['String']>;
  quote?: Maybe<GetBridgeQuoteParams>;
  transaction?: Maybe<BridgeTransactionRequest>;
};

export type BridgeTransactionRequest = {
  __typename?: 'BridgeTransactionRequest';
  chainId?: Maybe<Scalars['Int']>;
  data?: Maybe<Scalars['String']>;
  from?: Maybe<Scalars['String']>;
  gasLimit?: Maybe<Scalars['String']>;
  gasPrice?: Maybe<Scalars['String']>;
  to?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Config = {
  __typename?: 'Config';
  assetId?: Maybe<Scalars['String']>;
  mappedAssetId?: Maybe<Scalars['String']>;
};

export type CreateOrderResponse = {
  __typename?: 'CreateOrderResponse';
  checkoutUrl?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  qrContent?: Maybe<Scalars['String']>;
  universalUrl?: Maybe<Scalars['String']>;
};

export type ExtensionLinks = {
  __typename?: 'ExtensionLinks';
  brave?: Maybe<Scalars['String']>;
  chrome?: Maybe<Scalars['String']>;
  edge?: Maybe<Scalars['String']>;
  firefox?: Maybe<Scalars['String']>;
  opera?: Maybe<Scalars['String']>;
};

export type GetBridgeQuoteParams = {
  __typename?: 'GetBridgeQuoteParams';
  amount?: Maybe<Scalars['String']>;
  fromAddress?: Maybe<Scalars['String']>;
  fromAssetId?: Maybe<Scalars['String']>;
  toAddress?: Maybe<Scalars['String']>;
  toAssetId?: Maybe<Scalars['String']>;
};

export type Identifiers = {
  __typename?: 'Identifiers';
  chainId?: Maybe<Scalars['Int']>;
};

export type Links = {
  __typename?: 'Links';
  explorer?: Maybe<Scalars['String']>;
};

export type Logo = {
  __typename?: 'Logo';
  png?: Maybe<Scalars['String']>;
  svg?: Maybe<Scalars['String']>;
};

export type Map3Order = {
  __typename?: 'Map3Order';
  assetId?: Maybe<Scalars['String']>;
  merchantTradeNo?: Maybe<Scalars['String']>;
  orderAmount?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['String']>;
  platformTransactionId?: Maybe<Scalars['String']>;
  prepayId?: Maybe<Scalars['String']>;
  status?: Maybe<Map3PlatformOrderStatus>;
  userId?: Maybe<Scalars['String']>;
};

export enum Map3PlatformOrderStatus {
  Canceled = 'canceled',
  Error = 'error',
  Expired = 'expired',
  Initial = 'initial',
  Paid = 'paid',
  Pending = 'pending',
  Refunded = 'refunded',
  Refunding = 'refunding',
  Success = 'success'
}

export type Mutation = {
  __typename?: 'Mutation';
  addWatchedAddress?: Maybe<Scalars['ID']>;
  createBinanceOrder?: Maybe<CreateOrderResponse>;
  createBinanceSettingsForOrganization?: Maybe<BinanceSettingsData>;
  createOrganization?: Maybe<Organization>;
  createSdkConfigForOrganization?: Maybe<SdkConfigField>;
  createSvixConsumerApp?: Maybe<Scalars['String']>;
  createSvixConsumerPortalWebhookLink?: Maybe<Scalars['String']>;
  deleteBinanceSettingsForOrganization?: Maybe<Scalars['String']>;
  prepareBridgeQuote?: Maybe<BridgeQuote>;
  removeWatchedAddress?: Maybe<Scalars['ID']>;
  subscribeToBridgeTransaction?: Maybe<Scalars['String']>;
  updateBinanceSettingsForOrganization?: Maybe<BinanceSettingsData>;
  updateSdkConfigForOrganization?: Maybe<SdkConfigField>;
};


export type MutationAddWatchedAddressArgs = {
  address: Scalars['String'];
  assetId: Scalars['String'];
  confirmationsToWatch: Scalars['Int'];
  memo?: InputMaybe<Scalars['String']>;
};


export type MutationCreateBinanceOrderArgs = {
  assetId: Scalars['String'];
  orderAmount: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateBinanceSettingsForOrganizationArgs = {
  apiKey: Scalars['String'];
  apiSecret: Scalars['String'];
  cancelUrl: Scalars['String'];
  returnUrl: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  name: Scalars['String'];
};


export type MutationCreateSdkConfigForOrganizationArgs = {
  assetId: Scalars['ID'];
  mappedAssetId: Scalars['ID'];
  networkCode: Scalars['String'];
};


export type MutationCreateSvixConsumerAppArgs = {
  organizationId: Scalars['ID'];
};


export type MutationPrepareBridgeQuoteArgs = {
  amount: Scalars['String'];
  fromAddress: Scalars['String'];
  fromAssetId: Scalars['String'];
  toAddress: Scalars['String'];
  toAssetId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationRemoveWatchedAddressArgs = {
  watchedAddressId?: InputMaybe<Scalars['ID']>;
};


export type MutationSubscribeToBridgeTransactionArgs = {
  id: Scalars['String'];
};


export type MutationUpdateBinanceSettingsForOrganizationArgs = {
  cancelUrl: Scalars['String'];
  returnUrl: Scalars['String'];
};


export type MutationUpdateSdkConfigForOrganizationArgs = {
  assetId: Scalars['ID'];
  enabled: Scalars['Boolean'];
  mappedAssetId: Scalars['ID'];
  networkCode: Scalars['String'];
};

export type Network = {
  __typename?: 'Network';
  address?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  bridged?: Maybe<Scalars['Boolean']>;
  decimals?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['String']>;
  identifiers?: Maybe<Identifiers>;
  links?: Maybe<Links>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networkName?: Maybe<Scalars['String']>;
  regex?: Maybe<Regex>;
  symbol?: Maybe<Scalars['String']>;
};

export type Organization = {
  __typename?: 'Organization';
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  plan?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  flags?: Maybe<PaymentMethodFlags>;
  icon?: Maybe<Scalars['String']>;
  links?: Maybe<ExtensionLinks>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  walletConnect?: Maybe<WalletConnectWallet>;
};

export type PaymentMethodFlags = {
  __typename?: 'PaymentMethodFlags';
  enabled?: Maybe<Scalars['Boolean']>;
  memo?: Maybe<Scalars['Boolean']>;
};

export type Price = {
  __typename?: 'Price';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  rank?: Maybe<Scalars['Int']>;
  symbol?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  assetByAddressAndNetworkCode?: Maybe<Asset>;
  assetByAddressAndNetworkCodeForOrganization?: Maybe<Asset>;
  assetById?: Maybe<Asset>;
  assetByMappedAssetIdAndNetworkCode?: Maybe<Asset>;
  assetPrice?: Maybe<Price>;
  assets?: Maybe<Array<Maybe<Asset>>>;
  assetsCount?: Maybe<Scalars['Int']>;
  assetsForOrganization?: Maybe<Array<Maybe<Asset>>>;
  binanceSettingsForOrganization?: Maybe<BinanceSettingsData>;
  mappedNetworksForAsset?: Maybe<Array<Maybe<Network>>>;
  mappedNetworksForAssetByOrg?: Maybe<Array<Maybe<Network>>>;
  methods?: Maybe<Array<Maybe<PaymentMethod>>>;
  methodsForNetwork?: Maybe<Array<Maybe<PaymentMethod>>>;
  networkByChainId?: Maybe<Network>;
  networkByCode?: Maybe<Network>;
  networks?: Maybe<Array<Maybe<Network>>>;
  networksByNetworkCodes?: Maybe<Array<Maybe<Network>>>;
  networksCount?: Maybe<Scalars['Int']>;
  organizationById?: Maybe<Organization>;
  queryBinanceOrder?: Maybe<Map3Order>;
  sdkConfigForOrganization?: Maybe<Array<Maybe<SdkConfigField>>>;
  searchAssets?: Maybe<Array<Maybe<Asset>>>;
  searchAssetsForOrganization?: Maybe<Array<Maybe<Asset>>>;
};


export type QueryAssetByAddressAndNetworkCodeArgs = {
  address?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
};


export type QueryAssetByAddressAndNetworkCodeForOrganizationArgs = {
  address?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
};


export type QueryAssetByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAssetByMappedAssetIdAndNetworkCodeArgs = {
  mappedAssetId?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
};


export type QueryAssetPriceArgs = {
  assetId?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
};


export type QueryAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryAssetsForOrganizationArgs = {
  address?: InputMaybe<Scalars['String']>;
  assetId?: InputMaybe<Scalars['ID']>;
  currency?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMappedNetworksForAssetArgs = {
  assetId?: InputMaybe<Scalars['String']>;
};


export type QueryMappedNetworksForAssetByOrgArgs = {
  assetId?: InputMaybe<Scalars['String']>;
};


export type QueryMethodsForNetworkArgs = {
  chainId?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworkByChainIdArgs = {
  chainId?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworkByCodeArgs = {
  code?: InputMaybe<Scalars['String']>;
};


export type QueryNetworksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworksByNetworkCodesArgs = {
  networkCodes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryQueryBinanceOrderArgs = {
  id: Scalars['String'];
};


export type QuerySearchAssetsArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySearchAssetsForOrganizationArgs = {
  organizationId?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type QuoteApprovalInfo = {
  __typename?: 'QuoteApprovalInfo';
  address?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['String']>;
};

export type QuoteEstimate = {
  __typename?: 'QuoteEstimate';
  amountToReceive?: Maybe<Scalars['String']>;
  executionDurationSeconds?: Maybe<Scalars['Int']>;
  fromAmountUsd?: Maybe<Scalars['Float']>;
  gasCostsUsd?: Maybe<Scalars['Float']>;
  slippage?: Maybe<Scalars['Float']>;
  toAmountUsd?: Maybe<Scalars['Float']>;
};

export type Regex = {
  __typename?: 'Regex';
  address?: Maybe<Scalars['String']>;
};

export type SdkConfigField = {
  __typename?: 'SdkConfigField';
  assetId?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  mappedAssetId?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['String']>;
};

export type WalletConnectAppType = {
  __typename?: 'WalletConnectAppType';
  android?: Maybe<Scalars['String']>;
  browser?: Maybe<Scalars['String']>;
  ios?: Maybe<Scalars['String']>;
  linux?: Maybe<Scalars['String']>;
  mac?: Maybe<Scalars['String']>;
  windows?: Maybe<Scalars['String']>;
};

export type WalletConnectImageUrlType = {
  __typename?: 'WalletConnectImageURLType';
  lg?: Maybe<Scalars['String']>;
  md?: Maybe<Scalars['String']>;
  sm?: Maybe<Scalars['String']>;
};

export type WalletConnectMetadataColorsType = {
  __typename?: 'WalletConnectMetadataColorsType';
  primary?: Maybe<Scalars['String']>;
  secondary?: Maybe<Scalars['String']>;
};

export type WalletConnectMetadataType = {
  __typename?: 'WalletConnectMetadataType';
  colors?: Maybe<WalletConnectMetadataColorsType>;
  shortName?: Maybe<Scalars['String']>;
};

export type WalletConnectPlatformType = {
  __typename?: 'WalletConnectPlatformType';
  native?: Maybe<Scalars['String']>;
  universal?: Maybe<Scalars['String']>;
};

export type WalletConnectWallet = {
  __typename?: 'WalletConnectWallet';
  app?: Maybe<WalletConnectAppType>;
  app_type?: Maybe<Scalars['String']>;
  chains?: Maybe<Array<Maybe<Scalars['String']>>>;
  description?: Maybe<Scalars['String']>;
  desktop?: Maybe<WalletConnectPlatformType>;
  homepage?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image_id?: Maybe<Scalars['String']>;
  image_url?: Maybe<WalletConnectImageUrlType>;
  metadata?: Maybe<WalletConnectMetadataType>;
  mobile?: Maybe<WalletConnectPlatformType>;
  name?: Maybe<Scalars['String']>;
  sdks?: Maybe<Array<Maybe<Scalars['String']>>>;
  versions?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type WatchedAddress = {
  __typename?: 'WatchedAddress';
  address?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  confirmationsToWatch?: Maybe<Scalars['Int']>;
  created?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  memo?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  txAmount?: Maybe<Scalars['Int']>;
  txBlockHash?: Maybe<Scalars['String']>;
  txBlockHeight?: Maybe<Scalars['Int']>;
  txCreatedAt?: Maybe<Scalars['String']>;
  txFormattedAmount?: Maybe<Scalars['String']>;
  txId?: Maybe<Scalars['String']>;
  unsubscribed?: Maybe<Scalars['Boolean']>;
  updated?: Maybe<Scalars['String']>;
};

export type AssetFieldsFragment = { __typename?: 'Asset', address?: string | null, decimals?: number | null, id?: string | null, name?: string | null, networkCode?: string | null, symbol?: string | null, type?: string | null, config?: { __typename?: 'Config', mappedAssetId?: string | null } | null, networks?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null } | null> | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null };

export type NetworkFieldsFragment = { __typename?: 'Network', decimals?: number | null, name?: string | null, networkCode?: string | null, networkName?: string | null, symbol?: string | null, bridged?: boolean | null, identifiers?: { __typename?: 'Identifiers', chainId?: number | null } | null, links?: { __typename?: 'Links', explorer?: string | null } | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, regex?: { __typename?: 'Regex', address?: string | null } | null };

export type AddWatchedAddressMutationVariables = Exact<{
  address: Scalars['String'];
  assetId: Scalars['String'];
  confirmationsToWatch: Scalars['Int'];
  memo?: InputMaybe<Scalars['String']>;
}>;


export type AddWatchedAddressMutation = { __typename?: 'Mutation', addWatchedAddress?: string | null };

export type CreateBinanceOrderMutationVariables = Exact<{
  assetId: Scalars['String'];
  userId: Scalars['String'];
  orderAmount: Scalars['String'];
}>;


export type CreateBinanceOrderMutation = { __typename?: 'Mutation', createBinanceOrder?: { __typename?: 'CreateOrderResponse', checkoutUrl?: string | null, id?: string | null, qrContent?: string | null, universalUrl?: string | null } | null };

export type CreateBridgeQuoteMutationVariables = Exact<{
  amount: Scalars['String'];
  fromAddress: Scalars['String'];
  fromAssetId: Scalars['String'];
  toAddress: Scalars['String'];
  toAssetId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type CreateBridgeQuoteMutation = { __typename?: 'Mutation', prepareBridgeQuote?: { __typename?: 'BridgeQuote', aggregator?: string | null, id?: string | null, approval?: { __typename?: 'QuoteApprovalInfo', address?: string | null, amount?: string | null } | null, estimate?: { __typename?: 'QuoteEstimate', amountToReceive?: string | null, executionDurationSeconds?: number | null, fromAmountUsd?: number | null, gasCostsUsd?: number | null, slippage?: number | null, toAmountUsd?: number | null } | null, transaction?: { __typename?: 'BridgeTransactionRequest', to?: string | null, from?: string | null, gasLimit?: string | null, gasPrice?: string | null, data?: string | null, value?: string | null, chainId?: number | null } | null } | null };

export type RemoveWatchedAddressMutationVariables = Exact<{
  watchedAddressId: Scalars['ID'];
}>;


export type RemoveWatchedAddressMutation = { __typename?: 'Mutation', removeWatchedAddress?: string | null };

export type GetAssetByAddressAndNetworkCodeQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
}>;


export type GetAssetByAddressAndNetworkCodeQuery = { __typename?: 'Query', assetByAddressAndNetworkCodeForOrganization?: { __typename?: 'Asset', address?: string | null, decimals?: number | null, id?: string | null, name?: string | null, networkCode?: string | null, symbol?: string | null, type?: string | null, config?: { __typename?: 'Config', mappedAssetId?: string | null } | null, networks?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null } | null> | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null };

export type GetAssetByMappedAssetIdAndNetworkCodeQueryVariables = Exact<{
  mappedAssetId?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
}>;


export type GetAssetByMappedAssetIdAndNetworkCodeQuery = { __typename?: 'Query', assetByMappedAssetIdAndNetworkCode?: { __typename?: 'Asset', id?: string | null, address?: string | null } | null };

export type GetAssetPriceQueryVariables = Exact<{
  assetId?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetAssetPriceQuery = { __typename?: 'Query', assetPrice?: { __typename?: 'Price', price?: number | null } | null };

export type GetAssetsForOrgQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  currency?: InputMaybe<Scalars['String']>;
  address?: InputMaybe<Scalars['String']>;
  assetId?: InputMaybe<Scalars['ID']>;
}>;


export type GetAssetsForOrgQuery = { __typename?: 'Query', assetsForOrganization?: Array<{ __typename?: 'Asset', address?: string | null, decimals?: number | null, id?: string | null, name?: string | null, networkCode?: string | null, symbol?: string | null, type?: string | null, config?: { __typename?: 'Config', mappedAssetId?: string | null } | null, networks?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null } | null> | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };

export type GetMappedNetworksForAssetQueryVariables = Exact<{
  assetId?: InputMaybe<Scalars['String']>;
}>;


export type GetMappedNetworksForAssetQuery = { __typename?: 'Query', mappedNetworksForAssetByOrg?: Array<{ __typename?: 'Network', decimals?: number | null, name?: string | null, networkCode?: string | null, networkName?: string | null, symbol?: string | null, bridged?: boolean | null, identifiers?: { __typename?: 'Identifiers', chainId?: number | null } | null, links?: { __typename?: 'Links', explorer?: string | null } | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, regex?: { __typename?: 'Regex', address?: string | null } | null } | null> | null };

export type GetNetworkByChainIdQueryVariables = Exact<{
  chainId: Scalars['Int'];
}>;


export type GetNetworkByChainIdQuery = { __typename?: 'Query', networkByChainId?: { __typename?: 'Network', decimals?: number | null, name?: string | null, networkCode?: string | null, networkName?: string | null, symbol?: string | null, bridged?: boolean | null, identifiers?: { __typename?: 'Identifiers', chainId?: number | null } | null, links?: { __typename?: 'Links', explorer?: string | null } | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, regex?: { __typename?: 'Regex', address?: string | null } | null } | null };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks?: Array<{ __typename?: 'Network', decimals?: number | null, name?: string | null, networkCode?: string | null, networkName?: string | null, symbol?: string | null, bridged?: boolean | null, identifiers?: { __typename?: 'Identifiers', chainId?: number | null } | null, links?: { __typename?: 'Links', explorer?: string | null } | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, regex?: { __typename?: 'Regex', address?: string | null } | null } | null> | null };

export type GetOrganizationByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetOrganizationByIdQuery = { __typename?: 'Query', organizationById?: { __typename?: 'Organization', plan?: string | null } | null };

export type GetPaymentMethodsQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Int']>;
}>;


export type GetPaymentMethodsQuery = { __typename?: 'Query', methodsForNetwork?: Array<{ __typename?: 'PaymentMethod', name?: string | null, icon?: string | null, logo?: string | null, value?: string | null, flags?: { __typename?: 'PaymentMethodFlags', enabled?: boolean | null, memo?: boolean | null } | null, links?: { __typename?: 'ExtensionLinks', brave?: string | null, chrome?: string | null, edge?: string | null, firefox?: string | null, opera?: string | null } | null, walletConnect?: { __typename?: 'WalletConnectWallet', description?: string | null, chains?: Array<string | null> | null, app?: { __typename?: 'WalletConnectAppType', ios?: string | null, android?: string | null } | null, mobile?: { __typename?: 'WalletConnectPlatformType', native?: string | null, universal?: string | null } | null, desktop?: { __typename?: 'WalletConnectPlatformType', native?: string | null } | null } | null } | null> | null };

export type QueryBinanceOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type QueryBinanceOrderQuery = { __typename?: 'Query', queryBinanceOrder?: { __typename?: 'Map3Order', status?: Map3PlatformOrderStatus | null } | null };

export type SearchAssetsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchAssetsQuery = { __typename?: 'Query', searchAssetsForOrganization?: Array<{ __typename?: 'Asset', address?: string | null, decimals?: number | null, id?: string | null, name?: string | null, networkCode?: string | null, symbol?: string | null, type?: string | null, config?: { __typename?: 'Config', mappedAssetId?: string | null } | null, networks?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null } | null> | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };

export const AssetFieldsFragmentDoc = gql`
    fragment AssetFields on Asset {
  address
  decimals
  id
  name
  networkCode
  symbol
  type
  config {
    mappedAssetId
  }
  networks {
    name
    networkCode
  }
  logo {
    png
    svg
  }
}
    `;
export const NetworkFieldsFragmentDoc = gql`
    fragment NetworkFields on Network {
  decimals
  name
  networkCode
  networkName
  symbol
  bridged
  identifiers {
    chainId
  }
  links {
    explorer
  }
  logo {
    png
    svg
  }
  regex {
    address
  }
}
    `;
export const AddWatchedAddressDocument = gql`
    mutation AddWatchedAddress($address: String!, $assetId: String!, $confirmationsToWatch: Int!, $memo: String) {
  addWatchedAddress(
    address: $address
    assetId: $assetId
    confirmationsToWatch: $confirmationsToWatch
    memo: $memo
  )
}
    `;
export type AddWatchedAddressMutationFn = Apollo.MutationFunction<AddWatchedAddressMutation, AddWatchedAddressMutationVariables>;

/**
 * __useAddWatchedAddressMutation__
 *
 * To run a mutation, you first call `useAddWatchedAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddWatchedAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addWatchedAddressMutation, { data, loading, error }] = useAddWatchedAddressMutation({
 *   variables: {
 *      address: // value for 'address'
 *      assetId: // value for 'assetId'
 *      confirmationsToWatch: // value for 'confirmationsToWatch'
 *      memo: // value for 'memo'
 *   },
 * });
 */
export function useAddWatchedAddressMutation(baseOptions?: Apollo.MutationHookOptions<AddWatchedAddressMutation, AddWatchedAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddWatchedAddressMutation, AddWatchedAddressMutationVariables>(AddWatchedAddressDocument, options);
      }
export type AddWatchedAddressMutationHookResult = ReturnType<typeof useAddWatchedAddressMutation>;
export type AddWatchedAddressMutationResult = Apollo.MutationResult<AddWatchedAddressMutation>;
export type AddWatchedAddressMutationOptions = Apollo.BaseMutationOptions<AddWatchedAddressMutation, AddWatchedAddressMutationVariables>;
export const CreateBinanceOrderDocument = gql`
    mutation CreateBinanceOrder($assetId: String!, $userId: String!, $orderAmount: String!) {
  createBinanceOrder(
    assetId: $assetId
    userId: $userId
    orderAmount: $orderAmount
  ) {
    checkoutUrl
    id
    qrContent
    universalUrl
  }
}
    `;
export type CreateBinanceOrderMutationFn = Apollo.MutationFunction<CreateBinanceOrderMutation, CreateBinanceOrderMutationVariables>;

/**
 * __useCreateBinanceOrderMutation__
 *
 * To run a mutation, you first call `useCreateBinanceOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBinanceOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBinanceOrderMutation, { data, loading, error }] = useCreateBinanceOrderMutation({
 *   variables: {
 *      assetId: // value for 'assetId'
 *      userId: // value for 'userId'
 *      orderAmount: // value for 'orderAmount'
 *   },
 * });
 */
export function useCreateBinanceOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateBinanceOrderMutation, CreateBinanceOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBinanceOrderMutation, CreateBinanceOrderMutationVariables>(CreateBinanceOrderDocument, options);
      }
export type CreateBinanceOrderMutationHookResult = ReturnType<typeof useCreateBinanceOrderMutation>;
export type CreateBinanceOrderMutationResult = Apollo.MutationResult<CreateBinanceOrderMutation>;
export type CreateBinanceOrderMutationOptions = Apollo.BaseMutationOptions<CreateBinanceOrderMutation, CreateBinanceOrderMutationVariables>;
export const CreateBridgeQuoteDocument = gql`
    mutation CreateBridgeQuote($amount: String!, $fromAddress: String!, $fromAssetId: String!, $toAddress: String!, $toAssetId: String!, $userId: String!) {
  prepareBridgeQuote(
    amount: $amount
    fromAddress: $fromAddress
    fromAssetId: $fromAssetId
    toAddress: $toAddress
    toAssetId: $toAssetId
    userId: $userId
  ) {
    aggregator
    approval {
      address
      amount
    }
    estimate {
      amountToReceive
      executionDurationSeconds
      fromAmountUsd
      gasCostsUsd
      slippage
      toAmountUsd
    }
    id
    transaction {
      to
      from
      gasLimit
      gasPrice
      data
      value
      chainId
    }
  }
}
    `;
export type CreateBridgeQuoteMutationFn = Apollo.MutationFunction<CreateBridgeQuoteMutation, CreateBridgeQuoteMutationVariables>;

/**
 * __useCreateBridgeQuoteMutation__
 *
 * To run a mutation, you first call `useCreateBridgeQuoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBridgeQuoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBridgeQuoteMutation, { data, loading, error }] = useCreateBridgeQuoteMutation({
 *   variables: {
 *      amount: // value for 'amount'
 *      fromAddress: // value for 'fromAddress'
 *      fromAssetId: // value for 'fromAssetId'
 *      toAddress: // value for 'toAddress'
 *      toAssetId: // value for 'toAssetId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateBridgeQuoteMutation(baseOptions?: Apollo.MutationHookOptions<CreateBridgeQuoteMutation, CreateBridgeQuoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBridgeQuoteMutation, CreateBridgeQuoteMutationVariables>(CreateBridgeQuoteDocument, options);
      }
export type CreateBridgeQuoteMutationHookResult = ReturnType<typeof useCreateBridgeQuoteMutation>;
export type CreateBridgeQuoteMutationResult = Apollo.MutationResult<CreateBridgeQuoteMutation>;
export type CreateBridgeQuoteMutationOptions = Apollo.BaseMutationOptions<CreateBridgeQuoteMutation, CreateBridgeQuoteMutationVariables>;
export const RemoveWatchedAddressDocument = gql`
    mutation RemoveWatchedAddress($watchedAddressId: ID!) {
  removeWatchedAddress(watchedAddressId: $watchedAddressId)
}
    `;
export type RemoveWatchedAddressMutationFn = Apollo.MutationFunction<RemoveWatchedAddressMutation, RemoveWatchedAddressMutationVariables>;

/**
 * __useRemoveWatchedAddressMutation__
 *
 * To run a mutation, you first call `useRemoveWatchedAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveWatchedAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeWatchedAddressMutation, { data, loading, error }] = useRemoveWatchedAddressMutation({
 *   variables: {
 *      watchedAddressId: // value for 'watchedAddressId'
 *   },
 * });
 */
export function useRemoveWatchedAddressMutation(baseOptions?: Apollo.MutationHookOptions<RemoveWatchedAddressMutation, RemoveWatchedAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveWatchedAddressMutation, RemoveWatchedAddressMutationVariables>(RemoveWatchedAddressDocument, options);
      }
export type RemoveWatchedAddressMutationHookResult = ReturnType<typeof useRemoveWatchedAddressMutation>;
export type RemoveWatchedAddressMutationResult = Apollo.MutationResult<RemoveWatchedAddressMutation>;
export type RemoveWatchedAddressMutationOptions = Apollo.BaseMutationOptions<RemoveWatchedAddressMutation, RemoveWatchedAddressMutationVariables>;
export const GetAssetByAddressAndNetworkCodeDocument = gql`
    query GetAssetByAddressAndNetworkCode($address: String, $networkCode: String) {
  assetByAddressAndNetworkCodeForOrganization(
    address: $address
    networkCode: $networkCode
  ) {
    ...AssetFields
  }
}
    ${AssetFieldsFragmentDoc}`;

/**
 * __useGetAssetByAddressAndNetworkCodeQuery__
 *
 * To run a query within a React component, call `useGetAssetByAddressAndNetworkCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetByAddressAndNetworkCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetByAddressAndNetworkCodeQuery({
 *   variables: {
 *      address: // value for 'address'
 *      networkCode: // value for 'networkCode'
 *   },
 * });
 */
export function useGetAssetByAddressAndNetworkCodeQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetByAddressAndNetworkCodeQuery, GetAssetByAddressAndNetworkCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetByAddressAndNetworkCodeQuery, GetAssetByAddressAndNetworkCodeQueryVariables>(GetAssetByAddressAndNetworkCodeDocument, options);
      }
export function useGetAssetByAddressAndNetworkCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetByAddressAndNetworkCodeQuery, GetAssetByAddressAndNetworkCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetByAddressAndNetworkCodeQuery, GetAssetByAddressAndNetworkCodeQueryVariables>(GetAssetByAddressAndNetworkCodeDocument, options);
        }
export type GetAssetByAddressAndNetworkCodeQueryHookResult = ReturnType<typeof useGetAssetByAddressAndNetworkCodeQuery>;
export type GetAssetByAddressAndNetworkCodeLazyQueryHookResult = ReturnType<typeof useGetAssetByAddressAndNetworkCodeLazyQuery>;
export type GetAssetByAddressAndNetworkCodeQueryResult = Apollo.QueryResult<GetAssetByAddressAndNetworkCodeQuery, GetAssetByAddressAndNetworkCodeQueryVariables>;
export const GetAssetByMappedAssetIdAndNetworkCodeDocument = gql`
    query GetAssetByMappedAssetIdAndNetworkCode($mappedAssetId: String, $networkCode: String) {
  assetByMappedAssetIdAndNetworkCode(
    mappedAssetId: $mappedAssetId
    networkCode: $networkCode
  ) {
    id
    address
  }
}
    `;

/**
 * __useGetAssetByMappedAssetIdAndNetworkCodeQuery__
 *
 * To run a query within a React component, call `useGetAssetByMappedAssetIdAndNetworkCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetByMappedAssetIdAndNetworkCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetByMappedAssetIdAndNetworkCodeQuery({
 *   variables: {
 *      mappedAssetId: // value for 'mappedAssetId'
 *      networkCode: // value for 'networkCode'
 *   },
 * });
 */
export function useGetAssetByMappedAssetIdAndNetworkCodeQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetByMappedAssetIdAndNetworkCodeQuery, GetAssetByMappedAssetIdAndNetworkCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetByMappedAssetIdAndNetworkCodeQuery, GetAssetByMappedAssetIdAndNetworkCodeQueryVariables>(GetAssetByMappedAssetIdAndNetworkCodeDocument, options);
      }
export function useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetByMappedAssetIdAndNetworkCodeQuery, GetAssetByMappedAssetIdAndNetworkCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetByMappedAssetIdAndNetworkCodeQuery, GetAssetByMappedAssetIdAndNetworkCodeQueryVariables>(GetAssetByMappedAssetIdAndNetworkCodeDocument, options);
        }
export type GetAssetByMappedAssetIdAndNetworkCodeQueryHookResult = ReturnType<typeof useGetAssetByMappedAssetIdAndNetworkCodeQuery>;
export type GetAssetByMappedAssetIdAndNetworkCodeLazyQueryHookResult = ReturnType<typeof useGetAssetByMappedAssetIdAndNetworkCodeLazyQuery>;
export type GetAssetByMappedAssetIdAndNetworkCodeQueryResult = Apollo.QueryResult<GetAssetByMappedAssetIdAndNetworkCodeQuery, GetAssetByMappedAssetIdAndNetworkCodeQueryVariables>;
export const GetAssetPriceDocument = gql`
    query GetAssetPrice($assetId: String, $currency: String) {
  assetPrice(assetId: $assetId, currency: $currency) {
    price
  }
}
    `;

/**
 * __useGetAssetPriceQuery__
 *
 * To run a query within a React component, call `useGetAssetPriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetPriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetPriceQuery({
 *   variables: {
 *      assetId: // value for 'assetId'
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useGetAssetPriceQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetPriceQuery, GetAssetPriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetPriceQuery, GetAssetPriceQueryVariables>(GetAssetPriceDocument, options);
      }
export function useGetAssetPriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetPriceQuery, GetAssetPriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetPriceQuery, GetAssetPriceQueryVariables>(GetAssetPriceDocument, options);
        }
export type GetAssetPriceQueryHookResult = ReturnType<typeof useGetAssetPriceQuery>;
export type GetAssetPriceLazyQueryHookResult = ReturnType<typeof useGetAssetPriceLazyQuery>;
export type GetAssetPriceQueryResult = Apollo.QueryResult<GetAssetPriceQuery, GetAssetPriceQueryVariables>;
export const GetAssetsForOrgDocument = gql`
    query GetAssetsForOrg($limit: Int, $offset: Int, $currency: String, $address: String, $assetId: ID) {
  assetsForOrganization(
    limit: $limit
    offset: $offset
    currency: $currency
    address: $address
    assetId: $assetId
  ) {
    ...AssetFields
  }
}
    ${AssetFieldsFragmentDoc}`;

/**
 * __useGetAssetsForOrgQuery__
 *
 * To run a query within a React component, call `useGetAssetsForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAssetsForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAssetsForOrgQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      currency: // value for 'currency'
 *      address: // value for 'address'
 *      assetId: // value for 'assetId'
 *   },
 * });
 */
export function useGetAssetsForOrgQuery(baseOptions?: Apollo.QueryHookOptions<GetAssetsForOrgQuery, GetAssetsForOrgQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAssetsForOrgQuery, GetAssetsForOrgQueryVariables>(GetAssetsForOrgDocument, options);
      }
export function useGetAssetsForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAssetsForOrgQuery, GetAssetsForOrgQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAssetsForOrgQuery, GetAssetsForOrgQueryVariables>(GetAssetsForOrgDocument, options);
        }
export type GetAssetsForOrgQueryHookResult = ReturnType<typeof useGetAssetsForOrgQuery>;
export type GetAssetsForOrgLazyQueryHookResult = ReturnType<typeof useGetAssetsForOrgLazyQuery>;
export type GetAssetsForOrgQueryResult = Apollo.QueryResult<GetAssetsForOrgQuery, GetAssetsForOrgQueryVariables>;
export const GetMappedNetworksForAssetDocument = gql`
    query GetMappedNetworksForAsset($assetId: String) {
  mappedNetworksForAssetByOrg(assetId: $assetId) {
    ...NetworkFields
  }
}
    ${NetworkFieldsFragmentDoc}`;

/**
 * __useGetMappedNetworksForAssetQuery__
 *
 * To run a query within a React component, call `useGetMappedNetworksForAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMappedNetworksForAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMappedNetworksForAssetQuery({
 *   variables: {
 *      assetId: // value for 'assetId'
 *   },
 * });
 */
export function useGetMappedNetworksForAssetQuery(baseOptions?: Apollo.QueryHookOptions<GetMappedNetworksForAssetQuery, GetMappedNetworksForAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMappedNetworksForAssetQuery, GetMappedNetworksForAssetQueryVariables>(GetMappedNetworksForAssetDocument, options);
      }
export function useGetMappedNetworksForAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMappedNetworksForAssetQuery, GetMappedNetworksForAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMappedNetworksForAssetQuery, GetMappedNetworksForAssetQueryVariables>(GetMappedNetworksForAssetDocument, options);
        }
export type GetMappedNetworksForAssetQueryHookResult = ReturnType<typeof useGetMappedNetworksForAssetQuery>;
export type GetMappedNetworksForAssetLazyQueryHookResult = ReturnType<typeof useGetMappedNetworksForAssetLazyQuery>;
export type GetMappedNetworksForAssetQueryResult = Apollo.QueryResult<GetMappedNetworksForAssetQuery, GetMappedNetworksForAssetQueryVariables>;
export const GetNetworkByChainIdDocument = gql`
    query GetNetworkByChainId($chainId: Int!) {
  networkByChainId(chainId: $chainId) {
    ...NetworkFields
  }
}
    ${NetworkFieldsFragmentDoc}`;

/**
 * __useGetNetworkByChainIdQuery__
 *
 * To run a query within a React component, call `useGetNetworkByChainIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworkByChainIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworkByChainIdQuery({
 *   variables: {
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useGetNetworkByChainIdQuery(baseOptions: Apollo.QueryHookOptions<GetNetworkByChainIdQuery, GetNetworkByChainIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetworkByChainIdQuery, GetNetworkByChainIdQueryVariables>(GetNetworkByChainIdDocument, options);
      }
export function useGetNetworkByChainIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworkByChainIdQuery, GetNetworkByChainIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetworkByChainIdQuery, GetNetworkByChainIdQueryVariables>(GetNetworkByChainIdDocument, options);
        }
export type GetNetworkByChainIdQueryHookResult = ReturnType<typeof useGetNetworkByChainIdQuery>;
export type GetNetworkByChainIdLazyQueryHookResult = ReturnType<typeof useGetNetworkByChainIdLazyQuery>;
export type GetNetworkByChainIdQueryResult = Apollo.QueryResult<GetNetworkByChainIdQuery, GetNetworkByChainIdQueryVariables>;
export const GetNetworksDocument = gql`
    query GetNetworks {
  networks {
    ...NetworkFields
  }
}
    ${NetworkFieldsFragmentDoc}`;

/**
 * __useGetNetworksQuery__
 *
 * To run a query within a React component, call `useGetNetworksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworksQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetNetworksQuery(baseOptions?: Apollo.QueryHookOptions<GetNetworksQuery, GetNetworksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetworksQuery, GetNetworksQueryVariables>(GetNetworksDocument, options);
      }
export function useGetNetworksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworksQuery, GetNetworksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetworksQuery, GetNetworksQueryVariables>(GetNetworksDocument, options);
        }
export type GetNetworksQueryHookResult = ReturnType<typeof useGetNetworksQuery>;
export type GetNetworksLazyQueryHookResult = ReturnType<typeof useGetNetworksLazyQuery>;
export type GetNetworksQueryResult = Apollo.QueryResult<GetNetworksQuery, GetNetworksQueryVariables>;
export const GetOrganizationByIdDocument = gql`
    query GetOrganizationById($id: ID!) {
  organizationById(id: $id) {
    plan
  }
}
    `;

/**
 * __useGetOrganizationByIdQuery__
 *
 * To run a query within a React component, call `useGetOrganizationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOrganizationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOrganizationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOrganizationByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>(GetOrganizationByIdDocument, options);
      }
export function useGetOrganizationByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>(GetOrganizationByIdDocument, options);
        }
export type GetOrganizationByIdQueryHookResult = ReturnType<typeof useGetOrganizationByIdQuery>;
export type GetOrganizationByIdLazyQueryHookResult = ReturnType<typeof useGetOrganizationByIdLazyQuery>;
export type GetOrganizationByIdQueryResult = Apollo.QueryResult<GetOrganizationByIdQuery, GetOrganizationByIdQueryVariables>;
export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods($chainId: Int) {
  methodsForNetwork(chainId: $chainId) {
    name
    icon
    logo
    value
    flags {
      enabled
      memo
    }
    links {
      brave
      chrome
      edge
      firefox
      opera
    }
    walletConnect {
      description
      chains
      app {
        ios
        android
      }
      mobile {
        native
        universal
      }
      desktop {
        native
      }
    }
  }
}
    `;

/**
 * __useGetPaymentMethodsQuery__
 *
 * To run a query within a React component, call `useGetPaymentMethodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentMethodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPaymentMethodsQuery({
 *   variables: {
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useGetPaymentMethodsQuery(baseOptions?: Apollo.QueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options);
      }
export function useGetPaymentMethodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>(GetPaymentMethodsDocument, options);
        }
export type GetPaymentMethodsQueryHookResult = ReturnType<typeof useGetPaymentMethodsQuery>;
export type GetPaymentMethodsLazyQueryHookResult = ReturnType<typeof useGetPaymentMethodsLazyQuery>;
export type GetPaymentMethodsQueryResult = Apollo.QueryResult<GetPaymentMethodsQuery, GetPaymentMethodsQueryVariables>;
export const QueryBinanceOrderDocument = gql`
    query queryBinanceOrder($id: String!) {
  queryBinanceOrder(id: $id) {
    status
  }
}
    `;

/**
 * __useQueryBinanceOrderQuery__
 *
 * To run a query within a React component, call `useQueryBinanceOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryBinanceOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryBinanceOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryBinanceOrderQuery(baseOptions: Apollo.QueryHookOptions<QueryBinanceOrderQuery, QueryBinanceOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryBinanceOrderQuery, QueryBinanceOrderQueryVariables>(QueryBinanceOrderDocument, options);
      }
export function useQueryBinanceOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryBinanceOrderQuery, QueryBinanceOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryBinanceOrderQuery, QueryBinanceOrderQueryVariables>(QueryBinanceOrderDocument, options);
        }
export type QueryBinanceOrderQueryHookResult = ReturnType<typeof useQueryBinanceOrderQuery>;
export type QueryBinanceOrderLazyQueryHookResult = ReturnType<typeof useQueryBinanceOrderLazyQuery>;
export type QueryBinanceOrderQueryResult = Apollo.QueryResult<QueryBinanceOrderQuery, QueryBinanceOrderQueryVariables>;
export const SearchAssetsDocument = gql`
    query SearchAssets($query: String) {
  searchAssetsForOrganization(query: $query) {
    ...AssetFields
  }
}
    ${AssetFieldsFragmentDoc}`;

/**
 * __useSearchAssetsQuery__
 *
 * To run a query within a React component, call `useSearchAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAssetsQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useSearchAssetsQuery(baseOptions?: Apollo.QueryHookOptions<SearchAssetsQuery, SearchAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAssetsQuery, SearchAssetsQueryVariables>(SearchAssetsDocument, options);
      }
export function useSearchAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAssetsQuery, SearchAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAssetsQuery, SearchAssetsQueryVariables>(SearchAssetsDocument, options);
        }
export type SearchAssetsQueryHookResult = ReturnType<typeof useSearchAssetsQuery>;
export type SearchAssetsLazyQueryHookResult = ReturnType<typeof useSearchAssetsLazyQuery>;
export type SearchAssetsQueryResult = Apollo.QueryResult<SearchAssetsQuery, SearchAssetsQueryVariables>;