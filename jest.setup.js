import '@testing-library/jest-native/extend-expect';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  Link: 'Link',
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock expo status bar
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Add any other mocks here
global.console = {
  ...console,
  warn: jest.fn(),
  error: jest.fn(),
};