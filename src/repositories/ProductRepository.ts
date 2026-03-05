import {ProductsResponse} from '../types/product';

/**
 * Abstraction for product data access.
 * Use cases depend on this interface, not on concrete API/network details.
 */
export interface ProductRepository {
  getProducts(limit: number, skip: number): Promise<ProductsResponse>;
  getProductsByCategory(category: string): Promise<ProductsResponse>;
  getCategories(): Promise<string[]>;
}
