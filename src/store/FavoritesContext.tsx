import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {AsyncStorageFavoritesRepository} from '../repositories/AsyncStorageFavoritesRepository';
import {LoadFavoritesUseCase} from '../usecases/LoadFavoritesUseCase';
import {PersistFavoritesUseCase} from '../usecases/PersistFavoritesUseCase';
import {
  FavoritesState,
  FavoritesAction,
  initialFavoritesState,
  favoritesReducer,
} from './favoritesReducer';

// Composition root: wire concrete repository into use cases.
const favoritesRepository = new AsyncStorageFavoritesRepository();
const loadFavoritesUseCase = new LoadFavoritesUseCase(favoritesRepository);
const persistFavoritesUseCase = new PersistFavoritesUseCase(favoritesRepository);

interface FavoritesContextValue {
  state: FavoritesState;
  dispatch: React.Dispatch<FavoritesAction>;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({children}: FavoritesProviderProps) {
  const [state, dispatch] = useReducer(favoritesReducer, initialFavoritesState);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, []);

  useEffect(() => {
    if (state.isLoaded) {
      persistFavorites(state.favoriteIds);
    }
  }, [state.favoriteIds, state.isLoaded]);

  const loadFavoritesFromStorage = async () => {
    try {
      const ids = await loadFavoritesUseCase.execute();
      dispatch({type: 'LOAD_FAVORITES', payload: ids});
    } catch {
      dispatch({type: 'LOAD_FAVORITES', payload: []});
    }
  };

  const persistFavorites = async (ids: number[]) => {
    try {
      await persistFavoritesUseCase.execute(ids);
    } catch {
      // Storage write failed; non-critical
    }
  };

  const toggleFavorite = useCallback((productId: number) => {
    dispatch({type: 'TOGGLE_FAVORITE', payload: productId});
  }, []);

  const isFavorite = useCallback(
    (productId: number): boolean => {
      return state.favoriteIds.includes(productId);
    },
    [state.favoriteIds],
  );

  const value = useMemo<FavoritesContextValue>(
    () => ({state, dispatch, toggleFavorite, isFavorite}),
    [state, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
