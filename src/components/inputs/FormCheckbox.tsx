import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@/src/constants/Colors';
import { useTheme } from '@/src/hooks/useTheme';

type FormCheckboxProps = {
  name: string;
  label: string;
};

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ name, label }) => {
  const { control, formState: { errors } } = useFormContext();
  const dynamicStyles = useTheme();

  return (
    <View style={{ marginBottom: 16 }}>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Pressable style={styles.container} onPress={() => field.onChange(!field.value)}>
            <View style={styles.checkbox}>
              {field.value && (
                <MaterialIcons
                  style={styles.check}
                  name="check"
                  size={20}
                  color={Colors.light.tint}
                />
              )}
            </View>
            <Text style={dynamicStyles.suportText}>{label}</Text>
          </Pressable>
        )}
      />
      {errors[name] && (
        <Text style={{ color: 'red', marginTop: 4 }}>
          {errors[name]?.message?.toString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    maxWidth: '100%',
    paddingRight: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginRight: 10,
  },
  check: {
    position: 'absolute',
    paddingBottom: 3,
  },
});
