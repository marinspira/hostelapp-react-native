import { Animated, FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React, { useRef, useState } from "react";
import IntroductionItems from "@/components/introductionItems";
import Paginator from "@/components/paginator";

export default function Slide({ data, component, renderButtons }) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const [currentIndex, setCurrentIndex] = useState(0);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const slideRef = useRef(null);

    const isLastSlide = currentIndex === data.length - 1;

    const handleNextSlide = () => {
        if (currentIndex < data.length - 1) {
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
            <Paginator data={data} scrollX={scrollX} />
            {renderButtons && (
                <>{renderButtons(isLastSlide, handleNextSlide)} </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    buttonsContainer: {
        padding: 20,
        gap: 10,
    },
    contentContainer: {
        height: '100%',
        justifyContent: 'flex-end'
    }
});