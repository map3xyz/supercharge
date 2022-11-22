import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot, Root } from 'react-dom/client';

import App from './App';

const queryClient = new QueryClient();

export interface Map3InitConfig {
  anonKey: string;
  fiat?: string;
  generateDepositAddress: (asset?: string, network?: string) => Promise<string>;
  slug?: string;
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
      uri: process.env.CONSOLE_API_URL + '/graphql',
    });
    this.root.render(
      <ApolloProvider client={client}>
        <QueryClientProvider client={queryClient}>
          <App config={this.config} onClose={this.onClose} />
        </QueryClientProvider>
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
