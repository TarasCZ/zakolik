// https://github.com/thymikee/jest-preset-angular#brief-explanation-of-config
module.exports = {
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@env': '<rootDir>/src/environments/environment',
    '@testing/(.*)': '<rootDir>/src/testing/$1'
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-test))'],
  testMatch: ['**/*.spec.ts']
};
