import { useMutation } from '@tanstack/react-query';

type GetConversationProps = {
    userId: string;
};

type Conversation = {
    _id: string;
    user: {
      _id: string;
      username: string;
      photo?: string;
      email: string;
    };
    lastMessage: {
      text: string;
      createdAt: string;
    } | null;
  };
  

const getConversation = async ({ userId }: GetConversationProps) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const data = await response.json();
        const conversations = data.data

        if (!response.ok) {
            throw new Error(conversations.message || 'Error getting guest');
        }

        return conversations;

    } catch (error) {
        console.error('Error in getConversation service', error);
        throw error;
    }
};

export function useGetConversation() {
    return useMutation({ mutationFn: getConversation });
}