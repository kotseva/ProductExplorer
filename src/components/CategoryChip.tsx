import React, {memo} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Colors} from '../theme/colors';
import {useThemeColors} from '../hooks/useThemeColors';
import { Sizes } from '../theme/constants';

interface CategoryChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const CategoryChip = memo(function CategoryChip({
  label,
  isSelected,
  onPress,
}: CategoryChipProps) {
  const {colors} = useThemeColors();

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.chip,
        isSelected
          ? styles.chipSelected
          : [styles.chipDefault, {backgroundColor: colors.surface, borderColor: colors.border}],
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.label,
          isSelected ? styles.labelSelected : {color: colors.textSecondary},
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: Sizes.pill,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  chipDefault: {
    borderWidth: 1,
  },
  pressed: {
    transform: [{scale: 0.95}],
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  labelSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
});
