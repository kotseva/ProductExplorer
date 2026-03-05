import {fetchCategories} from '../api/productService';

//Fetches the list of available product categories
export class LoadCategoriesUseCase {
  async execute(): Promise<string[]> {
    return fetchCategories();
  }
}
