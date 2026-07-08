module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  testTimeout: 10000,
};
