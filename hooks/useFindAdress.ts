import { useState, useEffect } from "react";
import { Address } from "@/services/hostel/interface";

type UseFindAddressResult = {
  address: Address | null;
  loading: boolean;
  error: string | null;
};

export default function useFindAddress(zipcode: string): UseFindAddressResult {
  const [address, setAddress] = useState<Address | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!zipcode) return;

    const fetchAddress = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json&addressdetails=1`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.length > 0) {
          const result = data[0];
          console.log(result)
          setAddress({
            street: result.address.borough || '',
            city: result.address.city || result.address.town || '',
            state: result.address.state || '',
            country: result.address.country || '',
          });
        } else {
          setError("CEP não encontrado.");
          setAddress(null);
        }
      } catch (err) {
        setError("Erro ao buscar o endereço.");
        console.error("Erro:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddress();
  }, [zipcode]);

  console.log(address, loading, error)

  return { address, loading, error };
}
