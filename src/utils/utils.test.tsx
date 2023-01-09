import { toHex } from './toHex';

describe('toHex', () => {
  it('should convert a number to hex', () => {
    expect(toHex(0)).toEqual('0x0');
    expect(toHex(1)).toEqual('0x1');
    expect(toHex(10)).toEqual('0xa');
    expect(toHex(15)).toEqual('0xf');
    expect(toHex(16)).toEqual('0x10');
    expect(toHex(255)).toEqual('0xff');
    expect(toHex(256)).toEqual('0x100');
    expect(toHex(21_000)).toEqual('0x5208');
    expect(toHex(1_000_000)).toEqual('0xf4240');
  });
});
