import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {Colors} from '../theme/colors';
import {useThemeColors} from '../hooks/useThemeColors';
import { Sizes } from '../theme/constants';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
  size?: number;
  testID?: string;
}

export function FavoriteButton({
  isFavorite,
  onPress,
  size = 20,
  testID,
}: FavoriteButtonProps) {
  const {colors} = useThemeColors();

  return (
    <Pressable
      testID={testID}
      accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        {backgroundColor: colors.favoriteButton},
        pressed && styles.pressed,
      ]}
      hitSlop={8}
    >
      <Text
        style={[
          styles.icon,
          {
            fontSize: size,
            color: isFavorite ? Colors.primary : colors.favoriteDefault,
            lineHeight: size + 4,
          },
        ]}
      >
        {isFavorite ? '♥' : '♡'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: Sizes.lg,
    height: Sizes.lg,
    borderRadius: Sizes.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{scale: 0.9}],
  },
  icon: {
    textAlign: 'center',
  },
});
