/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  roots: ['<rootDir>/__test__'],
  collectCoverageFrom: ['<rootDir>/__test__/***/*.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  // testEnvironment: 'node'
  testEnvironment:'node',
    'coveragePathIgnorePatterns':[
      '/node_modules/'
  ]
};
