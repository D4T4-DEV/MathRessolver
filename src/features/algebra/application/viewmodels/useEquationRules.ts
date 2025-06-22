import { useState, useMemo } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { getAvailableRulesUseCase, applyRuleUseCase } from '../../di/container';
import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';

export const useEquationRuleViewModel = () => {
    const [input, setInput] = useState('');
    const [steps, setSteps] = useState<EquationStep[]>([]);

    const rules = useMemo<AlgebraRule[]>(() => getAvailableRulesUseCase.execute() ?? [], []);

    const solve = (rule: AlgebraRule) => {
        if (!input.trim()) return;
        const step = applyRuleUseCase.execute(rule, input);
        setSteps([step]);
    };

    return {
        input,
        setInput,
        steps,
        solve,
        rules,
    };
};
