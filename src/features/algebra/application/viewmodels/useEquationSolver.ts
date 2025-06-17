import { useState } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { getAvailableRulesUseCase } from '../../di/container';
import { applyRuleUseCase } from '../../di/container';

export const useEquationSolverViewModel = () => {
    const [input, setInput] = useState('');
    const [steps, setSteps] = useState<EquationStep[]>([]);

    const solve = () => {
        const rules = getAvailableRulesUseCase.execute();
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
                    break; // reinicia reglas desde el inicio
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
    };
};
