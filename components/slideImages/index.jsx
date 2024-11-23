import { AntDesign } from '@expo/vector-icons';
import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

const SlideImage = ({ images }) => {
    const scrollViewRef = useRef(null);

    const scrollTo = (direction) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({
                x: direction === 'left' ? -300 : 300,
                animated: true,
            });
        }
    };

    return (
        <>
            <ScrollView
                horizontal
                pagingEnabled
                ref={scrollViewRef}
                showsHorizontalScrollIndicator={false}
            >
                {images.map((img, imgIndex) => (
                    <Image
                        key={imgIndex}
                        source={img}
                        style={styles.img}
                    />
                ))}
            </ScrollView>
            {images.length > 1 &&
                <View style={styles.arrowContainer}>
                    <TouchableOpacity onPress={() => scrollTo('left')} style={styles.arrowButton}>
                        <AntDesign name="left" size={14} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => scrollTo('right')} style={styles.arrowButton}>
                        <AntDesign name="right" size={14} color="black" />
                    </TouchableOpacity>
                </View>
            }
        </>

    );
};

const styles = StyleSheet.create({
    img: {
        width: 310,
        height: 150,
        borderRadius: 5,
        marginBottom: 20,
        position: 'relative'
    },
    arrowContainer: {
        flexDirection: 'row',
        display: 'flex',
        width: 350,
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        top: 80,
        position: 'absolute'
    },
    arrowButton: {
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 100
    },
});

export default SlideImage;