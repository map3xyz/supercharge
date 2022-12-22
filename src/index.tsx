import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { createRoot, Root } from 'react-dom/client';

import App from './App';
import { CONSOLE_API_URL } from './constants';

export interface Map3InitConfig {
  address?: string;
  anonKey: string;
  assetId?: string;
  authorizeTransaction?: (
    fromAddress: string,
    network: string,
    amount: string
  ) => Promise<Boolean>;
  fiat?: string;
  generateDepositAddress: (
    asset?: string,
    network?: string,
    memoEnabled?: boolean
  ) => Promise<{ address: string; memo?: string }>;
  networkCode?: string;
  rainbowRoad?: boolean;
  theme?: 'dark' | 'light';
}
export class Map3 {
  private onClose: () => void;
  private root: Root;
  private config: Map3InitConfig;

  constructor(config: Map3InitConfig) {
    if (!config.generateDepositAddress) {
      throw new Error('generateDepositAddress is required');
    }
    if (!config.anonKey) {
      throw new Error('anonKey is required');
    }

    if (!config.theme) {
      config.theme = 'light';
    }

    if (!config.fiat) {
      config.fiat = 'USD';
    }

    if (config.address && !config.networkCode) {
      console.warn(
        'Warning: networkCode is required when address is provided. Falling back to asset selection.'
      );
      config.address = undefined;
    }

    if (config.rainbowRoad) {
      document.body.classList.add('rainbow-road');
    }

    this.config = config;

    this.onClose = () => {
      this.root.unmount();
      document.body.classList.remove('dark');
    };

    const element = document.createElement('div');
    element.id = 'map3';
    document.body.appendChild(element);

    if (config.theme === 'dark') {
      document.body.classList.add('dark');
    }

    var parent = document.createElement('div');
    parent.setAttribute('style', 'width:30px;height:30px;');
    parent.classList.add('scrollbar-test');

    var child = document.createElement('div');
    child.setAttribute('style', 'width:100%;height:40px');
    parent.appendChild(child);
    document.body.appendChild(parent);

    // Measure the child element, if it is not
    // 30px wide the scrollbars are obtrusive.
    // @ts-ignore
    var scrollbarWidth = 30 - parent?.firstChild?.clientWidth;
    if (scrollbarWidth) {
      document.body.classList.add('map3-layout-scrollbar-obtrusive');
    }

    document.body.removeChild(parent);

    this.root = createRoot(element);
  }

  public open() {
    const client = new ApolloClient({
      cache: new InMemoryCache({
        typePolicies: {
          Query: {
            fields: {
              assetsForOrganization: offsetLimitPagination(),
            },
          },
        },
      }),
      headers: {
        Authorization: 'Bearer ' + this.config.anonKey,
      },
      uri: (process.env.CONSOLE_API_URL || CONSOLE_API_URL) + '/graphql',
    });
    this.root.render(
      <ApolloProvider client={client}>
        <App config={this.config} onClose={this.onClose} />
      </ApolloProvider>
    );
  }

  public close() {
    this.onClose();
  }
}

export const initMap3Sdk = (args: Map3InitConfig) => {
  return new Map3(args);
};

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.initMap3Sdk = initMap3Sdk;
}
