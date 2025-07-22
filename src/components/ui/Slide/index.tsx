import { Animated, FlatList, StyleSheet, useWindowDimensions, View } from "react-native";
import React, { useRef, useState } from "react";
import { Colors } from "@/src/constants/Colors";

interface SlideProps {
    data: any,
    component?: any,
    renderButtons?: any
}

export default function Slide({ data, component, renderButtons }: SlideProps) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const { width } = useWindowDimensions()

    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const slideRef = useRef<FlatList | null>(null);

    const isLastSlide = currentIndex === data.length - 1;

    const handleNextSlide = () => {
        if (slideRef.current && currentIndex < data.length - 1) {
            slideRef.current.scrollToIndex({ index: currentIndex + 1 });
        }
    };

    return (
        <View style={styles.contentContainer}>
            <FlatList
                data={data}
                renderItem={({ item }) => component(item)}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={32}
                ref={slideRef}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
            />
            <View style={styles.paginator}>
                {data.map((_: any, i: any) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

                    const dotWidth = scrollX.interpolate({
                        inputRange,
                        outputRange: [10, 25, 10],
                        extrapolate: 'clamp'
                    })

                    return <Animated.View style={[styles.dot, { width: dotWidth }]} key={i.toString()} />
                })}
            </View>
            {renderButtons && (
                <View style={styles.buttonsContainer}>
                    {typeof renderButtons === "function" ? renderButtons(isLastSlide, handleNextSlide) : null}
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    paginator: {
        flexDirection: 'row',
        // position: 'absolute',
        // bottom: 120,
        alignSelf: 'center',
        marginVertical: 20
    },
    dot: {
        height: 5,
        width: 5,
        borderRadius: 5,
        backgroundColor: Colors.light.tint,
        marginHorizontal: 8,
        zIndex: 4
    },
    buttonsContainer: {
        paddingHorizontal: 20,
        gap: 10,
        width: '100%',
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    }
});
