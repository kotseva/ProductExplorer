import {Product} from './product';

export type RootStackParamList = {
  Main: undefined;
  ProductDetails: {product: Product};
};
