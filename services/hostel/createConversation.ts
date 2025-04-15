import { useMutation } from '@tanstack/react-query';

const createConversation = async (participantId: string) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ participantId }),
        });

        const conversation = await response.json();
        console.log(conversation)

        if (!response.ok) {
            throw new Error(conversation.message || 'Erro ao criar conversa');
        }

        return conversation;

    } catch (error) {
        console.error('Error in createConversation service', error);
        throw error;
    }
};

export function useCreateConversation() {
    return useMutation({ mutationFn: createConversation });
}