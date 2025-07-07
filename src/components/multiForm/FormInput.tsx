import React from "react";
import { TextInput, View, Text } from "react-native";
import { Controller, useFormContext } from "react-hook-form";

type FormInputProps = {
  name: string;
  label: string;
  placeholder?: string;
};

export const FormInput: React.FC<FormInputProps> = ({ name, label, placeholder }) => {
  const { control, formState: { errors } } = useFormContext();

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ marginBottom: 4 }}>{label}</Text>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
            style={{
              borderColor: errors[name] ? "red" : "#ccc",
              borderWidth: 1,
              padding: 8,
              borderRadius: 4,
            }}
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
