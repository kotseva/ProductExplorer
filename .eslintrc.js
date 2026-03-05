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
  ],
};
