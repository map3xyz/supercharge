import WalletConnectProvider from '@walletconnect/web3-provider';

export async function getWalletConnectProvider(rpc?: string) {
  const params = rpc
    ? { rpc }
    : { infuraId: '27e484dcd9e3efcfd25a83a78777cdf1' };

  const externalProvider = await new WalletConnectProvider({
    bridge: 'https://bridge.walletconnect.org',
    qrcode: false,
    ...params,
  });

  return externalProvider;
}
