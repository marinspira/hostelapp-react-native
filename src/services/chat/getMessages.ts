import { useMutation } from '@tanstack/react-query';

const getMessages = async (conversationOrUserId: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/${conversationOrUserId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error getting guest');
        }

        const messages = data.data
        return messages

    } catch (error) {
        console.error('Error in getMessages service', error);
        throw error;
    }
};

export function useGetMessages() {
    return useMutation({ mutationFn: getMessages });
}