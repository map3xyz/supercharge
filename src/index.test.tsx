import '@testing-library/jest-dom';

import { act, screen } from '@testing-library/react';

import { initMap3Supercharge } from './index';

describe('Map3Sdk', () => {
  it('can be opened and closed', async () => {
    const supercharge = initMap3Supercharge({
      anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
      options: {
        callbacks: {
          onAddressRequested: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { address: '0x0000000000000000000000000000000000000000' };
          },
        },
      },
      userId: 'test',
    });
    await act(async () => {
      supercharge.open();
    });
    const modal = await screen.findByTestId('map3-modal');
    expect(modal).toBeInTheDocument();
    await act(async () => {
      supercharge.close();
    });
    expect(modal).not.toBeInTheDocument();
  });
  it('should setup dark theme', async () => {
    const supercharge = initMap3Supercharge({
      anonKey:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
      options: {
        callbacks: {
          onAddressRequested: async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return { address: '0x0000000000000000000000000000000000000000' };
          },
        },
        style: {
          theme: 'dark',
        },
      },
      userId: 'test',
    });
    await act(async () => {
      supercharge.open();
    });
    expect(document.body).toHaveClass('dark');
  });
  it('should initialize with a fiat value', async () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x0000000000000000000000000000000000000000' };
            },
          },
          selection: {
            fiat: 'USD',
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should warn if address is passed without network', async () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          selection: {
            address: '0x123',
            fiat: 'USD',
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: networkCode is required when address is provided. Falling back to asset selection.'
    );
  });
  it('should throw if no anonKey is passed', () => {
    const initFn = () =>
      // @ts-expect-error
      initMap3Supercharge({});
    expect(initFn).toThrow('anonKey is required.');
  });
  it('should throw if no userId is passed', () => {
    const initFn = () =>
      // @ts-expect-error
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
      });
    expect(initFn).toThrow('userId is required.');
  });
  it('should allow optional onClose', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
            onClose: () => {},
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow optional onFailure', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
            onFailure: () => {},
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow optional onSuccess', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
            onSuccess: () => {},
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow an optional custom.colors', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          style: {
            colors: {
              accent: '#000000',
              primary: '#000000',
            },
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should console.warn if invalid key is passed to colors', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          style: {
            colors: {
              // @ts-expect-error
              invalidKey: '#000000',
            },
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: invalid value passed to colors.primary. Falling back to default.'
    );
  });
  it('should warn if amount is passed without at least networkCode', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () => {
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => ({ address: '0x000000' }),
          },
          selection: {
            amount: '100',
          },
        },
        userId: 'test',
      });
    };
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: amount is provided but not assetId or address and network. Falling back to undefined amount.'
    );
  });
  it('should check valid config.colors.primary', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          style: {
            colors: {
              primary: 'not-a-color',
            },
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: invalid value passed to colors.primary. Falling back to default.'
    );
    const initFn2 = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          style: {
            colors: {
              primary: 'supported',
            },
          },
        },
        userId: 'test',
      });

    expect(initFn2).not.toThrow();
  });
  it('allows optional parameter appName', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          style: {
            appName: 'awesome-app',
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('allows optional shortcutAmounts, slices first 3 amounts if more than 3 are passed.', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              await new Promise((resolve) => setTimeout(resolve, 1000));
              return { address: '0x000000' };
            },
          },
          selection: {
            shortcutAmounts: [1, 2, 3, 4, 5],
          },
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: shortcutAmounts should not exceed 3 values. Falling back to first 3 values.'
    );
  });
  it('should throw if method is not binance-pay and no onAddressRequested callback is provided', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        userId: 'test',
      });
    expect(initFn).toThrow('options.callbacks.onAddressRequested is required.');
  });
  it('should warn if rate is provided but not assetId or address and network', () => {
    const warnSpy = jest.spyOn(console, 'warn');

    const initFn = () =>
      initMap3Supercharge({
        anonKey:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
        options: {
          callbacks: {
            onAddressRequested: async () => {
              return { address: '0x000000' };
            },
          },
          selection: {
            rate: 10_000,
          },
        },
        userId: 'test',
      });

    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: rate is provided but not assetId or address and network. Falling back to default rate.'
    );
  });
});
