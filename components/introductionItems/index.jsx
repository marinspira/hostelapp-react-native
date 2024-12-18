import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
    Image,
} from "react-native";


function IntroductionItems({ item }) {
    const { width } = useWindowDimensions()

    return (
        <View style={[styles.container]}>
            {item.img}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    title: {
        fontFamily: 'PoppinsBold',
        width: '100%',
        fontSize: 24,
    },
    description: {
        fontFamily: 'PoppinsRegular',
        width: '100%',
        fontSize: 16,
    }
});

export default IntroductionItems;
