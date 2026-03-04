import {useContext, useEffect} from 'react';
import {ProductsContext} from '../store/ProductsContext';

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export function useProductsLoader() {
  const {loadProducts, loadCategories, state} = useProducts();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, [loadProducts, loadCategories]);

  return state;
}
