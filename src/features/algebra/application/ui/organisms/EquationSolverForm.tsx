import React from 'react';
import { View, Button } from 'react-native';
import { EquationInput } from '../molecules/EquationInput';

/**
 * Props esperadas por el componente EquationSolverForm.
 * - input: valor actual del campo de texto (ecuación ingresada).
 * - setInput: función para actualizar el valor del input.
 * - onSolve: función que se ejecuta al presionar el botón de resolver.
 */
interface EquationSolverFormProp {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
}

/**
 * EquationSolverForm
 * 
 * Formulario compuesto para resolver ecuaciones algebraicas.
 * Incluye:
 * - Un campo de entrada (`EquationInput`) para ingresar la ecuación.
 * - Un botón para ejecutar el proceso de resolución.
 */
export const EquationSolverForm = ({
    input,
    setInput,
    onSolve,
}: EquationSolverFormProp) => (
    <View>
        {/* Campo de entrada de ecuación */}
        <EquationInput value={input} onChange={setInput} />

        {/* Botón que activa el proceso de resolución */}
        <Button title="Resolver" onPress={onSolve} />
    </View>
);
