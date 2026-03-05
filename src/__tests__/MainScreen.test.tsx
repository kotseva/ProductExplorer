import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react-native';
import {MainScreen} from '../screens/MainScreen';
import {ProductsProvider} from '../store/ProductsContext';
import {FavoritesProvider} from '../store/FavoritesContext';
import {createMockProduct, createMockProductsResponse} from './fixtures';
import * as productService from '../api/productService';

jest.mock('../api/productService');

const mockedService = productService as jest.Mocked<typeof productService>;

const mockResponse = createMockProductsResponse({
  products: [
    createMockProduct({id: 1, title: 'Product A'}),
    createMockProduct({id: 2, title: 'Product B'}),
  ],
  total: 2,
  skip: 0,
  limit: 30,
});

function renderMainScreen() {
  return render(
    <ProductsProvider>
      <FavoritesProvider>
        <MainScreen />
      </FavoritesProvider>
    </ProductsProvider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockedService.fetchCategories.mockResolvedValue(['beauty', 'electronics']);
  mockedService.fetchProducts.mockResolvedValue(mockResponse);
});

describe('MainScreen pull to refresh', () => {
  it('renders a RefreshControl on the product list', async () => {
    const {getByTestId, getByText} = renderMainScreen();

    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
    });

    const flatList = getByTestId('product-list');
    expect(flatList.props.refreshControl).toBeTruthy();
  });

  it('calls loadProducts when the user pulls to refresh', async () => {
    const {getByTestId, getByText} = renderMainScreen();

    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
    });

    mockedService.fetchProducts.mockClear();

    const refreshControl = getByTestId('product-list').props.refreshControl;

    await act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(mockedService.fetchProducts).toHaveBeenCalledTimes(1);
  });

  it('sets refreshing to true while loading and false after', async () => {
    let resolveRefresh!: (value: typeof mockResponse) => void;
    const {getByTestId, getByText} = renderMainScreen();

    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
    });

    mockedService.fetchProducts.mockReturnValue(
      new Promise(resolve => {
        resolveRefresh = resolve;
      }),
    );

    const flatList = getByTestId('product-list');

    await act(async () => {
      flatList.props.refreshControl.props.onRefresh();
    });

    expect(getByTestId('product-list').props.refreshControl.props.refreshing).toBe(true);

    await act(async () => {
      resolveRefresh(mockResponse);
    });

    await waitFor(() => {
      expect(getByTestId('product-list').props.refreshControl.props.refreshing).toBe(false);
    });
  });

  it('replaces stale data with fresh data after refresh', async () => {
    const {getByTestId, getByText, queryByText} = renderMainScreen();

    await waitFor(() => {
      expect(getByText('Product A')).toBeTruthy();
    });

    const freshResponse = createMockProductsResponse({
      products: [
        createMockProduct({id: 3, title: 'Fresh Product'}),
      ],
      total: 1,
      skip: 0,
    });
    mockedService.fetchProducts.mockResolvedValue(freshResponse);

    const refreshControl = getByTestId('product-list').props.refreshControl;

    await act(async () => {
      refreshControl.props.onRefresh();
    });

    await waitFor(() => {
      expect(getByText('Fresh Product')).toBeTruthy();
    });

    expect(queryByText('Product A')).toBeNull();
  });
});
