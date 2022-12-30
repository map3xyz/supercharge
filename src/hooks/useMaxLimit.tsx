import { BigNumber, ethers } from 'ethers';
import { useContext, useEffect, useState } from 'react';
import { fromWei } from 'web3-utils';

import { ERC20_GAS_LIMIT, GAS_LIMIT } from '../constants';
import { Context } from '../providers/Store';

export const useMaxLimit = () => {
  const [state, dispatch] = useContext(Context);
  const [maxLimit, setMaxLimit] = useState<string>('0');
  const [maxLimitRaw, setMaxLimitRaw] = useState<BigNumber>(BigNumber.from(0));
  const [maxLimitFormatted, setMaxLimitFormatted] = useState<string>('0');
  const [feeError, setFeeError] = useState<boolean>(false);

  useEffect(() => {
    dispatch({ type: 'SET_MAX_LIMIT_LOADING' });
    if (state.balance?.status !== 'success') return;
    if (!state.provider?.data) return;
    if (!state.balance.data) return;

    const run = async () => {
      const { assetBalance, chainBalance } = state.balance.data!;
      try {
        const feeData = await state.provider?.data?.getFeeData();
        if (!feeData) {
          throw new Error('Unable to get gas price.');
        }

        let max: BigNumber | undefined;
        let maxLimitRaw: BigNumber | undefined;
        let gasLimit =
          state.asset?.type === 'asset' ? GAS_LIMIT : ERC20_GAS_LIMIT;

        const gasPriceGwei = fromWei(
          feeData?.gasPrice!.add(feeData.maxFeePerGas!).toString(),
          'gwei'
        );
        const feeGwei = (parseFloat(gasPriceGwei) * gasLimit).toFixed(0);
        const feeWei = ethers.utils.parseUnits(feeGwei, 'gwei');

        if (state.asset?.type === 'asset') {
          max = assetBalance;
          maxLimitRaw = max?.gt(0) ? max : BigNumber.from(0);
        } else {
          max = chainBalance.sub(feeWei);
          maxLimitRaw = max?.gt(0) ? max : BigNumber.from(0);
        }

        let maxLimitFormatted = ethers.utils.formatUnits(
          maxLimitRaw.toString(),
          state.asset?.decimals || 'ether'
        );

        if (maxLimitFormatted.split('.')[1] === '0') {
          maxLimitFormatted = maxLimitFormatted.split('.')[0];
        }

        setMaxLimitRaw(maxLimitRaw);
        setMaxLimit(maxLimitRaw.toString());
        setMaxLimitFormatted(maxLimitFormatted);
        setFeeError(chainBalance.sub(feeWei).lte(0));
        dispatch({ payload: maxLimitFormatted, type: 'SET_MAX_LIMIT_SUCCESS' });
      } catch (e: any) {
        dispatch({ payload: e.message, type: 'SET_MAX_LIMIT_ERROR' });
        console.log(e);
      }
    };

    run();
  }, [state.balance.data?.chainBalance.toString()]);

  return { feeError, maxLimit, maxLimitFormatted, maxLimitRaw };
};
