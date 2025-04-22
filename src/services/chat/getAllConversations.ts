import { useMutation } from '@tanstack/react-query';

const getAllConversations = async () => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/getAllConversations`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Error getting guest');
        }

        const conversations = data.data
        return conversations;

    } catch (error) {
        console.error('Error in getAllConversations service', error);
        throw error;
    }
};

export function useGetAllConversations() {
    return useMutation({ mutationFn: getAllConversations });
}