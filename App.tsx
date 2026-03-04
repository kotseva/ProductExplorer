import React from 'react';
import {StatusBar, StyleSheet, useColorScheme, View, Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ProductsProvider} from './src/store/ProductsContext';
import {FavoritesProvider} from './src/store/FavoritesContext';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <FavoritesProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <View style={styles.container}>
            <Text style={styles.placeholder}>Product Explorer</Text>
          </View>
        </FavoritesProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
