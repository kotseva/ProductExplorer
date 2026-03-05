import React, {
  createContext,
  useReducer,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FavoritesState,
  FavoritesAction,
  initialFavoritesState,
  favoritesReducer,
} from './favoritesReducer';

const FAVORITES_STORAGE_KEY = '@ProductExplorer:favorites';

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
      const stored = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      const ids: number[] = stored ? JSON.parse(stored) : [];
      dispatch({type: 'LOAD_FAVORITES', payload: ids});
    } catch {
      dispatch({type: 'LOAD_FAVORITES', payload: []});
    }
  };

  const persistFavorites = async (ids: number[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(ids));
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
