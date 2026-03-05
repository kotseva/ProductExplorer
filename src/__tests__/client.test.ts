// Helper function test
import {apiGet, ApiError, NetworkError} from '../api/client';

const mockFetch = jest.fn();
(globalThis as any).fetch = mockFetch;

describe('apiGet', () => {
  beforeEach(() => {
    mockFetch.mockReset();
  });

  it('returns parsed JSON on success', async () => {
    const data = {message: 'ok'};
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(data),
    });

    const result = await apiGet('/test');
    expect(result).toEqual(data);
    expect(mockFetch).toHaveBeenCalledWith(
      'https://dummyjson.com/test',
      expect.objectContaining({method: 'GET'}),
    );
  });

  it('throws ApiError on non-ok response', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: () => Promise.resolve('Not found'),
    });

    try {
      await apiGet('/missing');
      fail('Expected ApiError to be thrown');
    } catch (error) {
      expect(error).toBeInstanceOf(ApiError);
      expect((error as ApiError).status).toBe(404);
    }
  });

  it('throws NetworkError on fetch failure', async () => {
    mockFetch.mockRejectedValueOnce(new TypeError('Failed to fetch'));

    await expect(apiGet('/offline')).rejects.toThrow(NetworkError);
  });

  it('throws NetworkError with original message', async () => {
    const errorMsg = 'DNS resolution failed';
    mockFetch.mockRejectedValueOnce(new Error(errorMsg));

    try {
      await apiGet('/broken');
    } catch (error) {
      expect(error).toBeInstanceOf(NetworkError);
      expect((error as NetworkError).message).toBe(errorMsg);
    }
  });
});
