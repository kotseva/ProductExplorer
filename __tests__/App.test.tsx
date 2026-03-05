import React from 'react';
import {render, waitFor} from '@testing-library/react-native';
import App from '../App';

test('renders correctly', async () => {
  const {getByText} = render(<App />);
  await waitFor(() => {
    expect(getByText('Product Catalog')).toBeTruthy();
  });
});
