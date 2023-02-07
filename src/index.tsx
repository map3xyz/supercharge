import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { createRoot, Root } from 'react-dom/client';

import App from './App';

extend([mixPlugin]);

export interface Map3InitConfig {
  anonKey: string;
  options?: {
    callbacks?: {
      handleAuthorizeTransaction?: (
        fromAddress: string,
        network: string,
        amount: string
      ) => Promise<Boolean>;
      handleFeeCalculation?: (
        asset: string,
        networkCode: string,
        amount: string
      ) => Promise<{
        fixedFee?: number;
        message?: string;
        variableFee?: number;
      }>;
      onAddressRequested?: (
        asset?: string,
        network?: string
      ) =>
        | Promise<{ address: string; memo?: string }>
        | { address: string; memo?: string };
      onClose?: () => void;
      onFailure?: (
        error: string,
        networkCode: string,
        address?: string
      ) => void;
      onOrderCreated?: (orderId: string, type: string) => void;
      onSuccess?: (
        txHash: string,
        networkCode: string,
        address?: string
      ) => void;
    };
    selection?: {
      address?: string;
      amount?: string;
      assetId?: string;
      fiat?: string;
      networkCode?: string;
      paymentMethod?: 'binance-pay';
    };
    style?: {
      appName?: string;
      colors?: {
        accent?: string;
        primary?: string;
      };
      embed?: {
        height?: string;
        id?: string;
        width?: string;
      };
      locale?: 'en' | 'es';
      theme?: 'dark' | 'light';
    };
  };
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

    if (!config.options) {
      config.options = {};
    }

    if (!config.options.selection) {
      config.options.selection = {};
    }

    if (!config.options.selection.fiat) {
      config.options.selection.fiat = 'USD';
    }

    if (
      config.options.selection.address &&
      !config.options.selection.networkCode
    ) {
      console.warn(
        'Warning: networkCode is required when address is provided. Falling back to asset selection.'
      );
      config.options.selection.address = undefined;
    }

    if (
      config.options.selection.amount &&
      !config.options.selection.networkCode
    ) {
      console.warn(
        'Warning: networkCode is required when amount is provided. Falling back to asset selection.'
      );
      config.options.selection.amount = undefined;
    }

    if (config.options.style?.appName) {
      document.title = config.options.style.appName;
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
    if (config.options.style && config.options.style.colors) {
      const validKeys = ['primary', 'accent'];
      const invalidKeys = Object.keys(config.options.style.colors).filter(
        (key) => !validKeys.includes(key)
      );
      if (invalidKeys.length > 0) {
        console.warn(
          `Warning: invalid key passed to colors. Valid keys are: ${validKeys.join(
            ', '
          )}`
        );

        invalidKeys.forEach((key) => {
          delete config.options!.style!.colors![key as 'primary' | 'accent'];
        });
      }

      Object.keys(config.options.style.colors).forEach((key) => {
        if (
          !CSS.supports(
            'color',
            config.options!.style!.colors![key as 'primary' | 'accent'] || ''
          )
        ) {
          console.warn(
            `Warning: invalid value passed to colors.${key}. Falling back to default.`
          );

          delete config.options!.style!.colors![key as 'primary' | 'accent'];
        }
      });

      if (config.options.style.colors.accent) {
        document.body.classList.add('map3-accent');
        document.body.style.setProperty(
          '--accent-color',
          config.options.style.colors.accent
        );
      }

      if (config.options.style.colors.primary) {
        const primaryColor = colord(config.options.style.colors.primary);

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
      this.config.options?.callbacks?.onClose?.();
    };

    const element = document.createElement('div');
    const embed = config.options.style?.embed?.id
      ? document.getElementById(config.options.style?.embed?.id)
      : null;

    if (embed) {
      embed.appendChild(element);
      embed.classList.add('map3');
    } else {
      document.body.appendChild(element);
    }

    if (
      config.options?.style?.theme === 'dark' &&
      !document.body.classList.contains('dark')
    ) {
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
