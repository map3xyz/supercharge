import { ethers } from 'ethers';

import { erc20Abi } from '../../abis/erc20';

export type PrebuiltTx = {
  data: string;
  from: string;
  to: string;
  value: string;
};

export const buildTx = (params: {
  address: string;
  amount: string;
  assetContract?: string | null;
  decimals: number;
  from: string;
  memo?: string | null;
}): PrebuiltTx => {
  const { address, amount, assetContract, decimals, from, memo } = params;
  const txParams = {
    data: memo || '0x',
    from,
    to: address,
    value: ethers.utils.parseEther(amount).toHexString(),
  };

  if (assetContract) {
    txParams.data =
      new ethers.utils.Interface(erc20Abi).encodeFunctionData('transfer', [
        address,
        ethers.utils.parseUnits(amount, decimals).toString(),
      ]) + (typeof memo === 'string' ? (memo as string).replace('0x', '') : '');

    txParams.to = assetContract;
    txParams.value = '0x0';
  }

  return txParams;
};
