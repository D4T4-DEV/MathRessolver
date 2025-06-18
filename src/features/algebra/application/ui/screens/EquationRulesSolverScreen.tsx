import React from 'react';
import { SolverRulesTemplate } from '../templates/SolverRuleTemplate';
import { useEquationRuleViewModel } from '../../viewmodels/useEquationRules';

export const EquationRulesSolverScreen = () => {
    const { input, setInput, steps, solve, rules } = useEquationRuleViewModel();

    return (
        <SolverRulesTemplate input={input} setInput={setInput} onSolve={solve} steps={steps} rules={rules} />
    );
};