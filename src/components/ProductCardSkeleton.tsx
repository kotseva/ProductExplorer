import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {useThemeColors} from '../hooks/useThemeColors';

export function ProductCardSkeleton() {
  const {colors} = useThemeColors();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      <Animated.View
        style={[
          styles.imagePlaceholder,
          {backgroundColor: colors.skeleton, opacity},
        ]}
      />
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.titleLine,
            {backgroundColor: colors.skeleton, opacity},
          ]}
        />
        <Animated.View
          style={[
            styles.subtitleLine,
            {backgroundColor: colors.skeleton, opacity},
          ]}
        />
        <Animated.View
          style={[
            styles.priceLine,
            {backgroundColor: colors.skeleton, opacity},
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    aspectRatio: 3 / 4,
  },
  content: {
    padding: 12,
    gap: 8,
  },
  titleLine: {
    height: 14,
    borderRadius: 4,
    width: '75%',
  },
  subtitleLine: {
    height: 12,
    borderRadius: 4,
    width: '50%',
  },
  priceLine: {
    height: 14,
    borderRadius: 4,
    width: '33%',
    marginTop: 4,
  },
});
