import {ProductsResponse} from '../types/product';
import {fetchProducts, fetchProductsByCategory} from '../api/productService';

//Decides whether to fetch all products or filter by category
export class LoadProductsUseCase {
  async execute(
    selectedCategory: string | null,
    limit: number,
  ): Promise<ProductsResponse> {
    if (selectedCategory) {
      return fetchProductsByCategory(selectedCategory);
    }
    return fetchProducts(limit, 0);
  }
}
