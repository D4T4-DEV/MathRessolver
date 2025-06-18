import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { EquationStep } from '@/features/algebra/domain/entities/EquationStep';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';
import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';
import { EquationRulesSolverForm } from '../organisms/EquationRulesSolver';

interface SolverTemplateProps {
    input: string;
    setInput: (v: string) => void;
    onSolve: (rule: AlgebraRule) => void;
    rules: AlgebraRule[];
    steps: EquationStep[];
}

export const SolverRulesTemplate = ({
    input,
    setInput,
    onSolve,
    rules,
    steps,
}: SolverTemplateProps) => (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Ahora le pasamos las reglas y la función que recibe una regla */}
        <EquationRulesSolverForm input={input} setInput={setInput} onSolve={onSolve} rules={rules} />

        {steps.length > 0 && (
            <View style={{ marginVertical: 8 }}>
                <Text>Regla aplicada:</Text>
                <Text>{steps[0].description}</Text>
            </View>
        )}

        <Text style={{ fontWeight: 'bold', marginTop: 20 }}>Pasos:</Text>
        {steps.map((step, index) => (
            <View key={index} style={{ marginVertical: 8 }}>
                <Text>Antes:</Text>
                <MathRenderer math={step.latexBefore} />
                <Text>Después:</Text>
                <MathRenderer math={step.latexAfter} />
            </View>
        ))}
    </ScrollView>
);
