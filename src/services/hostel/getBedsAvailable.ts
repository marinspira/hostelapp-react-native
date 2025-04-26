import { useMutation } from '@tanstack/react-query';

const getBedsAvailable = async (dates: { checkin_date: Date; checkout_date: Date }) => {
    try {
        const params = new URLSearchParams({
            checkin_date: dates.checkin_date.toISOString(),
            checkout_date: dates.checkout_date.toISOString(),
        });

        const result = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/room/bedsAvailable?${params.toString()}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        const response = await result.json();

        if (!result.ok) {
            throw new Error(response.message || 'Error getting bedsAvailable');
        }

        return response;

    } catch (error) {
        console.error('Error in getBedsAvailable service', error);
        throw error;
    }
};

export function useGetBedsAvailable() {
    return useMutation({ mutationFn: getBedsAvailable });
}