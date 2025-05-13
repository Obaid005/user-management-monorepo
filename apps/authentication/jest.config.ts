/* eslint-disable */
module.exports = {
  displayName: 'authentication',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/authentication',
  moduleNameMapper: {
    '^@monorepo/common$': '<rootDir>/../../common/src',
    '^@monorepo/common/(.*)$': '<rootDir>/../../common/src/$1',
  },
}; 