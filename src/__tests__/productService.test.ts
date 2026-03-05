// Helper function test
import {
  fetchProducts,
  fetchProductById,
  fetchProductsByCategory,
} from '../api/productService';
import {createMockProduct, createMockProductsResponse} from './fixtures';

const mockFetch = jest.fn();
(globalThis as any).fetch = mockFetch;

function mockSuccessResponse(data: unknown) {
  mockFetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve(data),
  });
}

describe('productService', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  describe('fetchProducts', () => {
    it('fetches products with default pagination', async () => {
      const response = createMockProductsResponse();
      mockSuccessResponse(response);

      const result = await fetchProducts();
      expect(result).toEqual(response);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=30&skip=0',
        expect.any(Object),
      );
    });

    it('fetches products with custom pagination', async () => {
      const response = createMockProductsResponse();
      mockSuccessResponse(response);

      await fetchProducts(10, 20);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products?limit=10&skip=20',
        expect.any(Object),
      );
    });
  });

  describe('fetchProductById', () => {
    it('fetches a single product', async () => {
      const product = createMockProduct({id: 42});
      mockSuccessResponse(product);

      const result = await fetchProductById(42);
      expect(result).toEqual(product);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/42',
        expect.any(Object),
      );
    });
  });

  describe('fetchProductsByCategory', () => {
    it('fetches products by category', async () => {
      const response = createMockProductsResponse();
      mockSuccessResponse(response);

      const result = await fetchProductsByCategory('beauty');
      expect(result).toEqual(response);
      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/beauty',
        expect.any(Object),
      );
    });
  });
});
