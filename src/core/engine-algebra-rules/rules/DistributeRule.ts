import { AlgebraRule } from "../AlgebraRule"; 
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
     * @returns La expresión resultante después de aplicar la distributiva, o un mensaje de error si falla.
     */
    apply(expression: string): string {
        try {
            // Usamos la función simplify de mathjs con la regla 'expand'
            // para distribuir productos sobre sumas (expandir la expresión)
            const expanded = simplify(expression, { rules: ['expand'] });

            // Convertimos el resultado a string para devolverlo
            return expanded.toString();
        } catch {
            // Si ocurre algún error durante el proceso, devolvemos un mensaje de error
            return "Error al aplicar distributiva";
        }
    }
}
