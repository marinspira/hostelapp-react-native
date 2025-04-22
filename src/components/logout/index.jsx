import React from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { logout } from '@/src/redux/slices/user';

export default function LogoutButton() {
    const dispatch = useDispatch();

    async function handleLogout() {
        try {
            dispatch(logout()).unwrap();
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }

    return (
        <View style={styles.container}>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {

    }
})
