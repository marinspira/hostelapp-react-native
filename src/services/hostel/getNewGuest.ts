import { useMutation } from '@tanstack/react-query';

const getNewGuest = async (username: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guests/${username}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const guests = await response.json();

        if (!response.ok) {
            throw new Error(guests.message || 'Error getting guest');
        }

        return guests;

    } catch (error) {
        console.error('Error in getNewGuest service', error);
        throw error;
    }
};

export function useGetNewGuest() {
    return useMutation({ mutationFn: getNewGuest });
}