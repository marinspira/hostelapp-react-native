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

    const initialGuests: Guest[] = [
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

    const [guests, setGuests] = useState<Guest[]>(initialGuests);
    const [heartIcons, setHeartIcon] = useState<HeartIcons>({});

    useEffect(() => {
        updateHeartIcons();
    }, [guests]);

    const updateHeartIcons = () => {
        const icons: HeartIcons = {};
        const loggedUser  = guests.find((guest) => guest.user === userId);

        if (!loggedUser ) {
            console.error('User not found!');
            return;
        }

        guests.forEach((guest) => {
            const isLikedByLoggedUser  = guest.likes.includes(userId);
            const isLikedByFriend = loggedUser .likes.includes(guest.user);
            const caseKey = `${isLikedByLoggedUser }-${isLikedByFriend}`;

            switch (caseKey) {
                case 'true-true':
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
                    icons[guest.user] = (
                        <>
                            <IconHalfHeart onPress={() => handleClickHeart(guest.user)} isInvertedSide={false} />
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </>
                    );
                    break;

                case 'false-true':
                    icons[guest.user] = (
                        <>
                            <IconHalfHeart onPress={() => handleClickHeart(guest.user)} isInvertedSide={true} />
                            <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                        </>
                    );
                    break;

                case 'false-false':
                default:
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

        setHeartIcon(icons);
    };

    const handleClickHeart = (guestUserId: number): void => {
        console.log(`Heart clicked for guest user ID: ${guestUserId}`);
    
        setGuests((prevGuests) => {
            return prevGuests.map((guest) => {
                // Se o convidado for o usuário logado
                if (guest.user === userId) {
                    const isLikedByFriend = guest.likes.includes(guestUserId);
                    const updatedLikes = isLikedByFriend
                        ? guest.likes.filter((id) => id !== guestUserId) // Remove like
                        : [...guest.likes, guestUserId]; // Adiciona like
                    return { ...guest, likes: updatedLikes };
                }
    
                // Se o convidado for o convidado que está sendo clicado
                if (guest.user === guestUserId) {
                    const isLikedByLoggedUser  = guest.likes.includes(userId);
                    const updatedLikes = isLikedByLoggedUser 
                        ? guest.likes.filter((id) => id !== userId) // Remove like
                        : [...guest.likes, userId]; // Adiciona like
                    return { ...guest, likes: updatedLikes };
                }
    
                return guest;
            });
        });
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