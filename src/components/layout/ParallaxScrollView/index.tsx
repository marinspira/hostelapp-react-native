import type { PropsWithChildren } from 'react';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, } from 'react-native-reanimated';

import Linear from '@/assets/images/gradient.svg'

import Slide from '@/src/components/ui/Slide';
import { useTheme } from '@/src/hooks/useTheme';
import GoBackButton from '@/src/components/layout/GoBackButton';

const HEADER_HEIGHT = 550;

type Props = PropsWithChildren<{
  imagesArray: any,
  textOverImage?: string,
  refreshControl?: any,
  button?: boolean
}>;

export default function ParallaxScrollView({
  children,
  imagesArray,
  textOverImage,
  refreshControl,
  button
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
        contentContainerStyle={{ paddingBottom: bottom }}
      // refreshControl={<RefreshControl />}
      >
        <Animated.View
          style={[styles.header, headerAnimatedStyle]}>
          {button &&
            <GoBackButton absolutePostion={true} color='white'/>
          }
          {textOverImage &&
            <View style={styles.overlay} pointerEvents='none'>
              <Linear />
            </View>
          }
          <Slide
            data={imagesArray}
            component={(item: any) => <Image source={{ uri: item.url }} style={[styles.image, { width }]} />}
          />
          <Text style={styles.text}>{textOverImage}</Text>
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
    position: 'relative'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    maxHeight: 550
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
  },
  text: {
    position: 'absolute',
    zIndex: 2,
    fontSize: 30,
    left: 20,
    bottom: 50,
    color: '#fff',
    fontFamily: 'PoppinsBold',
    maxWidth: '100%',
    paddingRight: 40
  },
  button: {
    position: 'absolute',
    zIndex: 4,
    left: 20,
    top: 80
  }
});
