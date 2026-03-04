import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Product} from '../types/product';
import {Colors} from '../theme/colors';
import {useThemeColors} from '../hooks/useThemeColors';
import {useProducts, useProductsLoader} from '../hooks/useProducts';
import {useFavorites} from '../hooks/useFavorites';
import {ProductCard} from '../components/ProductCard';
import {ProductCardSkeleton} from '../components/ProductCardSkeleton';
import {CategoryFilter} from '../components/CategoryFilter';

const GRID_PADDING = 16;
const CARD_GAP = 12;
const NUM_COLUMNS = 2;
const SKELETON_ROWS = [0, 1, 2];

export function MainScreen() {
  const {selectCategory, loadMoreProducts, loadProducts} = useProducts();
  const state = useProductsLoader();
  const {toggleFavorite, isFavorite} = useFavorites();
  const {colors} = useThemeColors();
  const {width: screenWidth} = useWindowDimensions();

  const cardWidth =
    (screenWidth - GRID_PADDING * 2 - CARD_GAP * (NUM_COLUMNS - 1)) /
    NUM_COLUMNS;

  const handleCategorySelect = useCallback(
    (category: string | null) => {
      selectCategory(category);
    },
    [selectCategory],
  );

  const handleLoadMore = useCallback(() => {
    loadMoreProducts();
  }, [loadMoreProducts]);

  const renderProduct = useCallback(
    ({item}: {item: Product}) => (
      <View style={{width: cardWidth}}>
        <ProductCard
          product={item}
          isFavorite={isFavorite(item.id)}
          onFavoritePress={() => toggleFavorite(item.id)}
          onPress={() => {}}
        />
      </View>
    ),
    [cardWidth, isFavorite, toggleFavorite],
  );

  const renderFooter = useCallback(() => {
    if (!state.isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.loadingFooter}>
        <ActivityIndicator size="small" color={Colors.primary} />
      </View>
    );
  }, [state.isLoadingMore]);

  const keyExtractor = useCallback(
    (item: Product) => item.id.toString(),
    [],
  );

  const isInitialLoading = state.isLoading && state.products.length === 0;
  const isEmpty = !state.isLoading && state.products.length === 0;

  return (
    <SafeAreaView
      style={[styles.safeArea, {backgroundColor: colors.background}]}
      edges={['top']}
    >
      <View
        style={[styles.header, {borderBottomColor: colors.headerBorder}]}
      >
        <Text style={[styles.headerTitle, {color: colors.text}]}>
          Product Catalog
        </Text>
      </View>

      <CategoryFilter
        categories={state.categories}
        selectedCategory={state.selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {isInitialLoading ? (
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
      ) : isEmpty ? (
        <View style={styles.emptyContainer}>
          {state.error ? (
            <>
              <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
                {state.error}
              </Text>
              <Pressable
                onPress={loadProducts}
                style={styles.retryButton}
              >
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            </>
          ) : (
            <Text style={[styles.emptyText, {color: colors.textSecondary}]}>
              No products found
            </Text>
          )}
        </View>
      ) : (
        <FlatList
          data={state.products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          numColumns={NUM_COLUMNS}
          columnWrapperStyle={[
            styles.columnWrapper,
            {gap: CARD_GAP, paddingHorizontal: GRID_PADDING},
          ]}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={ItemSeparator}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

function ItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  columnWrapper: {
    flexDirection: 'row',
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 48,
  },
  separator: {
    height: CARD_GAP,
  },
  skeletonGrid: {
    paddingTop: 8,
    gap: CARD_GAP,
  },
  skeletonRow: {
    flexDirection: 'row',
  },
  loadingFooter: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 15,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 9999,
  },
  retryText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
});
