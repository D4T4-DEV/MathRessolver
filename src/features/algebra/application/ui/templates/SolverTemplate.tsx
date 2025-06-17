import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { EquationSolverForm } from '../organisms/EquationSolverForm';
import { EquationStep } from '@/features/algebra/domain/entities/EquationStep';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';

interface SolverTemplateProps {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
    steps: EquationStep[];
}

export const SolverTemplate = ({
    input,
    setInput,
    onSolve,
    steps,
}: SolverTemplateProps) => (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
        <EquationSolverForm input={input} setInput={setInput} onSolve={onSolve} />
        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Pasos:</Text>
        {steps.map((step, index) => (
            <View key={index} style={{ marginVertical: 8 }}>
                <Text>Regla aplicada: {step.description}</Text>
                <Text>Antes:</Text>
                <MathRenderer math={step.latexAfter} />
                <Text>Después:</Text>
                <MathRenderer math={step.latexBefore} />
            </View>
        ))}
    </ScrollView>
);