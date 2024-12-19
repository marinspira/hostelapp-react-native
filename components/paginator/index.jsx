import React from 'react'
import { StyleSheet, View, Animated, useWindowDimensions } from 'react-native'
import { Colors } from '@/constants/Colors'

export default function Paginator({ data, scrollX }) {

    const { width } = useWindowDimensions()

    return (
        <View style={styles.container}>
            {data.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 25, 10],
                    extrapolate: 'clamp'
                })

                return <Animated.View style={[styles.dot, { width: dotWidth }]} key={i.toString()} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 64,
        width: '100%',
        justifyContent: 'center',
        marginTop: 40
    },
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.purple,
        marginHorizontal: 8
    }
})