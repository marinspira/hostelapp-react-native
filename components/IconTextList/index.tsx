import { Colors } from '@/constants/Colors'
import { router } from 'expo-router'
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'

interface IconTextItem {
    icon: React.ReactNode;
    onPress: any;
    title: string;
    description?: string;
}

interface IconTextListProps {
    content: IconTextItem[];
}

export default function IconTextList({ content }: IconTextListProps) {
    return (
        <View>
            {content.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={item.onPress}
                    style={styles.container}
                    accessibilityLabel={item.title}
                    accessibilityRole="button"
                >
                    {item.icon}
                    <View style={styles.info}>
                        <Text style={styles.title}>{item.title}</Text>
                        {item.description && <Text style={styles.description}>{item.description}</Text>}
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderColor: Colors.gray,
        borderTopWidth: 1,
        gap: 20
    },
    info: {
        paddingRight: 20
    },
    title: {
        fontFamily: 'PoppinsBold',
        fontSize: 18,
        paddingRight: 20
    },
    description: {
        fontSize: 15,
        marginTop: 3,
        paddingRight: 20
    }
})