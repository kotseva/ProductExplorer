import React, {memo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Product} from '../types/product';
import {Colors} from '../theme/colors';
import {useThemeColors} from '../hooks/useThemeColors';
import {FavoriteButton} from './FavoriteButton';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onFavoritePress: () => void;
}

export const ProductCard = memo(function ProductCard({
  product,
  isFavorite,
  onPress,
  onFavoritePress,
}: ProductCardProps) {
  const {colors} = useThemeColors();

  const subtitle = [product.brand, product.category]
    .filter(Boolean)
    .join(' \u2022 ');

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.container,
        {backgroundColor: colors.surface},
        pressed && styles.pressed,
      ]}
    >
      <View
        style={[
          styles.imageContainer,
          {backgroundColor: colors.imagePlaceholder},
        ]}
      >
        <Image
          source={{uri: product.thumbnail}}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.favoriteWrapper}>
          <FavoriteButton isFavorite={isFavorite} onPress={onFavoritePress} />
        </View>
      </View>
      <View style={styles.content}>
        <Text
          style={[styles.title, {color: colors.text}]}
          numberOfLines={2}
        >
          {product.title}
        </Text>
        {subtitle ? (
          <Text
            style={[styles.subtitle, {color: colors.textSecondary}]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
        <View style={styles.priceRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  pressed: {
    opacity: 0.92,
  },
  imageContainer: {
    aspectRatio: 3 / 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteWrapper: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  content: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  subtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  priceRow: {
    marginTop: 'auto',
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});
