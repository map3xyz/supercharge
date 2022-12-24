import { MockedResponse } from '@apollo/client/testing';

import { getAssetByMappedAssetIdAndNetworkCodeMock } from './asset';
import { getAssetsForOrgMock, searchAssetsMock } from './assets';
import { getMappedNetworksForOrgMock, getNetworksMock } from './networks';
import { getMethodsMock } from './payment-methods';

export const mocks: MockedResponse[] = [
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ assetId: 'satoshi123' }),
  getAssetsForOrgMock({ address: '0x123ElonAddress' }),
  getAssetsForOrgMock({}),
  getAssetByMappedAssetIdAndNetworkCodeMock({
    mappedAssetId: 'elon123',
    networkCode: 'ethereum',
  }),
  searchAssetsMock(),
  getMappedNetworksForOrgMock({ assetId: 'elon123' }),
  getMappedNetworksForOrgMock({ assetId: 'satoshi123' }),
  getNetworksMock(),
  getMethodsMock({ chainId: null }),
  getMethodsMock({ chainId: 1 }),
];
