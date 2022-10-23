module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/preview.tsx',
    '!src/custom.d.ts',
    '!src/generated/*.{ts,tsx}',
  ],
  coverageDirectory: 'coverage',
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/jest/__mocks__/styleMock.js',
    '^.+\\.svg$': '<rootDir>/jest/__mocks__/svgMock.js',
  },
  setupFiles: ['<rootDir>/jest/setupTests.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
};
