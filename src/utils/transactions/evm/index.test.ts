import { buildTx } from './index';

describe('EVM transactions', () => {
  describe('buildTx', () => {
    it('builds a transaction', () => {
      const result = buildTx({
        address: '0x123',
        amount: '1',
        assetContract: null,
        decimals: 18,
        from: '0x456',
        memo: '0x678',
      });
      expect(result).toEqual({
        data: '0x678',
        from: '0x456',
        to: '0x123',
        value: '0x0de0b6b3a7640000',
      });
    });
    it('builds erc20 transaction', () => {
      const result = buildTx({
        address: '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf',
        amount: '1',
        assetContract: '0xabc',
        decimals: 18,
        from: '0x456',
        memo: '0x678',
      });
      expect(result).toEqual({
        data: '0xa9059cbb000000000000000000000000f61b443a155b07d2b2caea2d99715dc84e839eef0000000000000000000000000000000000000000000000000de0b6b3a7640000678',
        from: '0x456',
        to: '0xabc',
        value: '0x0',
      });
    });
  });
});
