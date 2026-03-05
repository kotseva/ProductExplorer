import {ProductsResponse} from '../types/product';
import {ProductRepository} from '../repositories/ProductRepository';

export interface LoadMoreProductsParams {
  currentCount: number;
  total: number;
  selectedCategory: string | null;
  limit: number;
  skip: number;
}

/**
 * Use case: infinite-scroll pagination.
 * Exposes a canLoadMore() guard to check whether more pages exist,
 * and execute() to fetch the next page from the current offset.
 */
export class LoadMoreProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  canLoadMore(currentCount: number, total: number): boolean {
    return currentCount < total;
  }

  async execute(params: LoadMoreProductsParams): Promise<ProductsResponse> {
    const {selectedCategory, limit, skip} = params;
    if (selectedCategory) {
      return this.productRepository.getProductsByCategory(selectedCategory);
    }
    return this.productRepository.getProducts(limit, skip);
  }
}
