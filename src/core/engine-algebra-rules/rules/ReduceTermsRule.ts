import { AlgebraRule } from "../AlgebraRule";
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
     * @returns La expresión simplificada (con términos reducidos) o un mensaje de error si falla.
     */
    apply(expression: string): string {
        try {
            // Usamos simplify de mathjs para combinar y reducir términos semejantes
            const reduced = simplify(expression);

            // Devolvemos la expresión resultante como string
            return reduced.toString();
        } catch {
            // En caso de error, devolver un mensaje indicativo
            return "Error al reducir términos";
        }
    }
}
