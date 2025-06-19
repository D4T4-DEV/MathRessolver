import React from 'react';
// import { SafeAreaView } from 'react-native';
import { SolverTemplate } from '../templates/SolverTemplate';
import { useEquationSolverViewModel } from '../../viewmodels/useEquationSolver';

export const EquationSolverScreen = () => {
    const { input, setInput, steps, solve } = useEquationSolverViewModel();
    
    return (
        <SolverTemplate input={input} setInput={setInput} onSolve={solve} steps={steps} />
    );
};