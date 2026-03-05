// Component test
import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import {ProductDetailsScreen} from '../screens/ProductDetailsScreen';
import {FavoritesProvider} from '../store/FavoritesContext';
import {createMockProduct} from './fixtures';
import {Product} from '../types/product';

function renderScreen(product: Product) {
  const route = {params: {product}} as any;
  return render(
    <FavoritesProvider>
      <ProductDetailsScreen route={route} navigation={null as any} />
    </FavoritesProvider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('ProductDetailsScreen', () => {
  it('renders the unfilled heart when product is not a favorite', async () => {
    const product = createMockProduct({id: 999});
    const {getByText} = renderScreen(product);

    await waitFor(() => {
      expect(getByText('♡')).toBeTruthy();
    });
  });

  it('toggles the favorite state when the favorite button is pressed', async () => {
    const product = createMockProduct({id: 42});
    const {getByText} = renderScreen(product);

    await waitFor(() => {
      expect(getByText('♡')).toBeTruthy();
    });

    fireEvent.press(getByText('♡'));

    await waitFor(() => {
      expect(getByText('♥')).toBeTruthy();
    });
  });

  it('uses the thumbnail when images array is empty', async () => {
    const product = createMockProduct({
      images: [],
      thumbnail: 'https://example.com/thumb.webp',
    });
    const {UNSAFE_getAllByType} = renderScreen(product);
    const {Image} = require('react-native');

    await waitFor(() => {
      const images = UNSAFE_getAllByType(Image);
      const sources = images.map((img: any) => img.props.source?.uri);
      expect(sources).toContain('https://example.com/thumb.webp');
    });
  });

  it('uses product images when they are available', async () => {
    const product = createMockProduct({
      images: [
        'https://example.com/img1.webp',
        'https://example.com/img2.webp',
      ],
      thumbnail: 'https://example.com/thumb.webp',
    });
    const {UNSAFE_getAllByType} = renderScreen(product);
    const {Image} = require('react-native');

    await waitFor(() => {
      const images = UNSAFE_getAllByType(Image);
      const sources = images.map((img: any) => img.props.source?.uri);
      expect(sources).toContain('https://example.com/img1.webp');
      expect(sources).toContain('https://example.com/img2.webp');
      expect(sources).not.toContain('https://example.com/thumb.webp');
    });
  });
});
