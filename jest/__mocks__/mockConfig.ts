export const mockConfig = {
  anonKey: process.env.CONSOLE_ANON_KEY || '',
  fiat: 'USD',
  generateDepositAddress: () => {
    return { address: '0x0000000000000000000000000000000000000000' };
  },
  theme: 'dark' as const,
  userId: 'test',
};
