import { useMutation } from '@tanstack/react-query';

const getBedsAvailable = async (dates: {}) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/room/bedsAvailable`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ dates }),
        });

        const bedsAvailable = await response.json();

        if (!response.ok) {
            throw new Error(bedsAvailable.message || 'Error getting bedsAvailable');
        }

        return bedsAvailable;

    } catch (error) {
        console.error('Error in getBedsAvailable service', error);
        throw error;
    }
};

export function useGetBedsAvailable() {
    return useMutation({ mutationFn: getBedsAvailable });
}