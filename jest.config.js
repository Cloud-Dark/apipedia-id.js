require('dotenv').config();

module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: [
    'index.js',
    '!node_modules/**'
  ],
  coverageDirectory: 'coverage',
  testMatch: [
    '**/tests/**/*.test.js?(x)',
    '**/__tests__/**/*.test.js?(x)'
  ]
};