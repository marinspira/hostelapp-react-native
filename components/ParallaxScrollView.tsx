import type { PropsWithChildren, ReactElement } from 'react';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, } from 'react-native-reanimated';
import Slide from '@/components/slide';
import { useTheme } from '@/hooks/useThemeColor';

const HEADER_HEIGHT = 550;

type Props = PropsWithChildren<{
  imagesArray: any
}>;

export default function ParallaxScrollView({
  children,
  imagesArray,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = 0;

  const dynamicStyles = useTheme()
  const { width } = useWindowDimensions()

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateY: interpolate(
          scrollOffset.value,
          [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
          [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
        )
      },
      { scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]) }],
    };
  });

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <Animated.View
          style={[styles.header, headerAnimatedStyle]}>
          <Slide
            data={imagesArray}
            component={(item: any) => <Image source={{ uri: item.url }} style={[styles.image, { width }]} />}
          />
        </Animated.View>
        <View style={[styles.content, dynamicStyles.container]}>
          {children}
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
    overflow: 'hidden',
    paddingTop: 20,
    marginTop: 0,
  },
  photoSelector: {
    zIndex: 9,
    top: 430,
    position: 'absolute',
    left: 20
  },
  image: {
    height: 550,
    resizeMode: 'cover'
  }
});
