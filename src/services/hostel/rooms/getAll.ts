import { useMutation } from '@tanstack/react-query';

const getAllRooms = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/rooms`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const rooms = await response.json();

        if (!response.ok) {
            throw new Error(rooms.message || 'Error getting rooms');
        }

        return rooms;

    } catch (error) {
        console.error('Error in getAllRooms service', error);
        throw error;
    }
};

export function useGetAllRooms() {
    return useMutation({ mutationFn: getAllRooms });
}