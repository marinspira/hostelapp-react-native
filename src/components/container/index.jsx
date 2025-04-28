import { useTheme } from '@/src/hooks/useTheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native'

export default function Container({ children, scrollable = true, refreshControl }) {
    const dynamicStyles = useTheme();

    return (
        <SafeAreaView style={dynamicStyles.safeArea}>
            <StatusBar style={dynamicStyles.statusBar} />
            {scrollable ? (
                <ScrollView
                    style={[style.container, dynamicStyles.container]}
                    refreshControl={refreshControl}
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    {children}
                </ScrollView>
            ) : (
                <View style={[style.container, dynamicStyles.container]}>
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