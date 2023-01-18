import { MockedResponse } from '@apollo/client/testing';

import { addWatchedAddressMock } from './add-watched-address';
import { getAssetByMappedAssetIdAndNetworkCodeMock } from './asset';
import {
  getAssetByAddressAndNetworkCodeMock,
  getAssetsForOrgMock,
  searchAssetsMock,
} from './assets';
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
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
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
  getAssetByAddressAndNetworkCodeMock({
    address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    networkCode: 'ethereum',
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
