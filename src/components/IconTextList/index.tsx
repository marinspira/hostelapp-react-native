import { Colors } from '@/src/constants/Colors'
import { useTheme } from '@/src/hooks/useTheme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

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

    const dynamicStyles = useTheme();

    return (
        <View>
            {content.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={item.onPress}
                    style={[styles.container, dynamicStyles.border]}
                    accessibilityLabel={item.title}
                    accessibilityRole="button"
                >
                    {item.icon}
                    <View style={styles.info}>
                        <Text style={[dynamicStyles.h3]}>{item.title}</Text>
                        {item.description &&
                            <Text style={[styles.description, dynamicStyles.text]}>{item.description}</Text>
                        }
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
        paddingVertical: 20,
        borderColor: '#ccc',
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