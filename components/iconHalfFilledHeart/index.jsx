import { Colors } from '@/constants/Colors';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

export default function IconHalfHeart({ onPress, isInvertedSide }) {
  const size = 24;

  return (
    <View style={styles.container} onPress={onPress}>
      <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Defs>
          <LinearGradient id="halfFill" x1="0" y1="0" x2="1" y2="0">
            {isInvertedSide ?
              <>
                <Stop offset="50%" stopColor="white" />
                <Stop offset="50%" stopColor={Colors.purple} />
              </>
              :
              <>
                <Stop offset="50%" stopColor={Colors.purple} />
                <Stop offset="50%" stopColor="white" />
              </>
            }
          </LinearGradient>
        </Defs>
        {/* Borda do coração */}
        <Path
          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
          fill="none"
          stroke="black"
          strokeWidth={3}
        />
        <Path
          d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z"
          fill="url(#halfFill)"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
