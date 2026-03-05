import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors, ThemeColors} from '../theme/colors';
import {FontSizes, FontWeights, Sizes} from '../theme/constants';

interface ProductInfoProps {
  category: string;
  title: string;
  brand?: string;
  price: number;
  discountPercentage: number;
  description: string;
  colors: ThemeColors;
}

export function ProductInfo({
  category,
  title,
  brand,
  price,
  discountPercentage,
  description,
  colors,
}: ProductInfoProps) {
  return (
    <View style={styles.body}>
      <Text style={[styles.category, {color: colors.textSecondary}]}>
        {category}
      </Text>
      <Text style={[styles.title, {color: colors.text}]}>{title}</Text>
      {brand ? (
        <Text style={[styles.brand, {color: colors.textSecondary}]}>
          {brand}
        </Text>
      ) : null}

      <View style={styles.priceRow}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        {discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              -{discountPercentage.toFixed(0)}%
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.divider, {backgroundColor: colors.border}]} />

      <Text style={[styles.sectionTitle, {color: colors.text}]}>
        Description
      </Text>
      <Text style={[styles.description, {color: colors.textSecondary}]}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: Sizes.sm,
  },
  category: {
    fontSize: FontSizes.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Sizes.xxs,
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: FontWeights.bold,
    lineHeight: 26,
  },
  brand: {
    fontSize: FontSizes.sm,
    marginTop: Sizes.xxs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.sm,
    gap: Sizes.xs,
  },
  price: {
    fontSize: 28,
    fontWeight: FontWeights.bold,
    color: Colors.primary,
  },
  discountBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Sizes.xs,
    paddingVertical: Sizes.xxs,
    borderRadius: Sizes.xxs,
  },
  discountText: {
    color: Colors.white,
    fontSize: FontSizes.xs,
    fontWeight: FontWeights.semibold,
  },
  divider: {
    height: 1,
    marginVertical: Sizes.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: FontWeights.semibold,
    marginBottom: Sizes.xs,
  },
  description: {
    fontSize: FontSizes.sm,
    lineHeight: 22,
  },
});
