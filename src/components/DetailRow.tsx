import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FontSizes, FontWeights} from '../theme/constants';

interface DetailRowProps {
  label: string;
  value: string;
  colors: {text: string; textSecondary: string};
}

export function DetailRow({label, value, colors}: DetailRowProps) {
  return (
    <View style={styles.row}>
      <Text style={[styles.label, {color: colors.textSecondary}]}>
        {label}
      </Text>
      <Text style={[styles.value, {color: colors.text}]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: FontSizes.sm,
  },
  value: {
    fontSize: FontSizes.sm,
    fontWeight: FontWeights.medium,
  },
});
