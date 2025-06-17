import { AlgebraRule, RuleResult } from "../AlgebraRule";
import { simplify } from "mathjs";

/**
 * Regla algebraica para aplicar la propiedad distributiva en expresiones algebraicas.
 * Implementa la interfaz AlgebraRule.
 */
export class DistributeRule implements AlgebraRule {
    name = "Distributiva";

    /**
     * Aplica la regla distributiva sobre la expresión algebraica dada.
     * 
     * @param expression - Expresión algebraica en formato string sobre la cual aplicar la distributiva.
     * @returns Un objeto RuleResult con la expresión expandida o un mensaje de error si falla.
     */
    apply(expression: string): RuleResult {
        try {
            const expanded = simplify(expression, { rules: ['expand'] });
            return { result: expanded.toString() };
        } catch {
            return { result: "Error al aplicar distributiva" };
        }
    }
}
