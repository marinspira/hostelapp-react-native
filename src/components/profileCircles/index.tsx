import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '@/src/constants/Colors'
import { useTheme } from '@/src/hooks/useTheme'
import { router } from 'expo-router'
import { useSelector } from 'react-redux'
import { RootState } from '@/src/redux/store'
import goToChat from '@/src/utils/goToChat'
import { useFeatureFlag } from '@/src/hooks/useFeatureFlag'

interface ProfilesCirclesProps {
    people: {
        img: string | null,
        name: string,
        userId: string
    }[]
}

export default function ProfileCircles({ people }: ProfilesCirclesProps) {

    const dynamicStyles = useTheme();
    const user = useSelector((state: RootState) => state.user.data);

    const showChatFeatures = useFeatureFlag('chat');

    if (people) {
        return (
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollView}
                >
                    {people.length > 0 && people.map((person, index) => (
                        <TouchableOpacity
                            onPress={() =>
                                showChatFeatures && router.push({
                                    pathname: `/${user?.role ?? "guest"}/(screens)/chat`,
                                    params: {
                                        userId: person.userId,
                                        name: person.name,
                                        photo: person.img,
                                    },
                                } as any)
                            }
                            key={index}
                            style={styles.container}
                        >
                            <Image
                                source={
                                    person.img
                                        ? { uri: `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${person.img}` }
                                        : require('@/assets/images/unnamed.png')
                                }
                                style={styles.img}
                            />
                            <Text style={dynamicStyles.text}>{person.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        )
    }
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