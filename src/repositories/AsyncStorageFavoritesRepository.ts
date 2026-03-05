import AsyncStorage from '@react-native-async-storage/async-storage';
import {FavoritesRepository} from './FavoritesRepository';

const FAVORITES_STORAGE_KEY = '@ProductExplorer:favorites';

/**
 * Concrete implementation of FavoritesRepository backed by AsyncStorage.
 * Persists favorite product IDs as a JSON array on the device.
 */
export class AsyncStorageFavoritesRepository implements FavoritesRepository {
  async load(): Promise<number[]> {
    const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  async save(ids: number[]): Promise<void> {
    await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
  }
}
