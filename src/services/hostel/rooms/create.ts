import { useMutation } from '@tanstack/react-query';
import { RoomPayload, RoomResponse } from "@/src/interfaces/room";

const createRoom = async (payload: RoomPayload): Promise<RoomResponse> => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/rooms/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ room: payload }),
    });

    const room = await response.json();

    if (!response.ok) {
      throw new Error(room.message || 'Erro creating room');
    }

    return room;

  } catch (error) {
    console.error('Error in create room service', error);
    throw error;
  }
};

export function useCreateRoom() {
  return useMutation({ mutationFn: createRoom });
}