import {StyleSheet} from 'react-native';
import {Colors} from '../theme/colors';
import {FontSizes, FontWeights, Layout, Sizes} from '../theme/constants';

export const GRID_PADDING = Layout.screenPadding;
export const CARD_GAP = Layout.cardGap;
export const NUM_COLUMNS = Layout.numColumns;
export const SKELETON_ROWS = [0, 1, 2];

export const styles = StyleSheet.create({
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
