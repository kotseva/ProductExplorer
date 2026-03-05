import React, {useCallback, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Product} from '../types/product';
import {RootStackParamList} from '../types/navigation';
import {Colors} from '../theme/colors';
import {useThemeColors} from '../hooks/useThemeColors';
import {useProducts, useProductsLoader} from '../hooks/useProducts';
import {useFavorites} from '../hooks/useFavorites';
import {ProductCard} from '../components/ProductCard';
import {ProductGridSkeleton} from '../components/ProductGridSkeleton';
import {EmptyState} from '../components/EmptyState';
import {CategoryFilter} from '../components/CategoryFilter';
import {
  styles,
  GRID_PADDING,
  CARD_GAP,
  NUM_COLUMNS,
} from './mainScreen.styles';

export function MainScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          onPress={() =>
            navigation.navigate('ProductDetails', {product: item})
          }
        />
      </View>
    ),
    [cardWidth, isFavorite, toggleFavorite, navigation],
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

      {!(isEmpty && state.error) && (
        <CategoryFilter
          categories={state.categories}
          selectedCategory={state.selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      )}

      {isInitialLoading ? (
        <ProductGridSkeleton cardWidth={cardWidth} />
      ) : isEmpty ? (
        <EmptyState
          hasError={!!state.error}
          textColor={colors.textSecondary}
          onRetry={loadProducts}
        />
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
