import React, { useState } from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import MultiStepForm from '@/src/components/multiStepForm';
import Input from '../inputs/input';

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message) => {
        if (
            message.includes('Warning: An update to Animated') ||
            message.includes('act(...)')
        ) {
            return;
        }
        console.error(message);
    });
});

jest.mock('@expo/vector-icons/AntDesign', () => {
    return {
        __esModule: true,
        default: 'AntDesign'
    };
});

jest.mock('@/src/hooks/useTheme', () => ({
    useTheme: () => ({
        label: { fontSize: 14, color: 'black' },
    }),
}));

const steps = [
    {
        title: 'Step 1',
        fields: [{
            name: 'name',
            label: 'Name',
            required: true,
            component: ({ value, onChange }) => (
                <Input
                    testID="input-name"
                    label="Nome"
                    placeholder="Digite seu nome"
                    value={value}
                    onChange={onChange}
                    required
                />
            )
        }]
    },
    {
        title: 'Step 2',
        fields: [{
            name: 'email',
            label: 'Email',
            required: true,
            component: ({ value, onChange }) => (
                <TextInput testID="input-email" value={value} onChangeText={onChange} />
            )
        }]
    }
];

const WrapperForm = ({ initialValue = {}, onSubmit = jest.fn() }) => {
    const [value, setValue] = useState(initialValue);
    return (
        <MultiStepForm
            steps={steps}
            sendForm={onSubmit}
            value={value}
            setValue={setValue}
            sendBtnText="Submit"
        />
    );
};

describe('<MultiStepForm />', () => {
    it('disables Next button if required field is empty', () => {
        const { getByText } = render(<WrapperForm />);
        const nextButton = getByText('Next');
        expect(nextButton).toBeDisabled();
    });

    // it('enables Next button when field is valid', async () => {
    //     const { getByTestId } = render(<WrapperForm />);
    //     const input = getByTestId('input-name');

    //     await act(async () => {
    //         fireEvent.changeText(input, 'John');
    //     });

    //     const nextButton = getByTestId('next');
    //     expect(nextButton.props.accessibilityState?.disabled).not.toBe(true);
    // });

    // it('calls sendForm when all fields are valid and Submit is pressed', async () => {
    //     const mockSubmit = jest.fn();
    //     const { getByTestId, getByText } = render(<WrapperForm onSubmit={mockSubmit} />);

    //     const nameInput = getByTestId('input-name');

    //     await act(async () => {
    //         fireEvent.changeText(nameInput, 'John');
    //     });

    //     const nextButton = getByText('Next');
    //     fireEvent.press(nextButton);

    //     const emailInput = getByTestId('input-email');

    //     await act(async () => {
    //         fireEvent.changeText(emailInput, 'john@example.com');
    //     });

    //     const submitButton = getByText('Submit');
    //     fireEvent.press(submitButton);

    //     expect(mockSubmit).toHaveBeenCalledTimes(1);
    // });

    // it('shows error message if required input is touched and left empty', async () => {
    //     const { getByTestId, getByText } = render(<WrapperForm />);
    
    //     const nameInput = getByTestId('input-name');

    //     await act(async () => {
    //         fireEvent.changeText(nameInput, '');
    //     });
    
    //     fireEvent(nameInput, 'focus');
    //     fireEvent(nameInput, 'blur');
    
    //     expect(getByText('This field is required')).toBeTruthy();
    // });
});