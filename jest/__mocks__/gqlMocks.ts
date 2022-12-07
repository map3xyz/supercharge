import { MockedResponse } from '@apollo/client/testing';

import { getAssetsForOrgMock, searchAssetsMock } from './assets';
import { getMethodsMock } from './methods';
import { getMappedNetworksForOrgMock, getNetworksMock } from './networks';

export const mocks: MockedResponse[] = [
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ assetId: 'satoshi123' }),
  getAssetsForOrgMock({ address: '0x123ElonAddress' }),
  getAssetsForOrgMock({}),
  searchAssetsMock(),
  getMappedNetworksForOrgMock({ assetId: 'elon123' }),
  getMappedNetworksForOrgMock({ assetId: 'satoshi123' }),
  getNetworksMock(),
  getMethodsMock({ chainId: null }),
  getMethodsMock({ chainId: 1 }),
];
