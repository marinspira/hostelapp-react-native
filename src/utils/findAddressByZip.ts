import { Address } from "@/src/services/hostel/interface";

export async function findAddressByZip(zipcode: string): Promise<Address | null> {
  if (!zipcode) return null;

  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${zipcode}&format=json&addressdetails=1`;

    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data = await response.json();



    if (data.length > 0) {
      const result = data[0];
      return {
        street: result.address.road || result.address.borough || '',
        city: result.address.city || result.address.town || '',
        state: result.address.state || '',
        country: result.address.country || '',
      };
    } else {
      console.warn("CEP não encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar o endereço:", error);
    return null;
  }
}
