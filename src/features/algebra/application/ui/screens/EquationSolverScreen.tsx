import React from 'react';
import { SolverTemplate } from '../templates/SolverTemplate';
import { useEquationSolverViewModel } from '../../viewmodels/useEquationSolver';

/**
 * EquationSolverScreen
 * 
 * Pantalla principal para resolver ecuaciones algebraicas paso a paso.
 * 
 * Este componente actúa como "View" dentro del patrón MVVM.
 * Utiliza el hook `useEquationSolverViewModel` para acceder a:
 * - El input ingresado por el usuario.
 * - La función para actualizarlo.
 * - La función `solve` para resolver la ecuación.
 * - La lista de pasos de resolución.
 * - El indicador de intento de resolución.
 * 
 * Luego, pasa esos datos al componente de presentación `SolverTemplate`.
 */
export const EquationSolverScreen = () => {
    const {
        input,
        setInput,
        steps,
        solve,
        hasTriedToSolve
    } = useEquationSolverViewModel();

    return (
        <SolverTemplate
            input={input}
            setInput={setInput}
            onSolve={solve}
            steps={steps}
            hasTriedToSolve={hasTriedToSolve}
        />
    );
};
