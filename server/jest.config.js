module.exports = {
  // preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    "<rootDir>/src/" // Skipping test files from src file.
  ],
  setupFiles: [
    "<rootDir>/build/tests/test-setup.js"
  ]
};