import React, { useState } from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import MultiStepForm from '@/src/components/multiStepForm';

const steps = [
    {
        title: 'Step 1',
        fields: [{
            name: 'name',
            label: 'Name',
            required: true,
            component: ({ value, onChange }) => (
                <TextInput testID="input-name" value={value} onChangeText={onChange} />
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

const WrapperForm = ({ initialValue = {} }) => {
    const [value, setValue] = useState(initialValue);
    return (
        <MultiStepForm
            steps={steps}
            sendForm={jest.fn()}
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
});