import { ReadOnlyText } from '@map3xyz/components';
import WalletConnectClient from '@walletconnect/client';
import { QRCodeSVG } from 'qrcode.react';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserView, isMobile, MobileView } from 'react-device-detect';

import ErrorWrapper from '../../components/ErrorWrapper';
import InnerWrapper from '../../components/InnerWrapper';
import LoadingWrapper from '../../components/LoadingWrapper';
import { useModalSize } from '../../hooks/useModalSize';
import { Context, Steps } from '../../providers/Store';

const WalletConnect: React.FC<Props> = () => {
  const [deeplink, setDeeplink] = useState<string | undefined>();
  const [uri, setUri] = useState<string | undefined>();
  const [state, dispatch] = useContext(Context);

  const { width } = useModalSize();

  const handleConnected = (connector: WalletConnectClient) => {
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

    dispatch({ payload: connector, type: 'SET_CONNECTOR_SUCCESS' });
    dispatch({ payload: connector.accounts[0], type: 'SET_ACCOUNT_SUCCESS' });
    dispatch({ payload: Steps.EnterAmount, type: 'SET_STEP' });
  };

  const run = async () => {
    dispatch({ type: 'SET_CONNECTOR_LOADING' });
    try {
      const connector = await new WalletConnectClient({
        bridge: 'https://bridge.walletconnect.org',
      });

      connector.on('connect', (error) => {
        if (error) {
          throw error;
        }

        handleConnected(connector);
      });

      connector.on('disconnect', (error) => {
        if (error) {
          throw error;
        }

        dispatch({ type: 'SET_CONNECTOR_IDLE' });
        dispatch({ type: 'SET_ACCOUNT_IDLE' });
        if (connector.peerMeta?.name.includes(state.method?.name || '')) {
          dispatch({ payload: Steps.PaymentMethod, type: 'SET_STEP' });
        }
      });

      if (!connector.connected) {
        await connector.createSession({
          chainId: state.network?.identifiers?.chainId || 1,
        });
      } else {
        if (!connector.peerMeta?.name.includes(state.method?.name || '')) {
          await connector.killSession();
          run();
        } else {
          handleConnected(connector);
          return;
        }
      }

      if (isMobile) {
        const deeplink =
          state.method?.walletConnect?.mobile?.native +
          '//wc?uri=' +
          encodeURIComponent(connector.uri);
        setDeeplink(deeplink);
        // window.location.href = deeplink;
      }

      setUri(connector.uri);
    } catch (e: any) {
      dispatch({ payload: e.message, type: 'SET_CONNECTOR_ERROR' });
    }
  };

  useEffect(() => {
    run();
  }, []);

  if (state.connector?.error) {
    return (
      <ErrorWrapper
        description="Error starting a WalletConnect session."
        header="WalletConnect Error"
        retry={run}
      />
    );
  }

  return uri ? (
    <div className="flex h-full flex-col items-center justify-between py-2">
      <div className="w-full border-y border-neutral-200 bg-neutral-100 px-4 py-3 leading-6 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white">
        <div>
          <div className="flex items-center gap-2">
            <img className="h-4" src={state.method?.logo || ''} />
            <div className="font-bold">{state.method?.name}</div>
          </div>
          <div className="text-xs text-neutral-500">
            {state.method?.description}
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-between">
        <InnerWrapper className="flex items-center gap-2 dark:text-white">
          <i className="fa fa-handshake" />{' '}
          <div
            className="text-xs font-bold leading-4"
            data-testid="scan-wallet-connect"
          >
            <MobileView>
              <>
                Click the button below to connect with{' '}
                <b>{state.method?.name}</b>.
              </>
            </MobileView>
            <BrowserView>
              <>
                Open <b>{state.method?.name}</b> on your mobile device and scan
                the QR Code to connect.{' '}
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
        {isMobile && deeplink ? (
          <>
            <a className="text-white" href={deeplink}>
              Open App
            </a>
            <div className="break-all text-xxs text-white">{deeplink}</div>
          </>
        ) : (
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
        )}
        <InnerWrapper>
          <ReadOnlyText copyButton value={uri} />
        </InnerWrapper>
      </div>
    </div>
  ) : (
    <LoadingWrapper />
  );
};

type Props = {};

export default WalletConnect;
