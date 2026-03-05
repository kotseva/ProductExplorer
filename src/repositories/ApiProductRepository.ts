import {ProductsResponse} from '../types/product';
import {ProductRepository} from './ProductRepository';
import {
  fetchProducts,
  fetchProductsByCategory,
  fetchCategories,
} from '../api/productService';

/**
 * Concrete implementation of ProductRepository that fetches data
 * from the DummyJSON REST API via the productService layer.
 */
export class ApiProductRepository implements ProductRepository {
  async getProducts(limit: number, skip: number): Promise<ProductsResponse> {
    return fetchProducts(limit, skip);
  }

  async getProductsByCategory(category: string): Promise<ProductsResponse> {
    return fetchProductsByCategory(category);
  }

  async getCategories(): Promise<string[]> {
    return fetchCategories();
  }
}
