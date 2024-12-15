import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import profileDefault from '@/assets/images/unnamed.png';
import { Colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Title from '@/components/guest/text/title';
import IconHalfHeart from '@/components/guest/iconHalfFilledHeart';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ImgSlideProps {
    title: string;
}

interface Guest {
    user: number;
    profileImg: any;
    name: string;
    likes: number[];
}

type HeartIcons = { [key: number]: JSX.Element };

function ImgSlide({ title }: ImgSlideProps) {
    const userId = 1;

    const guests: Guest[] = [
        { user: 1, profileImg: '', name: 'Maria Fernanda', likes: [3, 1, 2] },
        { user: 2, profileImg: '', name: 'João', likes: [3, 4] },
        { user: 3, profileImg: '', name: 'Ana', likes: [1, 2] },
        { user: 4, profileImg: '', name: 'Claudia', likes: [1] },
        { user: 5, profileImg: '', name: 'José', likes: [2, 3] },
        { user: 6, profileImg: '', name: 'Ana', likes: [3, 4] },
        { user: 7, profileImg: '', name: 'Leila', likes: [] },
        { user: 8, profileImg: '', name: 'Arthur', likes: [] },
        { user: 9, profileImg: '', name: 'Ana', likes: [] },
    ];

    const [heartIcons, setHeartIcon] = useState<HeartIcons>({});

    useEffect(() => {
        const icons: HeartIcons = {};

        // Localiza o usuário logado
        const loggedUser = guests.find((guest) => guest.user === userId);

        // Garante que o usuário logado foi encontrado
        if (!loggedUser) {
            console.error('Usuário logado não encontrado!');
            return;
        }

        guests.forEach((guest) => {
            // Verifica se o usuário atual foi curtido pelo usuário logado
            const isLikedByLoggedUser = guest.likes.includes(userId);

            // Verifica se o usuário logado foi curtido pelo usuário atual
            const isLikedByFriend = loggedUser.likes.includes(guest.user);

            const caseKey = `${isLikedByLoggedUser}-${isLikedByFriend}`;

            switch (caseKey) {
                case 'true-true':
                    // Full heart
                    icons[guest.user] = (
                        <>
                            <AntDesign
                                name="heart"
                                size={24}
                                color={Colors.purple}
                                onPress={() => handleClickHeart(guest.user)}
                            />
                            <Ionicons name="chatbox-outline" size={24} color={Colors.purple} />
                        </>
                    );
                    break;

                case 'true-false':
                    // O usuário logado curtiu, mas a outra pessoa não
                    icons[guest.user] = (
                        <>
                            <IconHalfHeart onPress={() => handleClickHeart(guest.user)} isInvertedSide={false} />
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </>
                    );
                    break;

                case 'false-true':
                    // A outra pessoa curtiu, mas o usuário logado não
                    icons[guest.user] = (
                        <>
                            <IconHalfHeart onPress={() => handleClickHeart(guest.user)} isInvertedSide={true} />
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </>
                    );
                    break;

                case 'false-false':
                default:
                    // Empty heart
                    icons[guest.user] = (
                        <>
                            <AntDesign
                                name="hearto"
                                size={24}
                                color={Colors.purple}
                                onPress={() => handleClickHeart(guest.user)}
                            />
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </>
                    );
                    break;
            }
        });

        // Atualiza o estado depois do loop
        setHeartIcon(icons);

    }, []);

    const handleClickHeart = (guestUserId: number): void => {
        console.log(`Heart clicked for guest user ID: ${guestUserId}`);
        // Aqui você pode adicionar a lógica para alterar os likes
    };

    return (
        <View>
            <Title text={title} marginTop={40} />
            <ScrollView style={styles.container} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
                {guests.map((user, index) => (
                    <View key={index} style={styles.profileContainer}>
                        <Image
                            style={styles.img}
                            source={user.profileImg ? { uri: user.profileImg } : (profileDefault as any)}
                            accessibilityLabel={user.name}
                        />
                        <Text>{user.name.split(' ')[0]}</Text>
                        <View style={styles.likeGuest}>
                            {heartIcons[user.user]}
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
        borderRadius: 10,
        maxWidth: 95,
        width: '100%',
    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#fff',
        marginBottom: 5,
    },
    likeGuest: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 10,
        borderTopWidth: 2,
        borderColor: Colors.purple,
        paddingTop: 10,
        height: 50,
    }
});

export default ImgSlide;
