import { useMutation } from '@tanstack/react-query';

interface createNewMessageProps {
  conversationId: string | string[] | null;
  recipientId: string | string[];
  text: string;
}

const createNewMessage = async (messageData: createNewMessageProps) => {
  try {
    const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/conversation/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(messageData),
    });

    const response = await result.json();

    if (!result.ok) {
      throw new Error(response.message || 'Erro ao criar message');
    }

    return response;

  } catch (error) {
    console.error('Error in createNewMessage service', error);
    throw error;
  }
};


export function useCreateNewMessage() {
  return useMutation({ mutationFn: createNewMessage });
}