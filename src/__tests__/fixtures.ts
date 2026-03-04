import {Product, ProductsResponse} from '../types/product';

export function createMockProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1,
    title: 'Test Product',
    description: 'A test product description',
    category: 'beauty',
    price: 9.99,
    discountPercentage: 10.0,
    rating: 4.5,
    stock: 50,
    tags: ['test'],
    brand: 'TestBrand',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        rating: 5,
        comment: 'Great!',
        date: '2025-01-01T00:00:00.000Z',
        reviewerName: 'Tester',
        reviewerEmail: 'test@test.com',
      },
    ],
    images: ['https://example.com/image.webp'],
    thumbnail: 'https://example.com/thumb.webp',
    ...overrides,
  };
}

export function createMockProductsResponse(
  overrides: Partial<ProductsResponse> = {},
): ProductsResponse {
  return {
    products: [createMockProduct(), createMockProduct({id: 2, title: 'Product 2'})],
    total: 2,
    skip: 0,
    limit: 30,
    ...overrides,
  };
}
