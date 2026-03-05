import {ProductRepository} from '../repositories/ProductRepository';

/**
 * Use case: retrieve the list of available product categories.
 * Used by the UI to populate the category filter bar.
 */
export class LoadCategoriesUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(): Promise<string[]> {
    return this.productRepository.getCategories();
  }
}
