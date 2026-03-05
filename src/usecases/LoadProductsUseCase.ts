import {ProductsResponse} from '../types/product';
import {ProductRepository} from '../repositories/ProductRepository';

/**
 * Use case: load the initial page of products.
 * Routes to a category-filtered or full-catalog fetch depending on
 * the currently selected category.
 */
export class LoadProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(
    selectedCategory: string | null,
    limit: number,
  ): Promise<ProductsResponse> {
    if (selectedCategory) {
      return this.productRepository.getProductsByCategory(selectedCategory);
    }
    return this.productRepository.getProducts(limit, 0);
  }
}
