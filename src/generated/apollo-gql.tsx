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

export type Asset = IAsset & {
  __typename?: 'Asset';
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  symbol?: Maybe<Scalars['String']>;
};

export type AssetWithPrice = IAsset & {
  __typename?: 'AssetWithPrice';
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  price?: Maybe<Price>;
  symbol?: Maybe<Scalars['String']>;
};

export type IAsset = {
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  symbol?: Maybe<Scalars['String']>;
};

export type Identifiers = {
  __typename?: 'Identifiers';
  chainId?: Maybe<Scalars['Int']>;
};

export type Logo = {
  __typename?: 'Logo';
  png?: Maybe<Scalars['String']>;
  svg?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrganization?: Maybe<Organization>;
  createSdkConfigForOrganization?: Maybe<SdkConfigField>;
  updateSdkConfigForOrganization?: Maybe<SdkConfigField>;
};


export type MutationCreateOrganizationArgs = {
  name: Scalars['String'];
};


export type MutationCreateSdkConfigForOrganizationArgs = {
  assetId: Scalars['ID'];
  networkCode: Scalars['String'];
};


export type MutationUpdateSdkConfigForOrganizationArgs = {
  assetId: Scalars['ID'];
  enabled: Scalars['Boolean'];
  networkCode: Scalars['String'];
};

export type Network = {
  __typename?: 'Network';
  address?: Maybe<Scalars['String']>;
  identifiers?: Maybe<Identifiers>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
};

export type Organization = {
  __typename?: 'Organization';
  created?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Int']>;
};

export type PaymentMethod = {
  __typename?: 'PaymentMethod';
  enabled?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  walletConnect?: Maybe<WalletConnect>;
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
  assetById?: Maybe<Asset>;
  assets?: Maybe<Array<Maybe<Asset>>>;
  assetsCount?: Maybe<Scalars['Int']>;
  assetsForOrganization?: Maybe<Array<Maybe<AssetWithPrice>>>;
  methods?: Maybe<Array<Maybe<PaymentMethod>>>;
  methodsForNetwork?: Maybe<Array<Maybe<PaymentMethod>>>;
  networkByCode?: Maybe<Network>;
  networks?: Maybe<Array<Maybe<Network>>>;
  networksCount?: Maybe<Scalars['Int']>;
  networksForAssetByOrg?: Maybe<Array<Maybe<Network>>>;
  organizationById?: Maybe<Organization>;
  sdkConfigForOrganization?: Maybe<Array<Maybe<SdkConfigField>>>;
  searchAssets?: Maybe<Array<Maybe<Asset>>>;
  searchAssetsForOrganization?: Maybe<Array<Maybe<Asset>>>;
};


export type QueryAssetByAddressAndNetworkCodeArgs = {
  address?: InputMaybe<Scalars['String']>;
  networkCode?: InputMaybe<Scalars['String']>;
};


export type QueryAssetByIdArgs = {
  id?: InputMaybe<Scalars['String']>;
};


export type QueryAssetsArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryAssetsForOrganizationArgs = {
  currency?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryMethodsForNetworkArgs = {
  chainId?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworkByCodeArgs = {
  code?: InputMaybe<Scalars['String']>;
};


export type QueryNetworksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryNetworksForAssetByOrgArgs = {
  assetId?: InputMaybe<Scalars['String']>;
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySearchAssetsArgs = {
  query?: InputMaybe<Scalars['String']>;
};


export type QuerySearchAssetsForOrganizationArgs = {
  organizationId?: InputMaybe<Scalars['String']>;
  query?: InputMaybe<Scalars['String']>;
};

export type SdkConfigField = {
  __typename?: 'SdkConfigField';
  assetId?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['Int']>;
  enabled?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  networkCode?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['Int']>;
};

export type WalletConnect = {
  __typename?: 'WalletConnect';
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

export type GetAssetsForOrgQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  currency?: InputMaybe<Scalars['String']>;
}>;


export type GetAssetsForOrgQuery = { __typename?: 'Query', assetsForOrganization?: Array<{ __typename?: 'AssetWithPrice', id?: string | null, name?: string | null, networkCode?: string | null, symbol?: string | null, networks?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null } | null> | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, price?: { __typename?: 'Price', price?: number | null } | null } | null> | null };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks?: Array<{ __typename?: 'Network', name?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };

export type GetNetworksForAssetQueryVariables = Exact<{
  assetId?: InputMaybe<Scalars['String']>;
}>;


export type GetNetworksForAssetQuery = { __typename?: 'Query', networksForAssetByOrg?: Array<{ __typename?: 'Network', name?: string | null, networkCode?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null, identifiers?: { __typename?: 'Identifiers', chainId?: number | null } | null } | null> | null };

export type GetPaymentMethodsQueryVariables = Exact<{
  chainId?: InputMaybe<Scalars['Int']>;
}>;


export type GetPaymentMethodsQuery = { __typename?: 'Query', methodsForNetwork?: Array<{ __typename?: 'PaymentMethod', name?: string | null, icon?: string | null, logo?: string | null, value?: string | null, enabled?: boolean | null } | null> | null };

export type SearchAssetsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchAssetsQuery = { __typename?: 'Query', searchAssetsForOrganization?: Array<{ __typename?: 'Asset', name?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };


export const GetAssetsForOrgDocument = gql`
    query GetAssetsForOrg($limit: Int, $offset: Int, $currency: String) {
  assetsForOrganization(limit: $limit, offset: $offset, currency: $currency) {
    id
    name
    networkCode
    networks {
      name
      networkCode
    }
    logo {
      png
      svg
    }
    symbol
    price {
      price
    }
  }
}
    `;

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
export const GetNetworksDocument = gql`
    query GetNetworks {
  networks {
    name
    logo {
      png
      svg
    }
    symbol
  }
}
    `;

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
export const GetNetworksForAssetDocument = gql`
    query GetNetworksForAsset($assetId: String) {
  networksForAssetByOrg(assetId: $assetId) {
    name
    networkCode
    logo {
      png
      svg
    }
    identifiers {
      chainId
    }
    symbol
  }
}
    `;

/**
 * __useGetNetworksForAssetQuery__
 *
 * To run a query within a React component, call `useGetNetworksForAssetQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNetworksForAssetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNetworksForAssetQuery({
 *   variables: {
 *      assetId: // value for 'assetId'
 *   },
 * });
 */
export function useGetNetworksForAssetQuery(baseOptions?: Apollo.QueryHookOptions<GetNetworksForAssetQuery, GetNetworksForAssetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNetworksForAssetQuery, GetNetworksForAssetQueryVariables>(GetNetworksForAssetDocument, options);
      }
export function useGetNetworksForAssetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNetworksForAssetQuery, GetNetworksForAssetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNetworksForAssetQuery, GetNetworksForAssetQueryVariables>(GetNetworksForAssetDocument, options);
        }
export type GetNetworksForAssetQueryHookResult = ReturnType<typeof useGetNetworksForAssetQuery>;
export type GetNetworksForAssetLazyQueryHookResult = ReturnType<typeof useGetNetworksForAssetLazyQuery>;
export type GetNetworksForAssetQueryResult = Apollo.QueryResult<GetNetworksForAssetQuery, GetNetworksForAssetQueryVariables>;
export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods($chainId: Int) {
  methodsForNetwork(chainId: $chainId) {
    name
    icon
    logo
    value
    enabled
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
export const SearchAssetsDocument = gql`
    query SearchAssets($query: String) {
  searchAssetsForOrganization(query: $query) {
    name
    logo {
      png
      svg
    }
    symbol
  }
}
    `;

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