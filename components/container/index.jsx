import { useTheme } from '@/hooks/useThemeColor';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet } from 'react-native'

export default function Container({ children }) {
    const dynamicStyles = useTheme();
    return (
        <SafeAreaView style={dynamicStyles.safeArea}>
            <StatusBar style={dynamicStyles.statusBar} />
            <ScrollView style={[style.container, dynamicStyles.container]}>
                {children}
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    }
})