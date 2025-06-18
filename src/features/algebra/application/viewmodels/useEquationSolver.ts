import { useState, useMemo } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { applySolverUseCase } from '../../di/container';
import { algebraSolversByType } from '@/core/engine-algebra/solvers';
import { DetecTypeExpressionAlgebraUseCase } from '../../domain/usecases/DetecTypeExpressionAlgebra';
import { EquationType } from '@/core/@types/global';

export const useEquationSolverViewModel = () => {
    const [input, setInput] = useState('');
    const [steps, setSteps] = useState<EquationStep[]>([]);
    const [equationType, setEquationType] = useState<EquationType>('desconocida');

    const detectTypeUseCase = useMemo(() => new DetecTypeExpressionAlgebraUseCase(), []);

    const solve = () => {
        if (!input.trim()) return;

        const tipo = detectTypeUseCase.execute(input);
        setEquationType(tipo);

        const solvers = algebraSolversByType[tipo] ?? [];

        let current = input;
        const newSteps: EquationStep[] = [];

        let changed = true;
        while (changed) {
            changed = false;

            for (const solver of solvers) {
                const step = applySolverUseCase.execute(solver, current);

                if (step.expressionAfter !== current) {
                    newSteps.push(step);
                    current = step.expressionAfter!;
                    changed = true;
                    break; // Reinicia desde el principio
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
        equationType,
    };
};
