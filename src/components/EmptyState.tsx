import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {styles} from '../screens/mainScreen.styles';

interface EmptyStateProps {
  hasError: boolean;
  textColor: string;
  onRetry: () => void;
}

export function EmptyState({hasError, textColor, onRetry}: EmptyStateProps) {
  return (
    <View style={styles.emptyContainer}>
      {hasError ? (
        <>
          <Text style={[styles.emptyText, {color: textColor}]}>
            Please check your connection and try again.
          </Text>
          <Pressable onPress={onRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </>
      ) : (
        <Text style={[styles.emptyText, {color: textColor}]}>
          No products found
        </Text>
      )}
    </View>
  );
}
