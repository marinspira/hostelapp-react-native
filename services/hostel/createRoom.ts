import { useMutation } from '@tanstack/react-query';

const createRoom = async (roomData: any) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/room/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ room: roomData }),
    });

    const hostel = await response.json();

    if (!response.ok) {
      throw new Error(hostel.message || 'Erro ao criar room');
    }

    return hostel;

  } catch (error) {
    console.error('Error in createRoom service', error);
    throw error;
  }
};


export function useCreateRoom() {
  return useMutation({ mutationFn: createRoom });
}