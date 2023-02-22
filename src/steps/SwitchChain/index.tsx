import { Badge, Button, CoinLogo } from '@map3xyz/components';
import React, { useContext, useState } from 'react';

import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import { useGetNetworkByChainIdQuery } from '../../generated/apollo-gql';
import { useWeb3 } from '../../hooks/useWeb3';
import { Context, Steps } from '../../providers/Store';

const CHAIN_MISSING = 'Unrecognized chain ID';

const SwitchChain: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const { addChain, switchChain } = useWeb3();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    data: currentChain,
    loading: loadingCurrentChain,
  } = useGetNetworkByChainIdQuery({
    variables: { chainId: Number(state.providerChainId) },
  });

  if (!state.method) {
    dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
    return null;
  }

  const handleSwitch = async () => {
    try {
      setLoading(true);
      await switchChain(state.network?.identifiers?.chainId!);
    } catch (e: any) {
      if (e.message?.includes(CHAIN_MISSING)) {
        try {
          await addChain();
          return;
        } catch (addChainError) {
          e = addChainError as Error;
        }
      }
      setFormError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <div className="w-full">
        <InnerWrapper className="!pt-0">
          <h3 className="text-lg font-semibold dark:text-white">
            Switch Chain
          </h3>
        </InnerWrapper>
        <StateDescriptionHeader />
      </div>
      <InnerWrapper>
        {loadingCurrentChain ? (
          <LoadingWrapper />
        ) : currentChain ? (
          <div className="flex h-full items-start justify-between">
            <div className="flex w-1/2 flex-col items-center justify-center">
              <div className="mb-2 whitespace-nowrap text-xs text-primary-400">
                Current Network
              </div>
              <CoinLogo
                height="h-12"
                name={currentChain.networkByChainId?.name!}
                png={currentChain.networkByChainId?.logo?.png || undefined}
                svg={currentChain.networkByChainId?.logo?.svg || undefined}
                width="w-12"
              />
              <div className="mt-2 w-28 text-center font-semibold dark:text-white">
                {currentChain.networkByChainId?.name}
              </div>
            </div>
            <div className="flex h-full items-center justify-center">
              <i className="fa fa-arrow-right text-lg text-primary-400" />
            </div>
            <div className="flex w-1/2 flex-col items-center justify-center">
              <div className="mb-2 whitespace-nowrap text-xs text-primary-400">
                Switch to
              </div>
              <CoinLogo
                height="h-12"
                name={state.network?.networkName!}
                png={state.network?.logo?.png || undefined}
                svg={state.network?.logo?.svg || undefined}
                width="w-12"
              />
              <div className="mt-2 w-28 text-center font-semibold dark:text-white">
                {state.network?.networkName}
              </div>
            </div>
          </div>
        ) : null}
      </InnerWrapper>
      <InnerWrapper>
        <div className="relative w-full">
          <span className="absolute -top-2 left-1/2 flex w-full -translate-x-1/2 -translate-y-full justify-center">
            {formError ? (
              <Badge color="red" dot>
                {formError}
              </Badge>
            ) : null}
          </span>
        </div>
        <Button
          block
          disabled={loading}
          loading={loading}
          onClick={handleSwitch}
          size="large"
          type="default"
        >
          Switch Chain
        </Button>
      </InnerWrapper>
    </div>
  );
};

type Props = {};

export default SwitchChain;
