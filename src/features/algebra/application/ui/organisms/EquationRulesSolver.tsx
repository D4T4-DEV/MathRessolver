import React from 'react';
import { View, Button } from 'react-native';
import { EquationInput } from '../molecules/EquationInput';
import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';

interface EquationSolverFormProp {
    input: string;
    setInput: (v: string) => void;
    onSolve: (rule: AlgebraRule) => void;
    rules: AlgebraRule[];
}

export const EquationRulesSolverForm = ({ input, setInput, onSolve, rules }: EquationSolverFormProp) => (
    <View>
        <EquationInput value={input} onChange={setInput} />

        {/* Renderiza un botón por cada regla */}
        {rules.map((rule) => (
            <Button
                key={rule.name}
                title={rule.name}
                onPress={() => onSolve(rule)}
            />
        ))}
    </View>
);
