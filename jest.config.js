module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/components/**/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    'src/hooks/*.{ts,tsx}',
    'src/utils/*.{ts,tsx}',
    'src/steps/**/*.{ts,tsx}',
    'src/steps/index.tsx',
    'src/providers/Store/index.tsx',
    'src/index.tsx',
    'src/App.tsx',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'json-summary', 'text', 'text-summary'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
    '^.+\\.png$': '<rootDir>/jest/__mocks__/fileMock.js',
    '^.+\\.svg$': '<rootDir>/jest/__mocks__/svgMock.js',
    '^~/jest/(.*)$': '<rootDir>/jest/$1',
  },
  setupFiles: ['<rootDir>/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
