import { Button } from '@map3xyz/components';
import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import MethodIcon from '../../components/MethodIcon';
import { Context } from '../../providers/Store';

type MetaMaskStatusType = 'success' | 'loading' | 'error' | 'idle';

const MetaMask: React.FC<Props> = ({ amount }) => {
  const [state, dispatch] = useContext(Context);
  const [account, setAccount] = useState<{
    data?: string;
    status: MetaMaskStatusType;
  }>({ status: 'idle' });

  if (!state.method) return null;

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        let accounts = await provider.listAccounts();

        if (!accounts.length) {
          try {
            setAccount({ status: 'loading' });
            await provider.send('eth_requestAccounts', []);
            accounts = await provider.listAccounts();
          } catch (e: any) {
            setAccount({ data: e.message, status: 'error' });
            return;
          }
        }

        setAccount({ data: accounts[0], status: 'success' });
        dispatch({ payload: accounts[0], type: 'SET_ACCOUNT' });
      }
    };

    connect();
  }, []);

  console.log(account);

  return (
    <Button
      additionalTypes={account.status === 'error' ? 'warning' : undefined}
      block
      disabled={
        account.status === 'success' && Number(amount) > 0 ? false : true
      }
      htmlType="submit"
      size="medium"
      type={'default'}
    >
      <span className="flex items-center gap-2">
        <MethodIcon method={state.method} />
        {account.status === 'loading'
          ? 'Connecting...'
          : account.status === 'error'
          ? 'Error Connecting to MetaMask'
          : 'Confirm Payment'}
      </span>
    </Button>
  );
};

type Props = {
  amount: number;
};

export default MetaMask;
