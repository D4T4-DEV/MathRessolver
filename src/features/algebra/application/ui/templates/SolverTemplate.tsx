import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { EquationSolverForm } from '../organisms/EquationSolverForm';
import { EquationStep } from '@/features/algebra/domain/entities/EquationStep';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';

/**
 * Props esperadas por el componente SolverTemplate.
 * - input: la expresión algebraica ingresada por el usuario.
 * - setInput: función para actualizar el input.
 * - onSolve: callback que se ejecuta al presionar "resolver".
 * - steps: lista de pasos intermedios generados por el motor de resolución.
 */
interface SolverTemplateProps {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
    steps: EquationStep[];
}

/**
 * Componente de presentación que muestra:
 * - Un formulario para ingresar ecuaciones algebraicas.
 * - La regla aplicada al resolver.
 * - La lista de pasos intermedios, mostrando "Antes" y "Después" en cada uno,
 *   excepto en el último paso que solo muestra la descripción.
 */
export const SolverTemplate = ({
    input,
    setInput,
    onSolve,
    steps,
}: SolverTemplateProps) => {
    // Cantidad total de pasos obtenidos por el motor de resolución
    const stepsCount = steps.length;

    return (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
            {/* Formulario para ingresar ecuaciones y activar resolución */}
            <EquationSolverForm input={input} setInput={setInput} onSolve={onSolve} />

            {/* Si hay pasos, se muestra la regla aplicada en el primer paso */}
            {steps.length > 0 && (
                <View style={{ marginVertical: 8 }}>
                    <Text>Regla aplicada:</Text>
                    <Text>{steps[0].ruleName}</Text>
                </View>
            )}

            {/* Sección que lista los pasos de resolución */}
            <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Pasos:</Text>

            {steps.map((step, index) => {
                const isLastStep = index === stepsCount - 1;

                return (
                    <View key={index} style={{ marginVertical: 8 }}>
                        {/* Descripción textual del paso actual */}
                        <Text style={{ fontStyle: 'italic', marginBottom: 4 }}>
                            {step.description}
                        </Text>

                        {/* Mostrar LaTeX de "Antes" y "Después" solo si NO es el último paso */}
                        {!isLastStep && (
                            <View>
                                <Text>Antes:</Text>
                                <MathRenderer math={step.latexBefore} />

                                <Text>Después:</Text>
                                <MathRenderer math={step.latexAfter} />
                            </View>
                        )}
                    </View>
                );
            })}
        </ScrollView>
    );
};
