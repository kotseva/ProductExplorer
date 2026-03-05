import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
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
import { FontSizes, FontWeights, Layout, Sizes } from '../theme/constants';

const GRID_PADDING = Layout.screenPadding;
const CARD_GAP = Layout.cardGap;
const NUM_COLUMNS = Layout.numColumns;
const SKELETON_ROWS = [0, 1, 2];

export function MainScreen() {
  const {selectCategory, loadMoreProducts, loadProducts} = useProducts();
  const state = useProductsLoader();
  const {toggleFavorite, isFavorite} = useFavorites();
  const {colors} = useThemeColors();
  const {width: screenWidth} = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const flatListRef = useRef<FlatList<Product>>(null);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
    // Reset scroll position so the user sees the freshly loaded content from the top
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  }, [loadProducts]);

  // Evenly distribute available width after subtracting outer padding and inter-column gaps
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
    // Only apply safe-area inset at the top; the bottom is handled by the FlatList's paddingBottom
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
          testID="product-list"
          ref={flatListRef}
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
          // Trigger pagination when the user scrolls within half a screen-length of the bottom
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
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
    paddingHorizontal: Sizes.sm,
    paddingVertical: Sizes.sm,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  columnWrapper: {
    flexDirection: 'row',
  },
  listContent: {
    paddingTop: Sizes.xs,
    paddingBottom: Sizes.xxl,
  },
  separator: {
    height: CARD_GAP,
  },
  skeletonGrid: {
    paddingTop: Sizes.xs,
    gap: CARD_GAP,
  },
  skeletonRow: {
    flexDirection: 'row',
  },
  loadingFooter: {
    paddingVertical: Sizes.md,
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Sizes.lg,
  },
  emptyText: {
    fontSize: FontSizes.sm,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: Sizes.sm,
    paddingHorizontal: Sizes.md,
    paddingVertical: Sizes.xs,
    backgroundColor: Colors.primary,
    borderRadius: Sizes.pill,
  },
  retryText: {
    color: Colors.white,
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.semibold,
  },
});
