import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Colors } from '@/constants/Colors';
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const MultiStepForm = ({ steps }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({});

    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
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
            {/* <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            > */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{steps[currentStep].title}</Text>
                        {steps[currentStep].fields.map((field, index) => {
                            const Component = field.component;

                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <Component
                                        value={formData[field.name] || ''}
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
                            {currentStep < steps.length - 1 && (
                                <TouchableOpacity style={styles.btnNext} onPress={nextStep}>
                                    <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>Next</Text>
                                    {/* <AntDesign name="arrowright" size={20} color="white" /> */}
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            {/* </ScrollView> */}
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
        marginBottom: 60,
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
