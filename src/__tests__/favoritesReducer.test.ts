// import {
//   favoritesReducer,
//   initialFavoritesState,
// } from '../store/favoritesReducer';

// describe('favoritesReducer', () => {
//   it('returns initial state for unknown action', () => {
//     const state = favoritesReducer(initialFavoritesState, {
//       type: 'UNKNOWN' as any,
//     });
//     expect(state).toEqual(initialFavoritesState);
//   });

//   describe('LOAD_FAVORITES', () => {
//     it('loads favorites and sets isLoaded', () => {
//       const state = favoritesReducer(initialFavoritesState, {
//         type: 'LOAD_FAVORITES',
//         payload: [1, 2, 3],
//       });
//       expect(state.favoriteIds).toEqual([1, 2, 3]);
//       expect(state.isLoaded).toBe(true);
//     });
//   });

//   describe('TOGGLE_FAVORITE', () => {
//     it('adds a product to favorites when not present', () => {
//       const state = favoritesReducer(
//         {...initialFavoritesState, isLoaded: true},
//         {type: 'TOGGLE_FAVORITE', payload: 5},
//       );
//       expect(state.favoriteIds).toContain(5);
//     });

//     it('removes a product from favorites when already present', () => {
//       const state = favoritesReducer(
//         {...initialFavoritesState, favoriteIds: [5, 10], isLoaded: true},
//         {type: 'TOGGLE_FAVORITE', payload: 5},
//       );
//       expect(state.favoriteIds).not.toContain(5);
//       expect(state.favoriteIds).toContain(10);
//     });
//   });

//   describe('REMOVE_FAVORITE', () => {
//     it('removes a specific favorite', () => {
//       const state = favoritesReducer(
//         {...initialFavoritesState, favoriteIds: [1, 2, 3], isLoaded: true},
//         {type: 'REMOVE_FAVORITE', payload: 2},
//       );
//       expect(state.favoriteIds).toEqual([1, 3]);
//     });

//     it('does nothing if id is not in favorites', () => {
//       const state = favoritesReducer(
//         {...initialFavoritesState, favoriteIds: [1, 3], isLoaded: true},
//         {type: 'REMOVE_FAVORITE', payload: 99},
//       );
//       expect(state.favoriteIds).toEqual([1, 3]);
//     });
//   });
// });
