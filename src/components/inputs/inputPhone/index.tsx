import { useTheme } from '@/src/hooks/useTheme';
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PhoneInput, { ICountry } from 'react-native-international-phone-number';

interface Props {
  label?: string,
  onChange: (value: string) => void;
  value: any
}

export default function InputPhone({ label, onChange, value }: Props) {
  const [selectedCountry, setSelectedCountry] =
    useState<null | ICountry>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const dynamicStyles = useTheme()

  function handleInputValue(phoneNumber: string) {
    setInputValue(phoneNumber);
  }

  function handleSelectedCountry(country: ICountry) {
    setSelectedCountry(country);
  }

  function handleBlur() {
    if (selectedCountry && inputValue) {
      const formattedValue = `${selectedCountry.callingCode} ${inputValue}`;
      onChange(formattedValue);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={dynamicStyles.label}>{label}</Text>
      <PhoneInput
        defaultValue={value}
        value={inputValue}
        onChangePhoneNumber={handleInputValue}
        selectedCountry={selectedCountry}
        onChangeSelectedCountry={handleSelectedCountry}
        onBlur={handleBlur}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 25
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: 2,
  }
})