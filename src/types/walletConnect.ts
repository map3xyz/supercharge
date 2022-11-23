type WalletConnectAppType = {
  android: string;
  browser: string;
  ios: string;
  linux: string;
  mac: string;
  windows: string;
};

type WalletConnectImageURLType = {
  lg: string;
  md: string;
  sm: string;
};

type WalletConnectPlatformType = {
  native: string;
  universal: string;
};

type WalletConnectMetadataColorsType = {
  primary: string;
  secondary: string;
};

type WalletConnectMetadataType = {
  colors: WalletConnectMetadataColorsType;
  shortName: string;
};

export type WalletConnectWallet = {
  app: WalletConnectAppType;
  app_type: string;
  chains: string[];
  description: string;
  desktop: WalletConnectPlatformType;
  homepage: string;
  id: string;
  image_id: string;
  image_url: WalletConnectImageURLType;
  metadata: WalletConnectMetadataType;
  mobile: WalletConnectPlatformType;
  name: string;
  sdks: string[];
  versions: string[];
};
