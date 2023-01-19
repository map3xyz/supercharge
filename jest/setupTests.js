require('jest-fetch-mock').enableMocks();

jest.mock('../src/utils/supabase', () => ({
  __esModule: true,
  listenToWatchedAddress: jest.fn(),
  supabase: {
    createClient: jest.fn(),
  },
}));

global.CSS = {
  supports: (k, v) => {
    if (v === 'supported') {
      return true;
    }

    return false;
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
