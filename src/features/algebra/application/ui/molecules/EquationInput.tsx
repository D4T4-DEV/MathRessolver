import React from 'react';
import { View, Text } from 'react-native';
import { InputField } from '../atoms/InputField';

/**
 * Props esperadas por el componente EquationInput.
 * - value: texto actual de la ecuación ingresada.
 * - onChange: función que se ejecuta cuando el usuario modifica el texto.
 */
interface EquationInputProps {
    value: string;
    onChange: (v: string) => void;
}

/**
 * EquationInput
 * 
 * Componente compuesto que muestra una etiqueta ("Ecuación:")
 * y un campo de texto reutilizable (`InputField`) para ingresar expresiones algebraicas.
 */
export const EquationInput = ({ value, onChange }: EquationInputProps) => (
    <View>
        {/* Etiqueta del campo */}
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Ecuación:</Text>

        {/* Campo de entrada de texto */}
        <InputField value={value} onChange={onChange} />
    </View>
);
