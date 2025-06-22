import { AlgebraRule, RuleResult } from "../AlgebraRule";
import { simplify } from "mathjs";

/**
 * Regla algebraica para reducir términos semejantes en una expresión algebraica.
 * Implementa la interfaz AlgebraRule.
 */
export class ReduceTermsRule implements AlgebraRule {
    name = "Reducir términos";

    /**
     * Aplica la reducción de términos semejantes sobre la expresión dada.
     * 
     * @param expression - Expresión algebraica en formato string a simplificar.
     * @returns Un objeto RuleResult con la expresión reducida o un mensaje de error si falla.
     */
    apply(expression: string): RuleResult {
        try {
            const reduced = simplify(expression);
            return { result: reduced.toString() };
        } catch {
            return { result: "Error al reducir términos" };
        }
    }
}
