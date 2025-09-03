import type { Config } from 'jest';

const config: Config = {
  coverageReporters: ['text-summary', 'lcov', 'json-summary'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(chalk|#ansi-styles|#supports-color|has-flag|supports-color|winston|firebase-admin)/)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.(t|j)s',
    '!<rootDir>/src/config/*.config.ts',
    '!<rootDir>/src/**/*.entity.ts',
    '!<rootDir>/src/migrations/*.ts',
    '!<rootDir>/src/main.ts',
  ],
  coveragePathIgnorePatterns: ['node_modules', '.module.ts', '.mock.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  clearMocks: true,
  passWithNoTests: true,
  moduleNameMapper: {
    '^@addresses/(.*)$': '<rootDir>/src/modules/addresses/$1',
    '^@dispatchers/(.*)$': '<rootDir>/src/modules/dispatchers/$1',
    '^@districts/(.*)$': '<rootDir>/src/modules/districts/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@users/(.*)$': '<rootDir>/src/modules/users/$1',
  },
};

export default config;
