import React, {useCallback, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {Colors} from '../theme/colors';
import {Sizes} from '../theme/constants';

interface ImageCarouselProps {
  images: string[];
  backgroundColor: string;
  overlay?: React.ReactNode;
}

const ASPECT_RATIO = 0.75;

export function ImageCarousel({
  images,
  backgroundColor,
  overlay,
}: ImageCarouselProps) {
  const {width: screenWidth} = useWindowDimensions();
  const imageHeight = screenWidth * ASPECT_RATIO;

  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const index = Math.round(
        event.nativeEvent.contentOffset.x / screenWidth,
      );
      setActiveIndex(index);
    },
    [screenWidth],
  );

  const renderImage = useCallback(
    ({item}: ListRenderItemInfo<string>) => (
      <View style={{width: screenWidth, height: imageHeight}}>
        <Image source={{uri: item}} style={styles.image} resizeMode="contain" />
      </View>
    ),
    [screenWidth, imageHeight],
  );

  return (
    <View style={[styles.container, {backgroundColor, height: imageHeight}]}>
      <FlatList
        ref={flatListRef}
        data={images}
        renderItem={renderImage}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      />
      {images.length > 1 && (
        <View style={styles.pagination}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex ? styles.dotActive : styles.dotInactive,
              ]}
            />
          ))}
        </View>
      )}
      {overlay}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: Sizes.xs,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotActive: {
    backgroundColor: Colors.primary,
  },
  dotInactive: {
    backgroundColor: Colors.white,
    opacity: 0.6,
  },
});
