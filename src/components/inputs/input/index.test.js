import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Input from './index';

jest.mock('@/src/hooks/useTheme', () => ({
    useTheme: () => ({
        label: { fontSize: 14, color: 'black' },
    }),
}));

describe('Input component', () => {
    it('renders with label and placeholder', () => {
        const { getByText, getByPlaceholderText } = render(
            <Input label="Name" placeholder="Type your name" value="" />
        );

        expect(getByText('Name')).toBeTruthy();
        expect(getByPlaceholderText('Type your name')).toBeTruthy();
    });

    it('calls onChange when text is entered', () => {
        const mockOnChange = jest.fn();

        const { getByPlaceholderText } = render(
            <Input label="Nome" placeholder="Digite seu nome" value="" onChange={mockOnChange} />
        );

        fireEvent.changeText(getByPlaceholderText('Digite seu nome'), 'Lucas');
        expect(mockOnChange).toHaveBeenCalledWith('Lucas');
    });

    it('filters non-numeric input when onlyNumbers is true', () => {
        const mockOnChange = jest.fn();

        const { getByPlaceholderText } = render(
            <Input
                label="CEP"
                placeholder="Digite seu CEP"
                value=""
                onChange={mockOnChange}
                onlyNumbers
            />
        );

        fireEvent.changeText(getByPlaceholderText('Digite seu CEP'), '12a3b');
        expect(mockOnChange).toHaveBeenCalledWith('123');
    });

    it('calls onBlur when input loses focus', () => {
        const mockOnBlur = jest.fn();

        const { getByPlaceholderText } = render(
            <Input
                label="Email"
                placeholder="Digite seu email"
                value=""
                onBlur={mockOnBlur}
            />
        );

        fireEvent(getByPlaceholderText('Digite seu email'), 'blur');
        expect(mockOnBlur).toHaveBeenCalled();
    });

    it('shows error message when required and empty after touch', () => {
        const { getByPlaceholderText, getByText } = render(
            <Input
                label="Nome"
                placeholder="Digite seu nome"
                value=""
                required
            />
        );

        const input = getByPlaceholderText('Digite seu nome');

        fireEvent(input, 'focus');
        fireEvent(input, 'blur');

        expect(getByText('This field is required')).toBeTruthy();
    });
});
