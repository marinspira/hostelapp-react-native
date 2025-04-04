export async function createHostel(hostelData: any) {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ hostel: hostelData }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || 'Erro ao criar hostel');
      }
  
      const result = await response.json();
      return result;
    } catch (error: any) {
      console.error('[createHostel]', error.message);
      throw error;
    }
  }
  