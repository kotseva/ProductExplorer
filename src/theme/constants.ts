// ─── 8-point grid sizes ──────────────────────────────────────
export const Sizes = {
    xxs: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
    xxxl: 64,
    pill: 9999,
  } as const;

// ─── Layout ──────────────────────────────────────────────────
export const Layout = {
    screenPadding: Sizes.sm,        
    cardGap: Sizes.xs,
    chipGap: Sizes.xs,
    listPaddingTop: Sizes.xs,
    listPaddingBottom: Sizes.xxl,
    numColumns: 2,
  } as const;

// ─── Typography ──────────────────────────────────────────────
export const FontSizes = {
    xs: 12,
    sm: 14,
    md: 15,
    lg: 16,
    xl: 18,
  } as const;

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};