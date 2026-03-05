// Custom hook test
import React from 'react';
import {renderHook, act, waitFor} from '@testing-library/react-native';
import {useFavorites} from '../hooks/useFavorites';
import {FavoritesProvider} from '../store/FavoritesContext';

function wrapper({children}: {children: React.ReactNode}) {
  return <FavoritesProvider>{children}</FavoritesProvider>;
}

async function renderUseFavorites() {
  const hook = renderHook(() => useFavorites(), {wrapper});
  await waitFor(() => {
    expect(hook.result.current.state.isLoaded).toBe(true);
  });
  return hook;
}

describe('useFavorites', () => {
  it('toggles a product as favorite', async () => {
    const {result} = await renderUseFavorites();

    act(() => {
      result.current.toggleFavorite(42);
    });

    expect(result.current.isFavorite(42)).toBe(true);
  });

  it('removes a favorite when toggled again', async () => {
    const {result} = await renderUseFavorites();

    act(() => {
      result.current.toggleFavorite(7);
    });
    expect(result.current.isFavorite(7)).toBe(true);

    act(() => {
      result.current.toggleFavorite(7);
    });
    expect(result.current.isFavorite(7)).toBe(false);
  });
});
