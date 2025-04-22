import React from "react";
import {
    View,
    Text,
    StyleSheet,
    useWindowDimensions,
} from "react-native";


function IntroductionItems({ item }) {
    const { width } = useWindowDimensions()

    return (
        <View style={[styles.container, { width, resizeMode: 'contain' }]}>
            {item.img}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20
    },
    title: {
        fontFamily: 'PoppinsBold',
        width: '100%',
        fontSize: 28,
        marginBottom: 10
    },
    description: {
        fontFamily: 'PoppinsRegular',
        width: '100%',
        fontSize: 18,
    }
});

export default IntroductionItems;
