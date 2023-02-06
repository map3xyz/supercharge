import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { createRoot, Root } from 'react-dom/client';

import App from './App';

extend([mixPlugin]);

export interface Map3InitConfig {
  address?: string;
  amount?: string;
  anonKey: string;
  appName?: string;
  assetId?: string;
  authorizeTransaction?: (
    fromAddress: string,
    network: string,
    amount: string
  ) => Promise<Boolean>;
  colors?: {
    accent?: string;
    primary?: string;
  };
  embed?: {
    height?: string;
    id?: string;
    width?: string;
  };
  fiat?: string;
  generateDepositAddress?: (
    asset?: string,
    network?: string
  ) =>
    | Promise<{ address: string; memo?: string }>
    | { address: string; memo?: string };
  locale?: string;
  networkCode?: string;
  onClose?: () => void;
  onFailure?: (error: string, networkCode: string, address?: string) => void;
  onSuccess?: (txHash: string, networkCode: string, address?: string) => void;
  paymentMethod?: 'binance-pay' | 'show-address';
  rainbowRoad?: boolean;
  theme?: 'dark' | 'light';
  userId: string;
}
export class Map3 {
  private onClose: () => void;
  private root: Root;
  private config: Map3InitConfig;

  constructor(config: Map3InitConfig) {
    if (!config.anonKey) {
      throw new Error('anonKey is required.');
    }

    if (!config.userId) {
      throw new Error('userId is required.');
    }

    if (!config.theme) {
      config.theme = 'light';
    }

    if (!config.fiat) {
      config.fiat = 'USD';
    }

    if (!config.locale) {
      config.locale = 'en';
    }

    if (config.address && !config.networkCode) {
      console.warn(
        'Warning: networkCode is required when address is provided. Falling back to asset selection.'
      );
      config.address = undefined;
    }

    if (config.amount && !config.networkCode) {
      console.warn(
        'Warning: networkCode is required when amount is provided. Falling back to asset selection.'
      );
      config.amount = undefined;
    }

    if (config.rainbowRoad) {
      document.body.classList.add('rainbow-road');
    }

    if (config.appName) {
      document.title = config.appName;
    }

    // default colors
    const shades = {
      '100': 'rgb(245, 245, 245)',
      '200': 'rgb(229, 229, 229)',
      '400': 'rgb(163, 163, 163)',
      '500': 'rgb(115, 115, 115)',
      '700': 'rgb(64, 64, 64)',
      '800': 'rgb(38, 38, 38)',
      '900': 'rgb(24, 24, 24)',
    };

    Object.keys(shades).forEach((shade) => {
      document.body.style.setProperty(
        `--primary-color-${shade}`,
        shades[shade as keyof typeof shades]
      );
    });

    // orange-600
    document.body.style.setProperty('--accent-color', 'rgb(234, 88, 12)');

    // theme colors
    if (config.colors) {
      const validKeys = ['primary', 'accent'];
      const invalidKeys = Object.keys(config.colors).filter(
        (key) => !validKeys.includes(key)
      );
      if (invalidKeys.length > 0) {
        console.warn(
          `Warning: invalid key passed to colors. Valid keys are: ${validKeys.join(
            ', '
          )}`
        );

        invalidKeys.forEach((key) => {
          delete config.colors![key as keyof Map3InitConfig['colors']];
        });
      }

      Object.keys(config.colors).forEach((key) => {
        if (
          !CSS.supports(
            'color',
            config.colors![key as keyof Map3InitConfig['colors']]
          )
        ) {
          console.warn(
            `Warning: invalid value passed to colors.${key}. Falling back to default.`
          );

          delete config.colors![key as keyof Map3InitConfig['colors']];
        }
      });

      if (config.colors.accent) {
        document.body.classList.add('map3-accent');
        document.body.style.setProperty('--accent-color', config.colors.accent);
      }

      if (config.colors.primary) {
        const primaryColor = colord(config.colors.primary);

        if (primaryColor.isDark()) {
          document.body.classList.add('dark');
        }

        Object.keys(shades).forEach((shade) => {
          document.body.style.setProperty(
            `--primary-color-${shade}`,
            primaryColor.mix(shades[shade as keyof typeof shades], 0.5).toHex()
          );
        });
      } else {
      }
    }

    this.config = config;

    this.onClose = () => {
      this.root.unmount();
      this.config.onClose?.();
    };

    const element = document.createElement('div');
    const embed = config.embed?.id
      ? document.getElementById(config.embed.id)
      : null;

    if (embed) {
      embed.appendChild(element);
      embed.classList.add('map3');
    } else {
      document.body.appendChild(element);
    }

    if (config.theme === 'dark' && !document.body.classList.contains('dark')) {
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
        'x-map3-user': this.config.userId,
      },
      uri: process.env.CONSOLE_API_URL + '/graphql',
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

export const initMap3Supercharge = (args: Map3InitConfig) => {
  return new Map3(args);
};

if (typeof window !== 'undefined') {
  // @ts-ignore
  window.initMap3Supercharge = initMap3Supercharge;
}
