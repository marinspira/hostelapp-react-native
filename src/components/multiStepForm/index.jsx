import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Colors } from '@/src/constants/Colors';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const MultiStepForm = ({ steps, sendForm, value, setValue, sendBtnText }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isStepValid, setIsStepValid] = useState(false);
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateStepWithValue(value);
    }, [value, currentStep]);

    const validateStepWithValue = (updatedValue) => {
        const fields = steps[currentStep].fields;

        const allValid = fields.every((field) => {
            if (!field.name) return true;

            const fieldValue = updatedValue?.[field.name];

            if (field.required) {
                if (fieldValue === null || fieldValue === undefined || fieldValue === '') {
                    return false;
                }

                if (field.name === 'email' && !isValidEmail(fieldValue)) {
                    return false;
                }
            }

            if (field.name === 'policies' && fieldValue !== true) {
                return false;
            }

            if (field.name === 'experience_with_volunteers' && fieldValue == null) {
                return false;
            }

            return true;
        });

        setIsStepValid(allValid);
    };

    const handleChange = (name, value) => {
        setValue((prev) => {
            const updated = { ...prev, [name]: value };
            validateStepWithValue(updated);
            return updated;
        });

        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validateField = (name, val) => {
        const field = steps[currentStep].fields.find((f) => f.name === name);
        if (!field) return;
    
        let error = '';
    
        if (field.required && (!val || val.trim() === '')) {
            error = 'This field is required';
        } else if (name === 'email' && !isValidEmail(val)) {
            error = 'Invalid email';
        }
    
        setErrors((prev) => ({ ...prev, [name]: error }));
    };
    
    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email.trim());
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
                    <ScrollView vertical showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>
                        <Text style={styles.title}>{steps[currentStep].title}</Text>
                        {steps[currentStep].fields.map((field, index) => {
                            const Component = field.component;

                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <Component
                                        value={value[field.name]}
                                        onChange={(val) => handleChange(field.name, val)}
                                        onBlur={() => {
                                            setTouched((prev) => ({ ...prev, [field.name]: true }));
                                            validateField(field.name, value[field.name]);
                                        }}
                                        error={touched[field.name] && errors[field.name]}
                                        {...field}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        {currentStep > 0 && (
                            <TouchableOpacity style={styles.btnPrevious} onPress={prevStep}>
                                <AntDesign name="arrowleft" size={25} color={Colors.light.tint} />
                            </TouchableOpacity>
                        )}
                        {currentStep === steps.length - 1 && (
                            <TouchableOpacity
                                style={[styles.btnNext, !isStepValid && { opacity: 0.5 }]}
                                onPress={sendForm}
                                disabled={!isStepValid}
                            >
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{sendBtnText}</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep < steps.length - 1 && (
                            <TouchableOpacity
                                style={[styles.btnNext, !isStepValid && { opacity: 0.5 }]}
                                onPress={nextStep}
                                disabled={!isStepValid}
                                testID="next"
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
        paddingBottom: 100
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 40,
        color: 'black',
        paddingRight: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',
        gap: 20,
        width: '100%'
    },
    btnPrevious: {
        paddingHorizontal: 10
    },
    btnNext: {
        backgroundColor: Colors.light.tint,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        flex: 1
    },
});

export default MultiStepForm;
