import { useMutation } from '@tanstack/react-query';

const createReservation = async (reservationData: any) => {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/reservation/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ reservation: reservationData }),
    });

    const reservation = await response.json();
    console.log(reservation)

    if (!response.ok) {
      throw new Error(reservation.message || 'Erro ao criar reservation');
    }

    return reservation;

  } catch (error) {
    console.error('Error in createReservation service', error);
    throw error;
  }
};


export function useCreateReservation() {
  return useMutation({ mutationFn: createReservation });
}