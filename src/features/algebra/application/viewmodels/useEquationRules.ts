import { useState, useMemo } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { getAvailableRulesUseCase, applyRuleUseCase } from '../../di/container';
import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';

export const useEquationRuleViewModel = () => {
    const [input, setInput] = useState('');
    const [steps, setSteps] = useState<EquationStep[]>([]);

    const rules = useMemo<AlgebraRule[]>(() => getAvailableRulesUseCase.execute() ?? [], []);

    const solve = () => {
        if (!input.trim()) return;

        let current = input;
        const newSteps: EquationStep[] = [];

        let changed = true;
        while (changed) {
            changed = false;

            for (const rule of rules) {
                const step = applyRuleUseCase.execute(rule, current);

                if (step.expressionAfter !== current) {
                    newSteps.push(step);
                    current = step.expressionAfter!;
                    changed = true;
                    break;
                }
            }
        }

        setSteps(newSteps);
    };

    return {
        input,
        setInput,
        steps,
        solve,
        rules,
    };
};
