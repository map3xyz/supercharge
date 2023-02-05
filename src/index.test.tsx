import '@testing-library/jest-dom';

import { act, screen } from '@testing-library/react';

import { initMap3Supercharge } from './index';

describe('Map3Sdk', () => {
  it('can be opened and closed', async () => {
    const supercharge = initMap3Supercharge({
      anonKey: 'test',
      generateDepositAddress: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { address: '0x0000000000000000000000000000000000000000' };
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
      anonKey: 'test',
      generateDepositAddress: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { address: '0x0000000000000000000000000000000000000000' };
      },
      theme: 'dark',
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
        anonKey: 'test',
        fiat: 'USD',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should warn if address is passed without network', async () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        address: '0x123',
        anonKey: 'test',
        fiat: 'USD',
        generateDepositAddress: async () => ({ address: '0x000000' }),
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
      initMap3Supercharge({
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
      });
    expect(initFn).toThrow('anonKey is required.');
  });
  it('should throw if no userId is passed', () => {
    const initFn = () =>
      // @ts-expect-error
      initMap3Supercharge({
        anonKey: 'test',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
      });
    expect(initFn).toThrow('userId is required.');
  });
  it('should allow optional rainbowRoad config', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        rainbowRoad: true,
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow optional onClose', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        onClose: () => {},
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow optional onFailure', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        onFailure: () => {},
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow optional onSuccess', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        onSuccess: () => {},
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should allow an optional custom.colors', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        colors: {
          progressBar: '#000000',
          scrollBar: '#000000',
        },
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
  it('should console.warn if invalid key is passed to colors', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        colors: {
          // @ts-expect-error
          invalidKey: '#000000',
        },
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: invalid key passed to colors. Valid keys are: progressBar, scrollBar'
    );
  });
  it('should warn if amount is passed without at least networkCode', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () => {
      initMap3Supercharge({
        amount: '100',
        anonKey: 'test',
        generateDepositAddress: async () => ({ address: '0x000000' }),
        userId: 'test',
      });
    };
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: networkCode is required when amount is provided. Falling back to asset selection.'
    );
  });
  it('should check valid config.colors.scrollBar', () => {
    const warnSpy = jest.spyOn(console, 'warn');
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        colors: {
          scrollBar: 'not-a-color',
        },
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x0000000000000000000000000000000000000000' };
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
    expect(warnSpy).toBeCalledWith(
      'Warning: invalid value passed to colors.scrollBar. Falling back to default.'
    );
    const initFn2 = () =>
      initMap3Supercharge({
        anonKey: 'test',
        colors: {
          scrollBar: 'supported',
        },
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x000000' };
        },
        userId: 'test',
      });

    expect(initFn2).not.toThrow();
  });
  it('allows optional parameter appName', () => {
    const initFn = () =>
      initMap3Supercharge({
        anonKey: 'test',
        appName: 'awesome-app',
        generateDepositAddress: async () => {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return { address: '0x000000' };
        },
        userId: 'test',
      });
    expect(initFn).not.toThrow();
  });
});
