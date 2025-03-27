import { useState, useEffect } from "react";

export default function useFindAddress(zipcode) {
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!zipcode) return; // Evita buscas desnecessárias

        const fetchAddress = async () => {
            setLoading(true);
            setError(null);
            
            try {
                const url = `https://nominatim.openstreetmap.org/search?postalcode=${zipcode}&format=json&addressdetails=1`;
                const response = await fetch(url);
                const data = await response.json();

                if (data.length > 0) {
                    const result = data[0];
                    setAddress({
                        street: result.address.borough || '',
                        city: result.address.city || result.address.town || '',
                        state: result.address.state || '',
                        country: result.address.country || ''
                    });
                } else {
                    setError("CEP não encontrado.");
                    setAddress(null);
                }
            } catch (err) {
                setError("Erro ao buscar o endereço.");
                console.error("Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddress();
    }, [zipcode]);

    return { address, loading, error };
}