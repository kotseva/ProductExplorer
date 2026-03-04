import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProductsProvider} from './src/store/ProductsContext';
import {FavoritesProvider} from './src/store/FavoritesContext';
import {MainScreen} from './src/screens/MainScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <FavoritesProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <MainScreen />
        </FavoritesProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}

export default App;
