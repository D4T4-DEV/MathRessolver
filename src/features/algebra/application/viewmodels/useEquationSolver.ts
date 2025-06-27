import { useState, useMemo } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { applySolverUseCase } from '../../di/container';
import { algebraSolversFactory } from '@/core/engine-algebra/solvers';
import { DetecTypeExpressionAlgebraUseCase } from '../../domain/usecases/DetecTypeExpressionAlgebra';
import { EquationType } from '@/core/@types/global';

/**
 * Hook personalizado que actúa como ViewModel en una arquitectura MVVM.
 * Se encarga de manejar el estado y lógica para resolver ecuaciones algebraicas paso a paso.
 */
export const useEquationSolverViewModel = () => {
    // Estado que almacena la expresión ingresada por el usuario
    const [input, setInput] = useState('');

    // Lista de pasos intermedios para resolver la ecuación
    const [steps, setSteps] = useState<EquationStep[]>([]);

    // Tipo de ecuación detectada (lineal, cuadrática, etc.)
    const [equationType, setEquationType] = useState<EquationType>('desconocida');

    // Indica si el usuario ya intentó resolver una ecuación (para validaciones o feedback en la UI)
    const [hasTriedToSolve, setHasTriedToSolve] = useState(false);

    // Caso de uso que detecta el tipo de ecuación; se memoriza para evitar múltiples instancias
    const detectTypeUseCase = useMemo(() => new DetecTypeExpressionAlgebraUseCase(), []);

    /**
     * Función que se encarga de resolver la ecuación ingresada.
     * Detecta el tipo, aplica los solvers adecuados y genera los pasos de transformación.
     */
    const solve = () => {
        // Evita procesar si la entrada está vacía o solo tiene espacios
        if (!input.trim()) return;

        setHasTriedToSolve(true); // Marca que el usuario intentó resolver algo

        // Detecta el tipo de ecuación
        const tipo = detectTypeUseCase.execute(input);
        setEquationType(tipo);

        // Obtiene las fábricas de solvers correspondientes al tipo detectado
        const factories = algebraSolversFactory[tipo] ?? [];

        // Instancia cada solver desde su fábrica
        const solvers = factories.map(f => f());

        // Se trabajará sobre una copia del input para aplicar transformaciones
        let current = input;
        const newSteps: EquationStep[] = [];

        let changed = true;

        // Aplica los solvers de forma iterativa mientras haya cambios en la expresión
        while (changed) {
            changed = false;

            for (const solver of solvers) {
                // Aplica un solver a la expresión actual
                const step = applySolverUseCase.execute(solver, current);

                // Si hubo una transformación, guarda el paso y actualiza el estado actual
                if (step.expressionAfter !== current) {
                    newSteps.push(step);
                    current = step.expressionAfter!;
                    changed = true;

                    break; // Reinicia desde el primer solver
                }
            }
        }

        // Guarda los pasos generados y limpia la entrada
        setSteps(newSteps);
        setInput('');
    };

    // Retorna el estado y funciones necesarias para el componente de presentación (UI)
    return {
        input,
        setInput,
        steps,
        solve,
        equationType,
        hasTriedToSolve,
        setHasTriedToSolve
    };
};
