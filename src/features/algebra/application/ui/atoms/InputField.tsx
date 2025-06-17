import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

interface InputFieldProps {
    value: string;
    onChange: (v: string) => void
}


export const InputField = ({ value, onChange }: InputFieldProps) => (
    <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Introduce una ecuación"
    />
);

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginVertical: 8,
    },
});