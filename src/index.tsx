import '@fortawesome/fontawesome-free/css/all.min.css';
import '@map3xyz/components/dist/index.css';
import './index.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createRoot, Root } from 'react-dom/client';

import App from './App';

export interface Map3InitConfig {
  anonKey: string;
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

    if (!config.theme) {
      config.theme = 'light';
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
      cache: new InMemoryCache(),
      headers: {
        Authorization: 'Bearer ' + this.config.anonKey,
      },
      uri: 'http://localhost:3001/api/graphql',
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

// @ts-ignore
window.initMap3Sdk = initMap3Sdk;
