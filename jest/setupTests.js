require('jest-fetch-mock').enableMocks();

jest.mock('../src/utils/supabase', () => ({
  __esModule: true,
  listenToWatchedAddress: jest.fn(),
  supabase: {
    createClient: jest.fn(),
  },
}));

jest.mock('lottie-web', () => ({
  __esModule: true,
  loadAnimation: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
  })),
}));

global.CSS = {
  supports: (k, v) => {
    return v === 'supported';
  },
};

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}

  disconnect() {
    return null;
  }

  observe() {
    return null;
  }

  takeRecords() {
    return null;
  }

  unobserve() {
    return null;
  }
};
