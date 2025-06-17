import React from 'react';
import { View, Button } from 'react-native';
import { EquationInput } from '../molecules/EquationInput';

interface EquationSolverFormProp {
    input: string;
    setInput: (v: string) => void;
    onSolve: () => void;
}


export const EquationSolverForm = ({ input, setInput, onSolve, }: EquationSolverFormProp) => (
    <View>
        <EquationInput value={input} onChange={setInput} />
        <Button title="Resolver" onPress={onSolve} />
    </View>
);
