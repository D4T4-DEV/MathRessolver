import { AlgebraRule } from "../AlgebraRule";
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
     * @returns La expresión simplificada como string o un mensaje de error si la simplificación falla.
     */
    apply(expression: string): string {
        try {
            // Utiliza la función simplify de mathjs para simplificar la expresión
            const simplified = simplify(expression);

            // Convierte el resultado a string y lo devuelve
            return simplified.toString();
        } catch {
            // En caso de error, devuelve un mensaje indicativo
            return "Error al simplificar";
        }
    }
}
