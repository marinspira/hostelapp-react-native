import { useMutation } from '@tanstack/react-query';

const getHome = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/guest/home`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error getting guest');
        }

        return data;

    } catch (error) {
        console.error('Error in getAllEvents service', error);
        throw error;
    }
}

export function useGetHome() {
    return useMutation({ mutationFn: getHome });
}