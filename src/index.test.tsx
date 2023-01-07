import '@testing-library/jest-dom';

import { act, screen } from '@testing-library/react';

import { initMap3Sdk } from './index';

describe('Map3Sdk', () => {
  it('can be opened and closed', async () => {
    const map3 = initMap3Sdk({
      anonKey: 'test',
      generateDepositAddress: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { address: '0x0000000000000000000000000000000000000000' };
      },
      userId: 'test',
    });
    await act(async () => {
      map3.open();
    });
    const modal = await screen.findByTestId('map3-modal');
    expect(modal).toBeInTheDocument();
    await act(async () => {
      map3.close();
    });
    expect(modal).not.toBeInTheDocument();
  });
  it('should setup dark theme', async () => {
    const map3 = initMap3Sdk({
      anonKey: 'test',
      generateDepositAddress: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return { address: '0x0000000000000000000000000000000000000000' };
      },
      theme: 'dark',
      userId: 'test',
    });
    await act(async () => {
      map3.open();
    });
    expect(document.body).toHaveClass('dark');
  });
  it('should initialize with a fiat value', async () => {
    const initFn = () =>
      initMap3Sdk({
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
      initMap3Sdk({
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
  it('should throw if no generateDepositAddress function is passed', () => {
    // @ts-expect-error
    const initFn = () => initMap3Sdk({});
    expect(initFn).toThrow('generateDepositAddress is required.');
  });
  it('should throw if no anonKey is passed', () => {
    const initFn = () =>
      // @ts-expect-error
      initMap3Sdk({
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
      initMap3Sdk({
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
      initMap3Sdk({
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
});
