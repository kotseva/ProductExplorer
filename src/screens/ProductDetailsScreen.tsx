import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/navigation';
import {useThemeColors} from '../hooks/useThemeColors';
import {useFavorites} from '../hooks/useFavorites';
import {FavoriteButton} from '../components/FavoriteButton';
import {ImageCarousel} from '../components/ImageCarousel';
import {ProductInfo} from '../components/ProductInfo';
import {Sizes} from '../theme/constants';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export function ProductDetailsScreen({route}: Props) {
  const {product} = route.params;
  const {colors} = useThemeColors();
  const {toggleFavorite, isFavorite} = useFavorites();

  const images =
    product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <View testID="product-details-screen" style={[styles.root, {backgroundColor: colors.background}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <ImageCarousel
          images={images}
          backgroundColor={colors.imagePlaceholder}
          overlay={
            <View style={styles.favoriteWrapper}>
              <FavoriteButton
                testID="favorite-btn-details"
                isFavorite={isFavorite(product.id)}
                onPress={() => toggleFavorite(product.id)}
              />
            </View>
          }
        />

        <ProductInfo
          category={product.category}
          title={product.title}
          brand={product.brand}
          price={product.price}
          discountPercentage={product.discountPercentage}
          description={product.description}
          colors={colors}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Sizes.xxl,
  },
  favoriteWrapper: {
    position: 'absolute',
    top: Sizes.sm,
    right: Sizes.sm,
  },
});
