import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import profileDefault from '@/assets/images/unnamed.png';
import { Colors } from '@/constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title from '@/components/text/title'
import HalfFilledHeart from '@/components/iconHalfFilledHeart'

interface ImgSlideProps {
    title: string,
}

function ImgSlide({ title }: ImgSlideProps) {

    const userId = 1

    const guests = [
        { user: 1, profileImg: '', name: 'Maria', likedBy: [3, 1] },
        { user: 2, profileImg: '', name: 'João', likedBy: [2, 3, 4] },
        { user: 3, profileImg: '', name: 'Ana', likedBy: [1, 2, 4] },
        { user: 4, profileImg: '', name: 'Maria', likedBy: [1] },
        { user: 5, profileImg: '', name: 'João', likedBy: [2, 3] },
        { user: 6, profileImg: '', name: 'Ana', likedBy: [3, 4] },
        { user: 7, profileImg: '', name: 'Maria', likedBy: [] },
        { user: 8, profileImg: '', name: 'João', likedBy: [] }, // Normalizando `likedBy`
        { user: 9, profileImg: '', name: 'Ana', likedBy: [] },
    ];

    const [heartIcons, setHeartIcon] = useState()

    useEffect(() => {
        const icons = {}

        guests.forEach((guest) => {
            const isLikedByFriend = guest.likedBy.includes(userId)
            const isLoggedUser = guest.user === userId

            const caseKey = `${isLikedByFriend}-${isLoggedUser}`;

            switch (caseKey) {
                case 'true-true':
                    // Full heart
                    icons[guest.user] = (
                        <AntDesign
                            name="heart"
                            size={24}
                            color={Colors.purple}
                            onPress={() => handleClickHeart(guest.user)}
                        />
                    );
                    break;

                case 'true-false':
                    // Half heart (normal)
                    icons[guest.user] = (
                        <HalfFilledHeart
                            isInvertedSide={false}
                            onPress={() => handleClickHeart(guest.user)}
                        />
                    );
                    break;

                case 'false-true':
                    // Half heart (inverted)
                    icons[guest.user] = (
                        <HalfFilledHeart
                            isInvertedSide={true}
                            onPress={() => handleClickHeart(guest.user)}
                        />
                    );
                    break;

                case 'false-false':
                default:
                    // Empty heart
                    icons[guest.user] = (
                        <AntDesign
                            name="hearto"
                            size={24}
                            color={Colors.purple}
                            onPress={() => handleClickHeart(guest.user)}
                        />
                    );
                    break;
            }

            setHeartIcon(icons)

        })
    }, [])

    const handleClickHeart = () => {


        // if (isLikedByLoggedUser && isLikedByFriend) {
        //     // Remove a curtida mútua
        //     setLikedBy(likedBy.filter(id => id !== userId));
        //     setLikedByMe(likedByMe.filter(id => id !== otherPersonId));
        // } else if (isLikedByLoggedUser) {
        //     // Remove o "like" do logado
        //     setLikedBy(likedBy.filter(id => id !== userId));
        // } else {
        //     // Adiciona o "like" do logado
        //     setLikedBy([...likedBy, userId]);
        // }
    }

    return (
        <View>
            <Title text={title} marginTop={40} />
            <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {guests.map((user, index) => (
                    <View key={index} style={styles.profileContainer}>
                        <Image
                            style={styles.img}
                            source={user.profileImg ? { uri: user.profileImg } : profileDefault}
                            alt={user.name}
                        />
                        <Text>{user.name}</Text>
                        <View style={styles.likeGuest}>
                            {heartIcons && heartIcons[user?.user]}
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    },
    scrollView: {
        alignItems: 'center',
        paddingHorizontal: -10,
    },
    profileContainer: {
        marginRight: 18,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 10
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 5
    },
    likeGuest: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 5,
        borderTopWidth: 3,
        borderColor: Colors.purple,
        paddingTop: 10,
        height: 50
    }
});

export default ImgSlide;
