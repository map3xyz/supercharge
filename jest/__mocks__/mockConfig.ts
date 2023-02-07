import { Map3InitConfig } from '../../src';

export const mockConfig: Map3InitConfig = {
  anonKey: process.env.CONSOLE_ANON_KEY || '',
  options: {
    callbacks: {
      onAddressRequested: () => {
        return { address: '0x0000000000000000000000000000000000000000' };
      },
    },
    selection: {
      fiat: 'USD',
    },
    style: {
      theme: 'dark' as const,
    },
  },
  userId: 'test',
};
