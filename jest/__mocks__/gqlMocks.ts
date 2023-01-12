import { MockedResponse } from '@apollo/client/testing';

import { getAssetByMappedAssetIdAndNetworkCodeMock } from './asset';
import { getAssetsForOrgMock, searchAssetsMock } from './assets';
import {
  getMappedNetworksForOrgMock,
  getNetworkByChainIdMock,
  getNetworksMock,
} from './networks';
import { getMethodsMock } from './payment-methods';

export const mocks: MockedResponse[] = [
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ currency: undefined, limit: 10, offset: 0 }),
  getAssetsForOrgMock({ assetId: 'satoshi123' }),
  getAssetsForOrgMock({
    address: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
  }),
  getAssetsForOrgMock({}),
  getAssetByMappedAssetIdAndNetworkCodeMock({
    mappedAssetId: 'elon123',
    networkCode: 'ethereum',
  }),
  getAssetByMappedAssetIdAndNetworkCodeMock({
    mappedAssetId: 'elon123',
    networkCode: 'polygon',
  }),
  searchAssetsMock(),
  getMappedNetworksForOrgMock({ assetId: 'elon123' }),
  getMappedNetworksForOrgMock({ assetId: 'satoshi123' }),
  getNetworkByChainIdMock(1),
  getNetworkByChainIdMock(137),
  getNetworksMock(),
  getMethodsMock({ chainId: null }),
  getMethodsMock({ chainId: 1 }),
  getMethodsMock({ chainId: 137 }),
];
