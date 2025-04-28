import { useMutation } from '@tanstack/react-query';

const getMessages = async (conversationOrUserId: string) => {
    try {
        const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/${conversationOrUserId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const response = await result.json();

        if (!result.ok) {
            throw new Error(response.message || 'Error getting guest');
        }

        const messages = response.data
        return messages

    } catch (error) {
        console.error('Error in getMessages service', error);
        throw error;
    }
};

export function useGetMessages() {
    return useMutation({ mutationFn: getMessages });
}