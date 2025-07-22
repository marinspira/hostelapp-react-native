import React, { useState } from 'react';
import {
  Platform,
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTranslation } from 'react-i18next';
import { Controller, useFormContext } from 'react-hook-form';
import { Colors } from '@/src/constants/Colors';
import { useTheme } from '@/src/hooks/useTheme';

type FormSelectProps = {
  name: string;
  label: string;
  options: string[];
  supportText?: string;
};

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  options,
  supportText,
}) => {
  const { t } = useTranslation();
  const dynamicStyles = useTheme();
  const { control, formState: { errors } } = useFormContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.fieldContainer}>
      <Text style={dynamicStyles.label}>{label}</Text>
      {supportText && <Text style={styles.supportText}>{supportText}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selectedValue = field.value || '';

          const handleChange = (val: string) => {
            field.onChange(val);
            setShowModal(false);
          };

          if (Platform.OS === 'ios') {
            return (
              <>
                <Pressable
                  style={styles.selectInputContainer}
                  onPress={() => setShowModal(true)}
                >
                  <Text style={styles.selectInputText}>
                    {selectedValue || t('Selecione uma opção')}
                  </Text>
                </Pressable>

                <Modal
                  visible={showModal}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowModal(false)}
                >
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                      <Text style={styles.modalTitle}>{label}</Text>
                      <Picker
                        selectedValue={selectedValue}
                        onValueChange={val => field.onChange(val)}
                        style={styles.selectInput}
                        itemStyle={{ color: '#000' }}
                      >
                        {!selectedValue && (
                          <Picker.Item
                            label={t('Selecione uma opção')}
                            value=""
                            style={{ color: '#aaa' }}
                          />
                        )}
                        {options.map((item, index) => (
                          <Picker.Item key={index} label={item} value={item} />
                        ))}
                      </Picker>

                      <Pressable
                        style={styles.closeButton}
                        onPress={() => {
                          setShowModal(false);
                          field.onChange(selectedValue);
                        }}
                      >
                        <Text style={styles.closeButtonText}>
                          {t('Selecionar')}
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
              </>
            );
          }

          // Android
          return (
            <View style={styles.selectInputAndroid}>
              <Picker
                selectedValue={selectedValue}
                onValueChange={handleChange}
                style={styles.selectInput}
              >
                {!selectedValue && (
                  <Picker.Item
                    label={t('Selecione uma opção')}
                    value=""
                    style={{ color: '#aaa' }}
                  />
                )}
                {options.map((item, index) => (
                  <Picker.Item key={index} label={item} value={item} />
                ))}
              </Picker>
            </View>
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
  selectInput: {
    backgroundColor: '#f7f7f7',
    width: '100%',
    borderRadius: 8,
    color: '#000',
    minWidth: '100%',
  },
  selectInputText: {
    fontSize: 17,
    color: '#000',
  },
  selectInputContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    backgroundColor: '#f7f7f7',
  },
  selectInputAndroid: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  supportText: {
    fontSize: 12,
    marginBottom: 15,
    color: '#b1b1b1',
    marginTop: -3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: Colors.light.tint,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
