module.exports = {
  projects: ['<rootDir>/apps/*/jest.config.ts'],
  preset: './jest.preset.js',
  moduleNameMapper: {
    '^@monorepo/common$': '<rootDir>/common/src',
    '^@monorepo/common/(.*)$': '<rootDir>/common/src/$1'
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', {
      tsconfig: 'tsconfig.json'
    }]
  },
}; 