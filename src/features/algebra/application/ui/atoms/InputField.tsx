import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

/**
 * Props esperadas por el componente InputField.
 * - value: texto actual del campo de entrada.
 * - onChange: función que se ejecuta cuando el texto cambia.
 */
interface InputFieldProps {
    value: string;
    onChange: (v: string) => void;
}

/**
 * InputField
 * 
 * Campo de entrada de texto reutilizable.
 * Ideal para ingresar expresiones algebraicas u otras fórmulas.
 * 
 * Usa estilos personalizados y muestra un placeholder indicativo.
 */
export const InputField = ({ value, onChange }: InputFieldProps) => (
    <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Introduce una ecuación"
        placeholderTextColor={'#9C9C9C'}
    />
);

/**
 * Estilos para el campo de entrada.
 */
const styles = StyleSheet.create({
    input: {
        borderWidth: 1,          // Borde visible
        borderColor: '#ccc',     // Color de borde gris claro
        padding: 12,             // Espaciado interno
        borderRadius: 8,         // Esquinas redondeadas
        marginVertical: 8,       // Separación vertical entre componentes
    },
});
