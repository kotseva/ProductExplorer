// Helper function test
import {
  favoritesReducer,
  FavoritesAction,
  initialFavoritesState,
} from '../store/favoritesReducer';

describe('favoritesReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = favoritesReducer(initialFavoritesState, {
      type: 'UNKNOWN',
      payload: 0,
    } as unknown as FavoritesAction);
    expect(state).toEqual(initialFavoritesState);
  });

  describe('LOAD_FAVORITES', () => {
    it('loads favorites and sets isLoaded', () => {
      const state = favoritesReducer(initialFavoritesState, {
        type: 'LOAD_FAVORITES',
        payload: [1, 2, 3],
      });
      expect(state.favoriteIds).toEqual([1, 2, 3]);
      expect(state.isLoaded).toBe(true);
    });
  });

  describe('REMOVE_FAVORITE', () => {
    it('removes a specific favorite', () => {
      const state = favoritesReducer(
        {...initialFavoritesState, favoriteIds: [1, 2, 3], isLoaded: true},
        {type: 'REMOVE_FAVORITE', payload: 2},
      );
      expect(state.favoriteIds).toEqual([1, 3]);
    });

    it('does nothing if id is not in favorites', () => {
      const state = favoritesReducer(
        {...initialFavoritesState, favoriteIds: [1, 3], isLoaded: true},
        {type: 'REMOVE_FAVORITE', payload: 99},
      );
      expect(state.favoriteIds).toEqual([1, 3]);
    });
  });
});
