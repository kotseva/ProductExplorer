import React from 'react';
import {Pressable, StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProductsProvider} from './src/store/ProductsContext';
import {FavoritesProvider} from './src/store/FavoritesContext';
import {MainScreen} from './src/screens/MainScreen';
import {ProductDetailsScreen} from './src/screens/ProductDetailsScreen';
import {RootStackParamList} from './src/types/navigation';
import {Colors} from './src/theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

function BackButton() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigation = useNavigation();
  return (
    <Pressable
      testID="back-button"
      onPress={() => navigation.goBack()}
      style={({pressed}) => [
        styles.backButton,
        {
          backgroundColor: isDarkMode
            ? Colors.dark.surface
            : Colors.light.surface,
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <Text style={styles.backArrow}>{'‹'}</Text>
    </Pressable>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const themeColors = isDarkMode ? Colors.dark : Colors.light;

  return (
    <SafeAreaProvider>
      <ProductsProvider>
        <FavoritesProvider>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: themeColors.background,
                },
                headerTintColor: Colors.primary,
                headerTitleStyle: {
                  color: themeColors.text,
                  fontWeight: '700',
                },
                headerShadowVisible: false,
              }}>
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name="ProductDetails"
                component={ProductDetailsScreen}
                options={({route}) => ({
                  title: route.params.product.title,
                  headerLeft: BackButton,
                })}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </ProductsProvider>
    </SafeAreaProvider>
  );
}

const BACK_BUTTON_SIZE = 34;

const styles = StyleSheet.create({
  backButton: {
    width: BACK_BUTTON_SIZE,
    height: BACK_BUTTON_SIZE,
    borderRadius: BACK_BUTTON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  backArrow: {
    fontSize: 24,
    lineHeight: 26,
    color: Colors.primary,
    fontWeight: '600',
  },
});

export default App;
