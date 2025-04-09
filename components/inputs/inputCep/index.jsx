import Input from '@/components/inputs/input';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function InputCep() {
    const [zip, setZip] = useState('');
    const [addresses, setAddresses] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const fetchAddress = async () => {
        const url = `https://nominatim.openstreetmap.org/search?q=${zip}&format=json&addressdetails=1`;
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'ReactNativeApp/1.0',
                },
            });

            const data = await response.json();

            console.log(data[3].address)

            if (data) {
                const parsedAddresses = data.map((item) => ({
                    street: item.address.road || item.address.borough || item.address.village || item.address.county || '',
                    country: item.address.country || '',
                    city: item.address.city || item.address.town || item.address.state || '',
                    display_name: item.display_name,
                }));

                setAddresses(parsedAddresses);
            }
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };

    function handleChangeZip(value) {
        setZip(value)
        fetchAddress()
    }

    return (
        <View>
            <Input
                value={zip}
                label="CEP"
                placeholder="2000-000"
                required={true}
                onChange={handleChangeZip}
            />
            {!selectedAddress && addresses && (
                <ScrollView style={styles.searchContainer}>
                    {addresses.map((address, index) => (
                        <Text
                            style={styles.searchItem}
                            key={index}
                            onPress={() => setSelectedAddress(address)}
                        >
                            {address.display_name}
                        </Text>
                    ))}
                </ScrollView>
            )}
            {selectedAddress && (
                <>
                    <Input
                        label="Endereço"
                        value={selectedAddress.street}
                    />
                    <Input
                        label="Número"
                    />
                    <Input
                        label="Cidade"
                        value={selectedAddress.city}
                    />
                    <Input
                        label="País"
                        value={selectedAddress.country}
                    />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        maxHeight: 250,
        marginTop: -30,
        marginHorizontal: 2
    },
    searchItem: {
        paddingVertical: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        fontSize: 14,
        color: '#333',
    },
});
