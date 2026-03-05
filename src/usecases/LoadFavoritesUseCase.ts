import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@ProductExplorer:favorites';

//Loads the list of favorite product IDs from AsyncStorage
export class LoadFavoritesUseCase {
  async execute(): Promise<number[]> {
    const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }
}
