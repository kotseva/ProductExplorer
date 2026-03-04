import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CategoryChip} from './CategoryChip';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

function formatCategoryLabel(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}
    >
      <CategoryChip
        label="All"
        isSelected={selectedCategory === null}
        onPress={() => onSelectCategory(null)}
      />
      {categories.filter(Boolean).map(category => (
        <CategoryChip
          key={category}
          label={formatCategoryLabel(category)}
          isSelected={selectedCategory === category}
          onPress={() => onSelectCategory(category)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
});
