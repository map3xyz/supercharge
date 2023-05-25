import { Badge, Button, Divider, ReadOnlyText } from '@map3xyz/components';
import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { ethers } from 'ethers';
import AppStoreBadge from 'jsx:../../assets/app-store-badge.svg';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BrowserView, isIOS, isMobile, MobileView } from 'react-device-detect';
import GooglePlayBadge from 'url:../../assets/google-play-badge.png';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import StateDescriptionHeader from '../../components/StateDescriptionHeader';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';

const WalletConnect: React.FC<Props> = () => {
  const [state, dispatch] = useContext(Context);
  const [deeplink, setDeeplink] = useState<string | undefined>();
  const [uri, setUri] = useState<string | undefined>();
  const [showInstall, setShowInstall] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const { width } = useModalSize(ref);

  const handleConnectedCB = (
    provider: ethers.providers.Web3Provider,
    account: string
  ) => {
    dispatch({
      payload: [
        'AssetSelection',
        'NetworkSelection',
        'PaymentMethod',
        'EnterAmount',
        'Result',
      ],
      type: 'SET_STEPS',
    });

    const chainId = state.network?.identifiers?.chainId;
    if (!chainId) {
      throw new Error('No chainId.');
    }

    dispatch({ payload: chainId, type: 'SET_PROVIDER_CHAIN_ID' });
    dispatch({ payload: provider, type: 'SET_PROVIDER_SUCCESS' });
    dispatch({ payload: account, type: 'SET_ACCOUNT_SUCCESS' });
    dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
  };

  const run = async () => {
    dispatch({ type: 'SET_PROVIDER_LOADING' });
    try {
      const chainId = state.network?.identifiers?.chainId;
      debugger;
      if (!chainId) {
        throw new Error('No chainId.');
      }

      const externalProvider = await EthereumProvider.init({
        chains: [chainId],
        projectId: '75f2c16d7fce6364075928d3c6462f87',
        showQrModal: false,
      });
      const provider = new ethers.providers.Web3Provider(
        externalProvider,
        'any'
      );

      externalProvider.enable();

      externalProvider.on('display_uri', (uri: string) => {
        // ... custom logic
        setUri(uri);
      });

      externalProvider.on('connect', (error) => {
        if (error) {
          throw error;
        }

        handleConnectedCB(provider, externalProvider.accounts[0]);
      });

      externalProvider.on('disconnect', (error) => {
        if (error) {
          throw error;
        }

        dispatch({ type: 'SET_PROVIDER_IDLE' });
        dispatch({ type: 'SET_ACCOUNT_IDLE' });
        dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
      });

      if (!externalProvider.connected) {
        // await externalProvider.connect({
        //   chains: [state.network?.identifiers?.chainId || 1],
        // });
      } else {
        const appChange = !externalProvider.session?.self.metadata.name.includes(
          state.method?.name || ''
        );
        const chainChange =
          state.providerChainId !== state.network?.identifiers?.chainId;
        if (appChange || chainChange) {
          await localStorage.removeItem('walletconnect');
          await externalProvider.disconnect();
          // run();
          dispatch({ payload: Steps.WalletConnect, type: 'SET_STEP' });
        } else {
          handleConnectedCB(provider, externalProvider.accounts[0]);
          return;
        }
      }

      if (isMobile) {
        let deeplink =
          state.method?.walletConnect?.mobile?.native + '//wc?uri=';
        if (state.method?.name === 'MetaMask') {
          deeplink += externalProvider.session?.self.metadata.url;
        } else if (externalProvider.session) {
          deeplink += encodeURIComponent(
            externalProvider.session.self.metadata.url
          );
        }
        setDeeplink(deeplink);
      }
    } catch (e: any) {
      dispatch({ payload: e.message, type: 'SET_PROVIDER_ERROR' });
    }
  };

  useEffect(() => {
    run();
  }, []);

  if (state.provider?.error) {
    return (
      <ErrorWrapper
        description="Error starting a WalletConnect session."
        header="WalletConnect Error"
        retry={run}
        stacktrace={state.provider.error}
      />
    );
  }

  return (
    <div
      className="flex h-full flex-col items-center justify-between py-2"
      ref={ref}
    >
      <StateDescriptionHeader />
      {uri ? (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <InnerWrapper className="flex items-center gap-2 dark:text-white">
            <i className="fa fa-handshake" />{' '}
            <div
              className="text-sm font-bold leading-4 sm:text-xs"
              data-testid="scan-wallet-connect"
            >
              <MobileView>
                <>
                  Click the button below to connect with{' '}
                  <b>{state.method?.name}</b>. You will be redirected to the
                  app.
                </>
              </MobileView>
              <BrowserView>
                <>
                  Open <b>{state.method?.name}</b> on your mobile device and
                  scan the QR Code to connect.{' '}
                </>
                {state.method?.walletConnect?.desktop?.native ? (
                  <>
                    Or{' '}
                    <a
                      className="text-blue-500"
                      href={state.method.walletConnect.desktop.native + uri}
                    >
                      click here <i className="fa fa-external-link" />{' '}
                    </a>{' '}
                    to connect with the desktop app.
                  </>
                ) : null}
              </BrowserView>
            </div>
          </InnerWrapper>
          <MobileView className="w-full">
            <InnerWrapper className="w-full">
              {deeplink ? (
                <Button block size="large" type="default">
                  <a
                    data-testid="connect-app"
                    href={deeplink}
                    onClick={() => {
                      setTimeout(() => {
                        setShowInstall(true);
                      }, 1200);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      <img className="h-6" src={state.method?.logo || ''} />{' '}
                      Connect {state.method?.name}
                    </span>
                  </a>
                </Button>
              ) : null}
              {showInstall ? (
                <div className="text-center text-sm sm:text-xs">
                  <Divider className="my-3">Or</Divider>
                  <a
                    className="flex w-full justify-center"
                    data-testid="install-app"
                    href={
                      (isIOS
                        ? state.method?.walletConnect?.app?.ios
                        : state.method?.walletConnect?.app?.android) ||
                      state.method?.walletConnect?.mobile?.universal ||
                      ''
                    }
                  >
                    {isIOS ? (
                      <AppStoreBadge aria-label="app-store-badge" />
                    ) : (
                      <img
                        aria-label="google-play-badge"
                        className="block w-1/2"
                        src={GooglePlayBadge}
                      />
                    )}
                  </a>
                </div>
              ) : null}
            </InnerWrapper>
          </MobileView>
          <BrowserView>
            <QRCodeSVG
              bgColor={state.theme === 'dark' ? '#262626' : '#FFFFFF'}
              className="rounded-lg"
              fgColor={state.theme === 'dark' ? '#FFFFFF' : '#000000'}
              imageSettings={{
                excavate: false,
                height: 40,
                src: state.method?.logo || '',
                width: 40,
              }}
              includeMargin={true}
              size={width ? width - 96 : 0}
              style={{
                border:
                  state.theme === 'dark'
                    ? '1px solid #404040'
                    : '1px solid #e5e5e5',
              }}
              value={uri}
            />
          </BrowserView>
          <InnerWrapper>
            <MobileView className="mb-3">
              {/* @ts-ignore */}
              <Badge color="blue" dot>
                {/* @ts-ignore */}
                <span className="leading-4">
                  Having trouble connecting? Please{' '}
                  <a
                    className="underline"
                    href="https://support.map3.xyz"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    click here
                  </a>{' '}
                  to contact support. Or{' '}
                  <a
                    className="underline"
                    onClick={async () => {
                      await localStorage.removeItem('walletconnect');
                      run();
                    }}
                  >
                    here
                  </a>{' '}
                  to create a new WalletConnect session.
                </span>
              </Badge>
            </MobileView>
            <ReadOnlyText copyButton value={uri} />
          </InnerWrapper>
        </div>
      ) : (
        <LoadingWrapper />
      )}
    </div>
  );
};

type Props = {};

export default WalletConnect;
