import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from "expo-router";
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const MultiStepForm = ({ steps, sendForm, value, setValue }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);

    useEffect(() => {
        validateStep();
    }, [value, currentStep]);

    const handleChange = (name, value) => {
        setValue((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateStep = () => {
        const fields = steps[currentStep].fields;

        // Verifica se todos os campos obrigatórios têm valores preenchidos
        const allValid = fields.every((field) => {
            const valueField = value[field.name];

            if (field.required) {
                // Pode ajustar isso com validação personalizada se quiser
                return valueField !== undefined && valueField !== null && valueField !== '';
            }

            return true;
        });

        setIsStepValid(allValid);
    };

    const nextStep = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.title}>{steps[currentStep].title}</Text>
                    {steps[currentStep].fields.map((field, index) => {
                        const Component = field.component;

                        return (
                            <View key={index} style={{ alignItems: 'center' }}>
                                <Component
                                    value={value[field.name] || ''}
                                    onChange={(value) => handleChange(field.name, value)}
                                    {...field}
                                />
                            </View>
                        );
                    })}

                    <View style={styles.buttonContainer}>
                        {currentStep > 0 && (
                            <TouchableOpacity style={styles.btnPrevious} onPress={prevStep}>
                                <AntDesign name="arrowleft" size={25} color={Colors.light.tint} />
                            </TouchableOpacity>
                        )}
                        {currentStep === steps.length - 1 && (
                            <TouchableOpacity style={styles.btnNext} onPress={sendForm}>
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Enviar</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep < steps.length - 1 && (
                            <TouchableOpacity
                                style={[styles.btnNext, !isStepValid && { opacity: 0.5 }]}
                                onPress={nextStep}
                                disabled={!isStepValid}
                            >
                                <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Next</Text>
                            </TouchableOpacity>
                        )}

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 60,
        color: 'black',
        paddingRight: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        gap: 40,
        width: '100%'
    },
    btnPrevious: {
        paddingHorizontal: 20
    },
    btnNext: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 15,
        paddingHorizontal: 80,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        flex: 1
    },
});

export default MultiStepForm;
