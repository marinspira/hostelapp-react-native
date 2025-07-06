import { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Colors } from '@/src/constants/Colors';
import { KeyboardAvoidingView, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '@/src/hooks/useTheme';
import { Controller, useFormContext } from 'react-hook-form';

const MultiStepFormUi = ({
    steps,
    currentStep,
    isStepValid,
    onNext,
    onBack,
    onSubmit,
    // value,
    sendBtnText,
}) => {
    const dynamicStyles = useTheme()
    const control = useFormContext()

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <ScrollView vertical showsVerticalScrollIndicator={false} style={{ paddingBottom: 100 }}>
                        <Text style={[dynamicStyles.title, styles.title]}>{steps[currentStep].title}</Text>
                        {steps[currentStep].fields.map((field, index) => {
                            const Component = field.component;
                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <Component
                                        {...field}
                                        value={value}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        errorMessage={error?.message}
                                    />
                                </View>
                            );
                        })}
                    </ScrollView>
                    <View style={styles.buttonContainer}>
                        {currentStep > 0 && (
                            <TouchableOpacity style={styles.btnPrevious} onPress={onBack}>
                                <AntDesign name="arrowleft" size={25} color={Colors.light.tint} />
                            </TouchableOpacity>
                        )}
                        {currentStep === steps.length - 1 && (
                            <TouchableOpacity
                                style={[styles.btnNext, !isStepValid && { opacity: 0.5 }]}
                                onPress={onSubmit}
                                disabled={!isStepValid}
                            >
                                <Text style={{ color: 'white', fontSize: 18, fontWeight: '700' }}>{sendBtnText}</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep < steps.length - 1 && (
                            <TouchableOpacity
                                style={[styles.btnNext, !isStepValid && { opacity: 0.5 }]}
                                onPress={onNext}
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

export default MultiStepFormUi;
