import {
  CreateBinanceOrderDocument,
  CreateBinanceOrderMutationVariables,
} from '../../../src/generated/apollo-gql';

export const createBinanceOrderMock = (
  variables: CreateBinanceOrderMutationVariables
) => ({
  request: {
    query: CreateBinanceOrderDocument,
    variables,
  },
  result: {
    data: {
      __typename: 'Query',
      createBinanceOrder: {
        __typename: 'BinanceOrder',
        checkoutUrl: 'https://www.binance.com/en/checkout/1',
        id: '1',
        qrContent: 'https://www.binance.com/en/checkout/1',
        universalUrl: 'https://www.binance.com/en/checkout/1',
      },
    },
  },
});
