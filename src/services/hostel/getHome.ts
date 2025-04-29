import { BackendResponse } from '@/src/interfaces/backendResponse';
import { useMutation } from '@tanstack/react-query';

const getHome = async () => {
    try {
        const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/getHomeScreen`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const response = await result.json();

        if (!result.ok) {
            throw new Error(response.message || 'Error getting home');
        }

        return response as BackendResponse;

    } catch (error) {
        console.error('Error in getHome service', error);
        throw error;
    }
};

export function useGetHome() {
    return useMutation({ mutationFn: getHome });
}