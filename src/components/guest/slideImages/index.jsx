import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const SlideImage = ({ images }) => {
  const scrollViewRef = useRef(null);

  const scrollTo = (direction) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: direction === 'left' ? -screenWidth : screenWidth,
        animated: true,
      });
    }
  };

  return (
    <View style={{ position: 'relative' }}>
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        showsHorizontalScrollIndicator={false}
      >
        {images.map((img, index) => {
        const source = typeof img === 'string'
          ? { uri: img }
          : img;

        return (
          <Image
            key={index}
            source={source}
            style={styles.img}
            resizeMode="cover"
          />
        );
      })}
      </ScrollView>

      {images.length > 1 && (
        <View style={styles.arrowContainer}>
          <TouchableOpacity onPress={() => scrollTo('left')} style={styles.arrowButton}>
            <AntDesign name="left" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollTo('right')} style={styles.arrowButton}>
            <AntDesign name="right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    width: screenWidth - 80,
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  arrowContainer: {
    position: 'absolute',
    top: 75,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  arrowButton: {
    padding: 6,
  },
});

export default SlideImage;