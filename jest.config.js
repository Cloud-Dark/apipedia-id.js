module.exports = {
  testEnvironment: 'node',
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