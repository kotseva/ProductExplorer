module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['jest.setup.ts', '**/__tests__/**', '**/*.test.*'],
      env: {
        jest: true,
      },
    },
    {
      files: ['e2e/**/*.js', 'e2e/**/*.ts'],
      globals: {
        device: 'readonly',
        element: 'readonly',
        by: 'readonly',
        waitFor: 'readonly',
        expect: 'readonly',
      },
      env: {
        jest: true,
      },
    },
  ],
};
