import { MockedResponse } from '@apollo/client/testing';

import { addWatchedAddressMock } from './add-watched-address';
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
  addWatchedAddressMock({
    address: '0x0000000000000000000000000000000000000000',
    assetId: 'satoshi123',
    confirmationsToWatch: 3,
  }),
  getMappedNetworksForOrgMock({ assetId: 'elon123' }),
  getMappedNetworksForOrgMock({ assetId: 'satoshi123' }),
  getMappedNetworksForOrgMock({ assetId: 'ethereum123' }),
  getNetworkByChainIdMock(1),
  getNetworkByChainIdMock(137),
  getNetworksMock(),
  getMethodsMock({ chainId: null }),
  getMethodsMock({ chainId: 1 }),
  getMethodsMock({ chainId: 137 }),
];
