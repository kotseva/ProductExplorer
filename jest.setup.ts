jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: unknown}) => children,
  useNavigation: () => ({navigate: jest.fn(), goBack: jest.fn()}),
  useRoute: () => ({params: {}}),
}));

jest.mock('@react-navigation/native-stack', () => {
  const react = require('react');
  return {
    createNativeStackNavigator: () => ({
      Navigator: ({children}: {children: unknown}) => {
        const screens = react.Children.toArray(children);
        return screens[0] || null;
      },
      Screen: ({component: C}: {component: React.ComponentType}) =>
        react.createElement(C, {}),
    }),
  };
});

const mockStorage: Record<string, string> = {};

jest.mock('react-native-safe-area-context', () => {
  const mockReact = require('react');
  const insets = {top: 0, right: 0, bottom: 0, left: 0};
  const frame = {x: 0, y: 0, width: 390, height: 844};

  const SafeAreaInsetsContext = mockReact.createContext(insets);
  const SafeAreaFrameContext = mockReact.createContext(frame);

  return {
    SafeAreaProvider: ({children}: {children: React.ReactNode}) =>
      mockReact.createElement(
        SafeAreaInsetsContext.Provider,
        {value: insets},
        mockReact.createElement(
          SafeAreaFrameContext.Provider,
          {value: frame},
          children,
        ),
      ),
    SafeAreaView: ({children}: {children: React.ReactNode}) =>
      mockReact.createElement('View', null, children),
    SafeAreaFrameContext,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
  };
});

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn((key: string) => Promise.resolve(mockStorage[key] ?? null)),
  setItem: jest.fn((key: string, value: string) => {
    mockStorage[key] = value;
    return Promise.resolve();
  }),
  removeItem: jest.fn((key: string) => {
    delete mockStorage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(() => {
    Object.keys(mockStorage).forEach(key => delete mockStorage[key]);
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(() => Promise.resolve(Object.keys(mockStorage))),
  multiGet: jest.fn((keys: string[]) =>
    Promise.resolve(keys.map(key => [key, mockStorage[key] ?? null])),
  ),
  multiSet: jest.fn((pairs: [string, string][]) => {
    pairs.forEach(([key, value]) => {
      mockStorage[key] = value;
    });
    return Promise.resolve();
  }),
  multiRemove: jest.fn((keys: string[]) => {
    keys.forEach(key => delete mockStorage[key]);
    return Promise.resolve();
  }),
}));
