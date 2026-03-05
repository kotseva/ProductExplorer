import React from 'react';
import {View} from 'react-native';
import {ProductCardSkeleton} from './ProductCardSkeleton';
import {CARD_GAP, GRID_PADDING, SKELETON_ROWS, styles} from '../screens/mainScreen.styles';

interface ProductGridSkeletonProps {
  cardWidth: number;
}

export function ProductGridSkeleton({cardWidth}: ProductGridSkeletonProps) {
  return (
    <View style={[styles.skeletonGrid, {paddingHorizontal: GRID_PADDING}]}>
      {SKELETON_ROWS.map(rowIdx => (
        <View key={rowIdx} style={[styles.skeletonRow, {gap: CARD_GAP}]}>
          <View style={{width: cardWidth}}>
            <ProductCardSkeleton />
          </View>
          <View style={{width: cardWidth}}>
            <ProductCardSkeleton />
          </View>
        </View>
      ))}
    </View>
  );
}
