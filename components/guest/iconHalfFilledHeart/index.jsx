import { Colors } from '@/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Svg, { Rect, ClipPath, Defs } from 'react-native-svg';

export default function IconHalfHeart({ onPress, isInvertedSide }) {
  const size = 24;

  return (
    <Pressable onPress={onPress} style={styles.container}>
      {/* Ícone completo com preenchimento */}
      <AntDesign name="heart" size={size} color={Colors.light.tint} />

      {/* Contorno do coração */}
      <AntDesign
        style={styles.contour}
        name="hearto"
        size={size}
        color={Colors.light.tint}
      />

      {/* Máscara para metade do coração */}
      <Svg
        width={size}
        height={size}
        style={styles.overlay}
      >
        <Defs>
          <ClipPath id="halfHeartClip">
            <Rect
              x={isInvertedSide ? 0 : size / 2}
              y="0"
              width={size / 2}
              height={size}
            />
          </ClipPath>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={size}
          height={size}
          clipPath="url(#halfHeartClip)"
          fill="white"
        />
      </Svg>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contour: {
    position: 'absolute',
    zIndex: 1,
  },
});
