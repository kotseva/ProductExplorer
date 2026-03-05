import React, {createContext, useReducer, useCallback, useMemo} from 'react';
import {Product} from '../types/product';
import {LoadProductsUseCase} from '../usecases/LoadProductsUseCase';
import {LoadMoreProductsUseCase} from '../usecases/LoadMoreProductsUseCase';
import {LoadCategoriesUseCase} from '../usecases/LoadCategoriesUseCase';
import {
  ProductsState,
  ProductsAction,
  initialProductsState,
  productsReducer,
} from './productsReducer';

const loadProductsUseCase = new LoadProductsUseCase();
const loadMoreProductsUseCase = new LoadMoreProductsUseCase();
const loadCategoriesUseCase = new LoadCategoriesUseCase();

interface ProductsContextValue {
  state: ProductsState;
  dispatch: React.Dispatch<ProductsAction>;
  loadProducts: () => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  loadCategories: () => Promise<void>;
  selectCategory: (category: string | null) => Promise<void>;
  getProductById: (id: number) => Product | undefined;
}

export const ProductsContext = createContext<ProductsContextValue | undefined>(
  undefined,
);

interface ProductsProviderProps {
  children: React.ReactNode;
}

export function ProductsProvider({children}: ProductsProviderProps) {
  const [state, dispatch] = useReducer(productsReducer, initialProductsState);

  const loadProducts = useCallback(async () => {
    dispatch({type: 'FETCH_PRODUCTS_START'});
    try {
      const response = await loadProductsUseCase.execute(
        state.selectedCategory,
        state.limit,
      );

      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: {
          products: response.products,
          total: response.total,
          skip: response.skip + response.products.length,
        },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        payload:
          error instanceof Error ? error.message : 'Failed to load products',
      });
    }
  }, [state.selectedCategory, state.limit]);

  const loadMoreProducts = useCallback(async () => {
    if (
      state.isLoadingMore ||
      state.isLoading ||
      !loadMoreProductsUseCase.canLoadMore(state.products.length, state.total)
    ) {
      return;
    }

    dispatch({type: 'FETCH_MORE_START'});
    try {
      const response = await loadMoreProductsUseCase.execute({
        currentCount: state.products.length,
        total: state.total,
        selectedCategory: state.selectedCategory,
        limit: state.limit,
        skip: state.skip,
      });

      dispatch({
        type: 'FETCH_MORE_SUCCESS',
        payload: {
          products: response.products,
          total: response.total,
          skip: state.skip + response.products.length,
        },
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_MORE_FAILURE',
        payload:
          error instanceof Error
            ? error.message
            : 'Failed to load more products',
      });
    }
  }, [
    state.isLoadingMore,
    state.isLoading,
    state.products.length,
    state.total,
    state.selectedCategory,
    state.limit,
    state.skip,
  ]);

  const loadCategories = useCallback(async () => {
    try {
      const categories = await loadCategoriesUseCase.execute();
      dispatch({type: 'SET_CATEGORIES', payload: categories});
    } catch {
      // Categories are non-critical; silently fail
    }
  }, []);

  const selectCategory = useCallback(async (category: string | null) => {
    dispatch({type: 'SET_SELECTED_CATEGORY', payload: category});
    dispatch({type: 'RESET_PRODUCTS'});
  }, []);

  const getProductById = useCallback(
    (id: number): Product | undefined => {
      return state.products.find(p => p.id === id);
    },
    [state.products],
  );

  const value = useMemo<ProductsContextValue>(
    () => ({
      state,
      dispatch,
      loadProducts,
      loadMoreProducts,
      loadCategories,
      selectCategory,
      getProductById,
    }),
    [
      state,
      loadProducts,
      loadMoreProducts,
      loadCategories,
      selectCategory,
      getProductById,
    ],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}
