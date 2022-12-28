import { BigNumber, ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';

import { Context } from '../providers/Store';

export const useMaxLimit = () => {
  const [state] = useContext(Context);
  const [maxLimit, setMaxLimit] = useState<string>('0');
  const [maxLimitRaw, setMaxLimitRaw] = useState<BigNumber>(BigNumber.from(0));
  const [maxLimitFormatted, setMaxLimitFormatted] = useState<string>('0');

  useEffect(() => {
    if (state.balance?.status !== 'success') return;
    if (!state.balance.data) return;

    const run = async () => {
      const { assetBalance, chainBalance } = state.balance.data!;
      try {
        const feeData = await state.provider?.data?.getFeeData();

        let max: BigNumber | undefined;
        let maxLimitRaw: BigNumber | undefined;
        if (state.asset?.type === 'asset') {
          max = assetBalance;
          maxLimitRaw = max?.gt(0) ? max : BigNumber.from(0);
        } else {
          // MEMO!!!!!!!!
          const gasLimitWei = ethers.utils.parseUnits('21000', 'wei');
          const feeWei = feeData?.maxFeePerGas?.mul(gasLimitWei) || 0;
          max = chainBalance.sub(feeWei);
          maxLimitRaw = max?.gt(0) ? max : BigNumber.from(0);
        }

        setMaxLimitRaw(maxLimitRaw);
        setMaxLimit(maxLimitRaw.toString());
        setMaxLimitFormatted(
          ethers.utils.formatUnits(
            maxLimitRaw.toString(),
            state.asset?.decimals || 'ether'
          )
        );
      } catch (e) {
        console.log(e);
      }
    };

    run();
  }, [
    state.balance.data?.assetBalance,
    state.balance.data?.chainBalance,
    state.provider?.data,
  ]);

  return { maxLimit, maxLimitFormatted, maxLimitRaw };
};
