import { BigNumber, ethers } from 'ethers';
import { useContext } from 'react';

import { Context } from '../providers/Store';
import { erc20Abi } from '../utils/abis/erc20';
import { buildTx } from '../utils/transactions/evm';
import { useDepositAddress } from './useDepositAddress';
import { useWeb3 } from './useWeb3';

const INSUFFICIENT_FUNDS_FOR_GAS = 'insufficient funds for gas * price + value';

export const usePrebuildTx = () => {
  const [state, dispatch] = useContext(Context);
  const { estimateGas, getBalance, getFeeData } = useWeb3();
  const { getDepositAddress } = useDepositAddress();

  const prebuildTx = async (amount: string, assetContract?: string | null) => {
    if (!state.provider?.data) return;
    if (!state.account.data) return;
    const decimals = state.asset?.decimals;

    try {
      if (!decimals) throw new Error('Unable to get decimals.');

      dispatch({ type: 'SET_PREBUILT_TX_LOADING' });
      const { assetBalance, chainBalance } = await getBalance(assetContract);
      const { address, memo } = await getDepositAddress();
      const tx = buildTx({
        address,
        amount,
        assetContract,
        decimals,
        from: state.account.data,
        memo,
      });
      let estimatedGas = BigNumber.from(0);
      if (assetContract) {
        const contract = new ethers.Contract(
          assetContract,
          new ethers.utils.Interface(erc20Abi),
          state.provider?.data.getSigner()
        );
        estimatedGas = await contract.estimateGas.transfer(address, 0);
      } else {
        estimatedGas = await estimateGas(tx);
      }
      const eth_gasPrice: string = await state.provider?.data?.send(
        'eth_gasPrice',
        []
      );
      const feeData = (await getFeeData()) || {};
      const gasPrice = feeData.maxFeePerGas || BigNumber.from(eth_gasPrice);

      let max: BigNumber | undefined;
      let maxLimitRaw: BigNumber | undefined;

      const extraGas = BigNumber.from(memo ? (memo.length / 2) * 16 : 0);
      const gasLimit = estimatedGas.add(extraGas);
      const fee = gasLimit.mul(gasPrice);

      if (state.asset?.type === 'asset') {
        max = assetBalance;
      } else {
        max = chainBalance.sub(fee);
      }
      maxLimitRaw = max?.gt(0) ? max : BigNumber.from(0);

      const feeError = chainBalance.sub(fee).lte(0);
      let maxLimitFormatted = ethers.utils.formatUnits(
        maxLimitRaw.toString(),
        state.asset?.decimals || 'ether'
      );

      if (maxLimitFormatted.split('.')[1] === '0') {
        maxLimitFormatted = maxLimitFormatted.split('.')[0];
      }

      dispatch({
        payload: {
          ...feeData,
          feeError,
          gasLimit,
          gasPrice,
          maxLimitFormatted,
          maxLimitRaw,
          memo,
          tx,
        },
        type: 'SET_PREBUILT_TX_SUCCESS',
      });
    } catch (e: any) {
      let message = e?.message;
      if (message?.includes(INSUFFICIENT_FUNDS_FOR_GAS)) {
        message = 'Insufficient funds.';
      }
      dispatch({ payload: message, type: 'SET_PREBUILT_TX_ERROR' });
    }
  };

  return { prebuildTx };
};
