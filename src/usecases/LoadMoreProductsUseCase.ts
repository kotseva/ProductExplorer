import {ProductsResponse} from '../types/product';
import {fetchProducts, fetchProductsByCategory} from '../api/productService';

//Handles pagination
export interface LoadMoreProductsParams {
  currentCount: number;
  total: number;
  selectedCategory: string | null;
  limit: number;
  skip: number;
}

export class LoadMoreProductsUseCase {
  canLoadMore(currentCount: number, total: number): boolean {
    return currentCount < total;
  }

  //Fetches the next page of products
  async execute(params: LoadMoreProductsParams): Promise<ProductsResponse> {
    const {selectedCategory, limit, skip} = params;
    if (selectedCategory) {
      return fetchProductsByCategory(selectedCategory);
    }
    return fetchProducts(limit, skip);
  }
}
