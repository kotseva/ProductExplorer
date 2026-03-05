import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_STORAGE_KEY = '@ProductExplorer:favorites';
//Writes favorite IDs to AsyncStorage
export class PersistFavoritesUseCase {
  async execute(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  }
}
