import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'
import { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    scrollable?: boolean;
    refreshControl?: any;
}

export default function Container({ children, scrollable = true, refreshControl }: ContainerProps) {
    const dynamicStyles = useTheme();

    return (
        <SafeAreaView style={dynamicStyles.safeArea}>
            <StatusBar style={dynamicStyles.statusBar} />
            {scrollable ? (
                <ScrollView
                    style={[style.container, dynamicStyles.container]}
                    contentContainerStyle={{ flexGrow: 1 }}
                    refreshControl={refreshControl}
                    scrollEnabled={scrollable}
                    showsVerticalScrollIndicator={false}
                >
                    {children}
                </ScrollView>
            ) : (
                <View
                    style={[style.container, dynamicStyles.container]}
                >
                    {children}
                </View>
            )}

        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 20,
        flex: 1,
    }
})