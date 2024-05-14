'use strict';

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  //detectLeaks: true,
  detectOpenHandles: true,
};