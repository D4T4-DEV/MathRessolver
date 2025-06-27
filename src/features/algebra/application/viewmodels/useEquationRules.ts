import { useState, useMemo } from 'react';
import { EquationStep } from '../../domain/entities/EquationStep';
import { getAvailableRulesUseCase, applyRuleUseCase } from '../../di/container';
import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';

/**
 * Hook personalizado que actúa como ViewModel para aplicar reglas algebraicas individuales.
 * Diseñado para usarse en interfaces donde el usuario puede seleccionar manualmente reglas para aplicar.
 */
export const useEquationRuleViewModel = () => {
    // Estado que almacena la expresión ingresada por el usuario
    const [input, setInput] = useState('');

    // Lista de pasos generados tras aplicar una regla (normalmente solo uno)
    const [steps, setSteps] = useState<EquationStep[]>([]);

    // Lista memorizada de reglas algebraicas disponibles en el sistema
    const rules = useMemo<AlgebraRule[]>(() => getAvailableRulesUseCase.execute() ?? [], []);

    /**
     * Aplica una regla algebraica específica a la expresión ingresada.
     * Genera un solo paso que representa la transformación.
     *
     * @param rule - Regla algebraica seleccionada por el usuario.
     */
    const solve = (rule: AlgebraRule) => {
        if (!input.trim()) return; // Validación: evita resolver si la entrada está vacía

        const step = applyRuleUseCase.execute(rule, input); // Aplica la regla a la expresión actual
        setSteps([step]); // Guarda el paso resultante (en este caso solo uno)
    };

    // Exposición de estado y funciones para el componente de presentación (UI)
    return {
        input,
        setInput,
        steps,
        solve,
        rules,
    };
};
