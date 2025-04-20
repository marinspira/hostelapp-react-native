export const createEvent = async (event: any) => {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/event/create`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ event }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro creating account');
        }

    } catch (error) {
        console.error('Error in createEvent service', error);
        throw error;
    }
};