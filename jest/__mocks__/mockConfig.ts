import { Map3InitConfig } from '../../src';

export const mockConfig: Map3InitConfig = {
  anonKey:
    process.env.CONSOLE_ANON_KEY ||
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJjb25zb2xlIiwib3JnX2lkIjoiYzljNDczMzYtNWM5MS00MDM0LWIyYTgtMGI1NzA5ZTAwMGI1Iiwicm9sZXMiOlsiYW5vbnltb3VzIl0sImlhdCI6MTY3NTg4ODUwOCwiZXhwIjoxNzA3NDI0NTA4fQ.GzuXjFzSVkE3L-LlhtvpXa3aIi48rvHgMY3hw6lS8KU',
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
