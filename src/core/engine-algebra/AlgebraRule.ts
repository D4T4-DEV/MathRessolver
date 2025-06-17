/**
 * Interfaz que define el contrato para las reglas algebraicas
 * que se pueden aplicar en la aplicación.
 * 
 * Cada regla debe tener un nombre descriptivo y un método 'apply'
 * que recibe una expresión algebraica en formato string y devuelve
 * la expresión resultante tras aplicar la regla, también en string.
 */
export interface AlgebraRule {
    // Nombre descriptivo de la regla algebraica
    name: string;

    /**
     * Aplica la regla algebraica sobre la expresión proporcionada.
     * 
     * @param expression - Expresión algebraica en formato string sobre la cual se aplicará la regla.
     * @returns La expresión resultante después de aplicar la regla, en formato RuleResult.
     */
    apply(expression: string): RuleResult;
}

export interface RuleResult {
    result: string;
    isFinal?: boolean;
}