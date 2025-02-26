import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import profileDefault from '@/assets/images/unnamed.png'
import { Colors } from '@/constants/Colors'

export default function ProfileCircles() {

    const chats = [
        { img: profileDefault, name: 'Maria' },
        { img: profileDefault, name: 'João' },
        { img: profileDefault, name: 'Fernanda' },
        { img: profileDefault, name: 'Patricia' },
        { img: profileDefault, name: 'José' },
    ]

    return (
        <View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollView}
            >
                {chats.map((chat, index) => (
                    <View key={index} style={styles.container}>
                        <Image style={styles.img} source={chat.img} />
                        <Text>{chat.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 25,
        gap: 8,
        flexDirection: 'column',
        alignItems: 'center',
        marginRight: 15
    },
    scrollView: {
        alignItems: 'center',
        paddingHorizontal: -10,
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 100,
        borderWidth: 3.5,
        borderColor: Colors.light.tint
    },
})