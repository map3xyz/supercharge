import { AddWatchedAddressDocument } from '../../../src/generated/apollo-gql';

export const addWatchedAddressMock = (variables: {
  address: string;
  assetId: string;
  confirmationsToWatch: number;
}) => ({
  request: {
    query: AddWatchedAddressDocument,
    variables,
  },
  result: {
    __typename: 'Query',
    data: {
      addWatchedAddress: '0x0000000000000000000000000000000000000000',
    },
  },
});
