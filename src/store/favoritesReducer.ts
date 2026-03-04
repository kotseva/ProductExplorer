export interface FavoritesState {
  favoriteIds: number[];
  isLoaded: boolean;
}

export const initialFavoritesState: FavoritesState = {
  favoriteIds: [],
  isLoaded: false,
};

export type FavoritesAction =
  | {type: 'LOAD_FAVORITES'; payload: number[]}
  | {type: 'TOGGLE_FAVORITE'; payload: number}
  | {type: 'REMOVE_FAVORITE'; payload: number};

export function favoritesReducer(
  state: FavoritesState,
  action: FavoritesAction,
): FavoritesState {
  switch (action.type) {
    case 'LOAD_FAVORITES':
      return {favoriteIds: action.payload, isLoaded: true};

    case 'TOGGLE_FAVORITE': {
      const id = action.payload;
      const exists = state.favoriteIds.includes(id);
      return {
        ...state,
        favoriteIds: exists
          ? state.favoriteIds.filter(fid => fid !== id)
          : [...state.favoriteIds, id],
      };
    }

    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favoriteIds: state.favoriteIds.filter(fid => fid !== action.payload),
      };

    default:
      return state;
  }
}
