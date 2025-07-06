import { useTheme } from '@/src/hooks/useTheme';
import { forwardRef } from 'react';
import { Controller, UseControllerProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

type Props = {
    inputProps: TextInputProps,
    formProps: UseControllerProps,
    custom: {
        label: string,
        onlyNumbers: boolean
    }
}

export const InputRHF = forwardRef<TextInput, Props>(({ inputProps, formProps, custom }, ref) => {

    const dynamicStyles = useTheme();
    const { t } = useTranslation();

    return (
        <Controller
            render={() => (
                <View style={styles.fieldContainer}>
                    <Text style={dynamicStyles.label}>{t(custom.label)}</Text>
                    <View style={styles.inputTextingContainer}>
                        <TextInput
                            ref={ref}
                            style={styles.input}
                            keyboardType={custom.onlyNumbers ? 'numeric' : 'default'}
                            multiline={true}
                            placeholderTextColor="#bbb"
                            {...inputProps}
                        />
                    </View>
                </View>
            )}
            {...formProps}
        >
        </Controller>
    )
})

const styles = StyleSheet.create({
    fieldContainer: {
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#f7f7f7',
        minWidth: '100%',
        padding: 18,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        fontSize: 16,
    },
    inputCursor: {
        height: 45,
        width: 4,
        backgroundColor: 'black',
        marginLeft: 10,
        marginBottom: 10,
    },
    inputTexting: {
        fontSize: 45,
        fontFamily: 'PoppinsBold',
    },
    inputTextingContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        minWidth: '100%'
    },
    inputError: {
        borderColor: '#ff4d4f',
    },
    errorText: {
        color: '#ff4d4f',
        fontSize: 14,
        marginTop: 5,
    },
});