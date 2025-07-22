import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Controller, useFormContext } from "react-hook-form";
import { useTheme } from "@/src/hooks/useTheme";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export const FormInput: React.FC<FormInputProps> = ({ name, label, placeholder }) => {
  const { control, formState: { errors } } = useFormContext();

  const dynamicStyles = useTheme()

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={dynamicStyles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            style={styles.input}
          />
        )}
      />
      {errors[name] && (
        <Text style={{ color: "red", marginTop: 4 }}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#f7f7f7',
    minWidth: '100%',
    padding: 18,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    fontSize: 16,
  },
});