import {FavoritesRepository} from '../repositories/FavoritesRepository';

/**
 * Use case: persist the current favorites list to storage.
 * Triggered whenever the favoriteIds state changes so the
 * user's selections survive app restart.
 */
export class PersistFavoritesUseCase {
  constructor(private favoritesRepository: FavoritesRepository) {}

  async execute(ids: number[]): Promise<void> {
    return this.favoritesRepository.save(ids);
  }
}
