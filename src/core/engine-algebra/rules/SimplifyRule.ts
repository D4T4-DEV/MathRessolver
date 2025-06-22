import { AlgebraRule, RuleResult } from "../AlgebraRule";
import { simplify } from "mathjs";

/**
 * Regla algebraica para simplificar una expresión matemática.
 * Implementa la interfaz AlgebraRule.
 */
export class SimplifyRule implements AlgebraRule {
    name = "Simplificar";

    /**
     * Aplica la simplificación a la expresión algebraica dada.
     * 
     * @param expression - Expresión en formato string que será simplificada.
     * @returns Un objeto RuleResult con la expresión simplificada o el mensaje de error.
     */
    apply(expression: string): RuleResult {
        try {
            const simplified = simplify(expression);
            return { result: simplified.toString() };
        } catch {
            return { result: "Error al simplificar" };
        }
    }
}
