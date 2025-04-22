import * as Linking from 'expo-linking';

export const createStripeAccount = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/stripe/create-hostel-stripe-account`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (data.url) {
            Linking.openURL(data.url);
        }

        if (!response.ok) {
            throw new Error(data.message || 'Erro creating account');
        }

    } catch (error) {
        console.error('Error in createStripeAccount service', error);
        throw error;
    }
};