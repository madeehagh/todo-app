/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
    moduleFileExtensions: [ 'ts', 'js'],
    roots: ['.'],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    verbose: true,
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    coverageDirectory: '<rootDir>/coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    testEnvironment: 'node'
};