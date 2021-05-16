module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    "<rootDir>/build/" // Skipping test files from src file.
  ],
  setupFiles: [
    "<rootDir>/build/tests/test-setup.js"
  ]
};