// Helper function test
import {
  productsReducer,
  initialProductsState,
  ProductsState,
} from '../store/productsReducer';
import {createMockProduct} from './fixtures';

describe('productsReducer', () => {
  it('returns initial state for unknown action', () => {
    const state = productsReducer(initialProductsState, {
      type: 'UNKNOWN' as any,
    });
    expect(state).toEqual(initialProductsState);
  });

  describe('FETCH_PRODUCTS_START', () => {
    it('sets isLoading true and clears error', () => {
      const prevState: ProductsState = {
        ...initialProductsState,
        error: 'previous error',
      };
      const state = productsReducer(prevState, {type: 'FETCH_PRODUCTS_START'});
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
  });

  describe('FETCH_PRODUCTS_SUCCESS', () => {
    it('stores products and updates pagination', () => {
      const products = [createMockProduct(), createMockProduct({id: 2})];
      const state = productsReducer(
        {...initialProductsState, isLoading: true},
        {
          type: 'FETCH_PRODUCTS_SUCCESS',
          payload: {products, total: 100, skip: 2},
        },
      );
      expect(state.isLoading).toBe(false);
      expect(state.products).toEqual(products);
      expect(state.total).toBe(100);
      expect(state.skip).toBe(2);
      expect(state.error).toBeNull();
    });
  });

  describe('FETCH_PRODUCTS_FAILURE', () => {
    it('sets error and stops loading', () => {
      const state = productsReducer(
        {...initialProductsState, isLoading: true},
        {type: 'FETCH_PRODUCTS_FAILURE', payload: 'Network error'},
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Network error');
    });
  });

  describe('FETCH_MORE_SUCCESS', () => {
    it('appends products to existing list', () => {
      const existing = [createMockProduct({id: 1})];
      const newProducts = [createMockProduct({id: 2})];
      const state = productsReducer(
        {...initialProductsState, products: existing, isLoadingMore: true},
        {
          type: 'FETCH_MORE_SUCCESS',
          payload: {products: newProducts, total: 100, skip: 2},
        },
      );
      expect(state.products).toHaveLength(2);
      expect(state.products[0].id).toBe(1);
      expect(state.products[1].id).toBe(2);
      expect(state.isLoadingMore).toBe(false);
    });
  });

  describe('SET_CATEGORIES', () => {
    it('stores categories', () => {
      const categories = ['beauty', 'electronics'];
      const state = productsReducer(initialProductsState, {
        type: 'SET_CATEGORIES',
        payload: categories,
      });
      expect(state.categories).toEqual(categories);
    });
  });

  describe('SET_SELECTED_CATEGORY', () => {
    it('updates selected category', () => {
      const state = productsReducer(initialProductsState, {
        type: 'SET_SELECTED_CATEGORY',
        payload: 'beauty',
      });
      expect(state.selectedCategory).toBe('beauty');
    });

    it('clears selected category with null', () => {
      const state = productsReducer(
        {...initialProductsState, selectedCategory: 'beauty'},
        {type: 'SET_SELECTED_CATEGORY', payload: null},
      );
      expect(state.selectedCategory).toBeNull();
    });
  });

  describe('RESET_PRODUCTS', () => {
    it('resets products but keeps categories and selection', () => {
      const prevState: ProductsState = {
        ...initialProductsState,
        products: [createMockProduct()],
        categories: ['beauty'],
        selectedCategory: 'beauty',
        total: 50,
        skip: 10,
      };
      const state = productsReducer(prevState, {type: 'RESET_PRODUCTS'});
      expect(state.products).toEqual([]);
      expect(state.total).toBe(0);
      expect(state.skip).toBe(0);
      expect(state.categories).toEqual(['beauty']);
      expect(state.selectedCategory).toBe('beauty');
    });
  });
});
