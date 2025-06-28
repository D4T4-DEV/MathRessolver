import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { EquationSolverForm } from '../organisms/EquationSolverForm';
import { EquationStep } from '@/features/algebra/domain/entities/EquationStep';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';
import { AccordionItem } from '@/shared/ui/organisms/AccordionItem';

/**
 * Props esperadas por el componente SolverTemplate.
 * - input: la expresión algebraica ingresada por el usuario.
 * - setInput: función para actualizar el input.
 * - onSolve: callback que se ejecuta al presionar "resolver".
 * - steps: lista de pasos intermedios generados por el motor de resolución.
 * - hasTriedToSolve: indica si el usuario intentó resolver al menos una vez.
 */
interface SolverTemplateProps {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
    steps: EquationStep[];
    hasTriedToSolve: boolean;
}

/**
 * Componente de presentación que muestra:
 * - Un formulario para ingresar ecuaciones algebraicas.
 * - La regla aplicada al resolver.
 * - La lista de pasos intermedios con representación en LaTeX y explicación desplegable.
 */
export const SolverTemplate = ({
    input,
    setInput,
    onSolve,
    steps,
    hasTriedToSolve
}: SolverTemplateProps) => {
    return (
        <View style={styles.fullScreen}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Formulario para introducir la ecuación y activar la resolución */}
                <EquationSolverForm input={input} setInput={setInput} onSolve={onSolve} />

                {/* Mensaje de error cuando no se generan pasos y el usuario ya intentó resolver */}
                {hasTriedToSolve && steps.length === 0 && (
                    <View style={styles.container}>
                        <Text>No entiendo la ecuación proporcionada :(</Text>
                    </View>
                )}

                {/* Muestra la primera regla aplicada si hay pasos disponibles */}
                {steps.length > 0 && (
                    <View style={styles.container}>
                        <Text>Regla aplicada:</Text>
                        <Text>{steps[0].ruleName}</Text>
                    </View>
                )}

                {/* Iteración sobre los pasos de resolución */}
                {steps.map((step, index) => {
                    const isLastStep = index === steps.length - 1;

                    return (
                        <View key={index} style={styles.container}>
                            {/* Pasos intermedios, antes del resultado final */}
                            {!isLastStep && (
                                <View style={styles.container}>
                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
                                        Paso {index + 1}:
                                    </Text>

                                    <Text>Antes:</Text>
                                    <MathRenderer math={step.latexBefore} style={styles.mathContainer} />

                                    <Text>Después:</Text>
                                    <MathRenderer math={step.latexAfter} style={styles.mathContainer} />

                                    {/* Acordeón con la descripción del paso */}
                                    <AccordionItem title={`Explícame el paso ${index + 1}`}>
                                        <Text style={{ fontStyle: 'italic', marginBottom: 4 }}>
                                            {step.description}
                                        </Text>
                                    </AccordionItem>
                                </View>
                            )}

                            {/* Último paso o conclusión */}
                            {isLastStep && (
                                <View>
                                    <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Dato importante</Text>

                                    <AccordionItem title={`Dato importante de resolución`}>
                                        <Text style={{ fontStyle: 'italic', marginBottom: 4 }}>
                                            {step.description}
                                        </Text>
                                        <MathRenderer math={step.latexBefore} style={styles.mathContainer} />
                                    </AccordionItem>
                                </View>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

/**
 * Estilos del componente SolverTemplate.
 */
const styles = StyleSheet.create({
    fullScreen: {
        flex: 1,
        backgroundColor: '#ffff' 
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32 
    },
    container: {
        marginVertical: 8 
    },
    mathContainer: {
        marginTop: 4,
        alignSelf: 'center',
        width: 200 
    }
});
