import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import profileDefault from '../../assets/images/unnamed.png';
import { Colors } from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

function ProfilesSlide({ style }) {

    const users = [
        {
            profileImg: '',
            name: "Maria"
        },
        {
            profileImg: '',
            name: "João"
        },
        {
            profileImg: '',
            name: "Ana"
        },
        {
            profileImg: '',
            name: "Maria"
        },
        {
            profileImg: '',
            name: "João"
        },
        {
            profileImg: '',
            name: "Ana"
        },
        {
            profileImg: '',
            name: "Maria"
        },
        {
            profileImg: '',
            name: "João"
        },
        {
            profileImg: '',
            name: "Ana"
        }
    ];

    return (
        <ScrollView style={style} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollView}>
            {users.map((user, index) => (
                <View key={index} style={styles.profileContainer}>
                    <Image
                        style={styles.img}
                        source={user.profileImg ? { uri: user.profileImg } : profileDefault}
                        alt={user.name}
                    />
                    <Text>{user.name}</Text>
                    <View style={styles.likeGuest}>
                        <Ionicons name="heart-outline" size={24} color="black" />
                        <MaterialCommunityIcons name="chat-remove-outline" size={24} color="#cdcdcd" />
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
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
        borderTopWidth: 2,
        borderColor: Colors.gray,
        paddingTop: 10
    }
});

export default ProfilesSlide;
