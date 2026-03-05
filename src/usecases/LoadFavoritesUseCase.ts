import {FavoritesRepository} from '../repositories/FavoritesRepository';

/**
 * Use case: hydrate the in-memory favorites state from persistent storage.
 * Called once at app startup to restore the user's previously saved favorites.
 */
export class LoadFavoritesUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute(): Promise<number[]> {
    return this.favoritesRepository.load();
  }
}
