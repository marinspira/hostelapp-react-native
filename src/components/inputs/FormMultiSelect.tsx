import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/src/hooks/useTheme';
import { Colors } from '@/src/constants/Colors';

type FormMultiSelectProps = {
  name: string;
  label: string;
  supportText?: string;
  options?: string[];
  maxSelections?: number;
  selectInputItems?: string[];
  boolean?: boolean;
};

export const FormMultiSelect: React.FC<FormMultiSelectProps> = ({
  name,
  label,
  supportText,
  options = [],
  maxSelections = 1,
  selectInputItems,
  boolean = false,
}) => {
  const { t } = useTranslation();
  const dynamicStyles = useTheme();
  const { control, formState: { errors } } = useFormContext();

  return (
    <View style={styles.fieldContainer}>
      <Text style={dynamicStyles.label}>{label}</Text>
      {supportText && <Text style={styles.supportText}>{supportText}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selected = field.value ?? (boolean ? null : []);

          const toggleOption = (option: any) => {
            if (boolean) {
              field.onChange(option === selected ? null : option);
            } else if (maxSelections === 1) {
              field.onChange(selected[0] === option ? [] : [option]);
            } else {
              const alreadySelected = selected.includes(option);
              let newSelection: string[];

              if (alreadySelected) {
                newSelection = selected.filter((item: string) => item !== option);
              } else {
                newSelection = selected.length < maxSelections
                  ? [...selected, option]
                  : selected;
              }
              field.onChange(newSelection);
            }
          };

          const handleSelectInput = (item: string) => {
            if (!item) return;
            const currentOptions = [...options, ...(selectInputItems ?? [])];
            const isNew = !currentOptions.includes(item);

            if (boolean) {
              field.onChange(item === 'true');
            } else {
              let updated = [...(Array.isArray(selected) ? selected : [])];

              if (isNew && updated.length < maxSelections) {
                updated.push(item);
                field.onChange(updated);
              }
            }
          };

          const renderBoolean = () => (
            <View style={styles.optionsContainer}>
              {[true, false].map((boolVal) => (
                <Pressable
                  key={boolVal.toString()}
                  style={[
                    styles.button,
                    selected === boolVal && styles.selectedButton,
                  ]}
                  onPress={() => toggleOption(boolVal)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      selected === boolVal && styles.selectedButtonText,
                    ]}
                  >
                    {t(boolVal ? 'Sim' : 'Não')}
                    {selected === boolVal ? ' ×' : ''}
                  </Text>
                </Pressable>
              ))}
            </View>
          );

          const renderOptions = () => {
            const allOptions = Array.from(new Set([...(options ?? []), ...selected ?? []]));

            return (
              <View style={styles.optionsContainer}>
                {allOptions.map((option) => {
                  const isSelected = selected.includes(option);
                  return (
                    <Pressable
                      key={option}
                      style={[styles.button, isSelected && styles.selectedButton]}
                      onPress={() => toggleOption(option)}
                    >
                      <Text style={[styles.buttonText, isSelected && styles.selectedButtonText]}>
                        {option} {isSelected && '×'}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            );
          };

          return (
            <>
              {selectInputItems && !boolean && (
                <View style={styles.selectInputContainer}>
                  <Picker
                    selectedValue={""}
                    onValueChange={handleSelectInput}
                    style={styles.selectInput}
                  >
                    <Picker.Item label={t('Selecione uma opção')} value={null} />
                    {selectInputItems.map((item, index) => (
                      <Picker.Item key={index} label={item} value={item} />
                    ))}
                  </Picker>
                </View>
              )}
              {boolean ? renderBoolean() : renderOptions()}
            </>
          );
        }}
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
  fieldContainer: {
    marginBottom: 30,
    width: '100%',
  },
  supportText: {
    fontSize: 12,
    marginBottom: 15,
    color: '#b1b1b1',
    marginTop: -3,
  },
  selectInputContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f7f7f7',
  },
  selectInput: {
    width: '100%',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginRight: 10,
    borderColor: '#a1a1a1',
    backgroundColor: 'white',
  },
  selectedButton: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  buttonText: {
    fontSize: 14,
    textTransform: 'uppercase',
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily: 'PoppinsRegular',
    color: '#333',
  },
  selectedButtonText: {
    color: '#ffffff',
  },
});
