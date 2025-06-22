import React from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../atoms/InputField';

interface EquationInputProps {
    value: string;
    onChange: (v: string) => void
}


export const EquationInput = ({ value, onChange }: EquationInputProps) => (
    <View>
        <Text style={{ fontWeight: 'bold' }}>Ecuación:</Text>
        <InputField value={value} onChange={onChange} />
    </View>
);