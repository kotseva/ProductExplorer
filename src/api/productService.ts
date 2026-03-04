import {Product, ProductsResponse} from '../types/product';
import {apiGet} from './client';

const PRODUCTS_ENDPOINT = '/products';

export async function fetchProducts(
  limit: number = 30,
  skip: number = 0,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>(
    `${PRODUCTS_ENDPOINT}?limit=${limit}&skip=${skip}`,
  );
}

export async function fetchProductById(id: number): Promise<Product> {
  return apiGet<Product>(`${PRODUCTS_ENDPOINT}/${id}`);
}

export async function fetchProductsByCategory(
  category: string,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>(
    `${PRODUCTS_ENDPOINT}/category/${encodeURIComponent(category)}`,
  );
}

export async function fetchCategories(): Promise<string[]> {
  const data = await apiGet<Array<{slug: string; name: string; url: string}>>(
    `${PRODUCTS_ENDPOINT}/category-list`,
  );
  return data.map(c => c.slug);
}

export async function searchProducts(
  query: string,
): Promise<ProductsResponse> {
  return apiGet<ProductsResponse>(
    `${PRODUCTS_ENDPOINT}/search?q=${encodeURIComponent(query)}`,
  );
}
