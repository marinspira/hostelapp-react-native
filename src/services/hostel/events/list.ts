import { useMutation } from '@tanstack/react-query';

const getAllEvents = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/event/getAllEvents`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error getting guest');
        }

        const events = data.data
        return events;

    } catch (error) {
        console.error('Error in getAllEvents service', error);
        throw error;
    }
};

export function useGetAllEvents() {
    return useMutation({ mutationFn: getAllEvents });
}