import React from 'react';
import { useDispatch } from 'react-redux';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { logout } from '@/redux/slices/user/slice';
import { useStorageState } from '@/hooks/useStorageState';

export default function LogoutButton() {
    const dispatch = useDispatch();
    const [[loading, storedUser], clearStorage] = useStorageState('user')

    async function handleLogout() {
        try {
            const result = await dispatch(logout()).unwrap();
            if (result) {
                clearStorage();
            }
        } catch (err) {
            console.error('Logout failed:', err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Logout</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Logout" onPress={handleLogout} />
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    title: {

    }
})
