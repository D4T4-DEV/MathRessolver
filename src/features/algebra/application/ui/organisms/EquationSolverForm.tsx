import React from 'react';
import { View, Button } from 'react-native';
import { EquationInput } from '../molecules/EquationInput';
import { ResolvingButton } from '../molecules/ResolvingButton';

/**
 * Props esperadas por el componente EquationSolverForm.
 * - input: valor actual del campo de texto (ecuación ingresada).
 * - setInput: función para actualizar el valor del input.
 * - onSolve: función que se ejecuta al presionar el botón de resolver.
 * - isResolving: indica si la operación está en curso (true = mostrando carga).
 */
interface EquationSolverFormProp {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
    isResolving: boolean;
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
    isResolving
}: EquationSolverFormProp) => (
    <View>
        {/* Campo de entrada de ecuación */}
        <EquationInput value={input} onChange={setInput} />

        {/* Botón que activa el proceso de resolución */}
        {/* <Button title="Resolver" onPress={onSolve} /> */}
        <ResolvingButton onPress={onSolve} isResolving={isResolving} />
    </View>
);
