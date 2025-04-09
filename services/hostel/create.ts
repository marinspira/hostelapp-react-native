import { useMutation } from '@tanstack/react-query';

const createHostel = async (hostelData: any) => {

  console.log(hostelData)
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ hostel: hostelData }),
    });

    const hostel = await response.json();

    if (!response.ok) {
      throw new Error(hostel.message || 'Erro ao criar hostel');
    }

    console.log(hostel)
    return hostel;

  } catch (error) {
    console.error('Error in createHostel service', error);
    throw error;
  }
};


export function useCreateHostel() {
  return useMutation({ mutationFn: createHostel });
}