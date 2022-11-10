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
  id?: Maybe<Scalars['String']>;
  logo?: Maybe<Logo>;
  name?: Maybe<Scalars['String']>;
  networkCode?: Maybe<Scalars['String']>;
  networks?: Maybe<Array<Maybe<Network>>>;
  symbol?: Maybe<Scalars['String']>;
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
};

export type Query = {
  __typename?: 'Query';
  assetByAddressAndNetworkCode?: Maybe<Asset>;
  assetById?: Maybe<Asset>;
  assets?: Maybe<Array<Maybe<Asset>>>;
  assetsCount?: Maybe<Scalars['Int']>;
  assetsForOrganization?: Maybe<Array<Maybe<Asset>>>;
  methods?: Maybe<Array<Maybe<PaymentMethod>>>;
  networkByCode?: Maybe<Network>;
  networks?: Maybe<Array<Maybe<Network>>>;
  networksCount?: Maybe<Scalars['Int']>;
  organizationById?: Maybe<Organization>;
  sdkConfigForOrganization?: Maybe<Array<Maybe<SdkConfigField>>>;
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
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  organizationId?: InputMaybe<Scalars['String']>;
};


export type QueryNetworkByCodeArgs = {
  code?: InputMaybe<Scalars['String']>;
};


export type QueryNetworksArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryOrganizationByIdArgs = {
  id: Scalars['ID'];
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

export type GetAssetsForOrgQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type GetAssetsForOrgQuery = { __typename?: 'Query', assetsForOrganization?: Array<{ __typename?: 'Asset', name?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };

export type GetNetworksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetNetworksQuery = { __typename?: 'Query', networks?: Array<{ __typename?: 'Network', name?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };

export type GetPaymentMethodsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPaymentMethodsQuery = { __typename?: 'Query', methods?: Array<{ __typename?: 'PaymentMethod', name?: string | null, icon?: string | null, logo?: string | null, value?: string | null, enabled?: boolean | null } | null> | null };

export type SearchAssetsQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']>;
}>;


export type SearchAssetsQuery = { __typename?: 'Query', searchAssetsForOrganization?: Array<{ __typename?: 'Asset', name?: string | null, symbol?: string | null, logo?: { __typename?: 'Logo', png?: string | null, svg?: string | null } | null } | null> | null };


export const GetAssetsForOrgDocument = gql`
    query GetAssetsForOrg($limit: Int, $offset: Int) {
  assetsForOrganization(limit: $limit, offset: $offset) {
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
export const GetPaymentMethodsDocument = gql`
    query GetPaymentMethods {
  methods {
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