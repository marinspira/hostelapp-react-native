import { useMutation } from '@tanstack/react-query';

const getAllGuests = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/getAllGuests`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error getting guest');
        }

        const guests = data.data
        return guests;

    } catch (error) {
        console.error('Error in getAllGuests service', error);
        throw error;
    }
};

export function useGetAllGuests() {
    return useMutation({ mutationFn: getAllGuests });
}