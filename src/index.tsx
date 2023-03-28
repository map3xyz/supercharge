import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';
import { PostHogProvider } from 'posthog-js/react';
import { createRoot, Root } from 'react-dom/client';

import App from './App';
import { ISO_4217_TO_SYMBOL } from './constants/iso4217';

extend([mixPlugin]);

const postHogOptions = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};
export interface Map3InitConfig {
  anonKey: string;
  options?: {
    callbacks?: {
      handleAuthorizeTransaction?: (
        fromAddress: string,
        networkCode: string,
        amount: string
      ) => Promise<Boolean>;
      handleOrderFeeCalculation?: (
        asset: string,
        networkCode: string,
        amount: string
      ) => Promise<{
        fixedFee?: number;
        message?: string;
        variableFee?: number;
      }>;
      onAddressRequested?: (
        asset: string,
        networkCode: string
      ) =>
        | Promise<{ address: string; memo?: string }>
        | { address: string; memo?: string };
      onClose?: () => void;
      onExpire?: () => void;
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
      canBridge?: boolean;
      expiration?: string | number;
      fiat?: string;
      networkCode?: string;
      paymentMethod?: 'binance-pay';
      rate?: number;
      shortcutAmounts?: number[];
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

    if (
      config.options?.selection?.paymentMethod !== 'binance-pay' &&
      !config.options?.callbacks?.onAddressRequested
    ) {
      throw new Error('options.callbacks.onAddressRequested is required.');
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

    const isAsset =
      config.options.selection.assetId ||
      (config.options.selection.address &&
        config.options.selection.networkCode);

    if (!ISO_4217_TO_SYMBOL[config.options.selection.fiat]) {
      console.warn(
        `Warning: fiat ${config.options.selection.fiat} is not supported. Falling back to USD.`
      );
      config.options.selection.fiat = 'USD';
    }

    if (
      config.options.selection.shortcutAmounts &&
      config.options.selection.shortcutAmounts.length > 3
    ) {
      console.warn(
        'Warning: shortcutAmounts should not exceed 3 values. Falling back to first 3 values.'
      );
      config.options.selection.shortcutAmounts = config.options.selection.shortcutAmounts.slice(
        0,
        3
      );
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

    if (config.options.selection.amount && !isAsset) {
      console.warn(
        'Warning: amount is provided but not assetId or address and network. Falling back to undefined amount.'
      );
      config.options.selection.amount = undefined;
    }

    if (config.options.selection.rate && !isAsset) {
      console.warn(
        'Warning: rate is provided but not assetId or address and network. Falling back to default rate.'
      );
      config.options.selection.rate = undefined;
    }

    if (config.options.selection.expiration) {
      try {
        const timeRemainingMs =
          new Date(config.options.selection.expiration).getTime() -
          new Date().getTime();

        if (timeRemainingMs < 0) {
          throw new Error('Expiration is in the past.');
        }
      } catch (e) {
        console.warn(
          'Warning: expiration is in the past or invalid. Falling back to default expiration.'
        );
        config.options.selection.expiration = undefined;
      }
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
    const orange600 = 'rgb(234, 88, 12)';
    document.body.style.setProperty('--accent-color', orange600);
    document.body.style.setProperty(
      '--accent-color-light',
      colord(config.options.style?.colors?.accent || orange600)
        .lighten(0.35)
        .toHex()
    );

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
        <PostHogProvider
          apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
          options={postHogOptions}
        >
          <App config={this.config} onClose={this.onClose} />
        </PostHogProvider>
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
