import {Product} from '../types/product';

export interface ProductsState {
  products: Product[];
  categories: string[];
  selectedCategory: string | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  total: number;
  skip: number;
  limit: number;
}

export const initialProductsState: ProductsState = {
  products: [],
  categories: [],
  selectedCategory: null,
  isLoading: false,
  isLoadingMore: false,
  error: null,
  total: 0,
  skip: 0,
  limit: 30,
};

export type ProductsAction =
  | {type: 'FETCH_PRODUCTS_START'}
  | {type: 'FETCH_PRODUCTS_SUCCESS'; payload: {products: Product[]; total: number; skip: number}}
  | {type: 'FETCH_PRODUCTS_FAILURE'; payload: string}
  | {type: 'FETCH_MORE_START'}
  | {type: 'FETCH_MORE_SUCCESS'; payload: {products: Product[]; total: number; skip: number}}
  | {type: 'FETCH_MORE_FAILURE'; payload: string}
  | {type: 'SET_CATEGORIES'; payload: string[]}
  | {type: 'SET_SELECTED_CATEGORY'; payload: string | null}
  | {type: 'RESET_PRODUCTS'};

export function productsReducer(
  state: ProductsState,
  action: ProductsAction,
): ProductsState {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {...state, isLoading: true, error: null};

    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        total: action.payload.total,
        skip: action.payload.skip,
        error: null,
      };

    case 'FETCH_PRODUCTS_FAILURE':
      return {...state, isLoading: false, error: action.payload};

    case 'FETCH_MORE_START':
      return {...state, isLoadingMore: true};

    case 'FETCH_MORE_SUCCESS':
      return {
        ...state,
        isLoadingMore: false,
        products: [...state.products, ...action.payload.products],
        total: action.payload.total,
        skip: action.payload.skip,
      };

    case 'FETCH_MORE_FAILURE':
      return {...state, isLoadingMore: false, error: action.payload};

    case 'SET_CATEGORIES':
      return {...state, categories: action.payload};

    case 'SET_SELECTED_CATEGORY':
      return {...state, selectedCategory: action.payload};

    case 'RESET_PRODUCTS':
      return {
        ...initialProductsState,
        categories: state.categories,
        selectedCategory: state.selectedCategory,
      };

    default:
      return state;
  }
}
