import { AlgebraRule } from "../AlgebraRule";
import { parse, simplify, MathNode, OperatorNode } from "mathjs";

/**
 * Función de tipo guard para indicar a TypeScript que un nodo es un OperatorNode.
 * Esto es necesario porque MathNode es un tipo base y no siempre reconoce las propiedades específicas.
 * 
 * @param node - Nodo genérico de mathjs
 * @returns true si el nodo es un OperatorNode
 */
function isOperatorNode(node: MathNode): node is OperatorNode {
  return (node as OperatorNode).isOperatorNode === true;
}

/**
 * Regla algebraica para "transponer" términos en una ecuación, es decir,
 * mover un término de un lado al otro del signo igual restándolo o sumándolo.
 * Implementa la interfaz AlgebraRule.
 */
export class TransposeRule implements AlgebraRule {
  // Nombre descriptivo de la regla
  name = "Transponer";

  /**
   * Aplica la regla de transposición en expresiones con igualdad.
   * Ejemplo: transforma "a + b = c" en "a = c - b".
   * 
   * @param expression - Expresión algebraica en formato string con un signo igual
   * @returns Expresión modificada con el término transpuesto o la original si no aplica o si hay error.
   */
  apply(expression: string): string {
    try {
      // Parseamos la expresión a un árbol de nodos mathjs
      const node = parse(expression);

      // Verificamos que el nodo raíz sea un operador '='
      if (!isOperatorNode(node) || node.op !== "=") return expression;

      // Extraemos los lados izquierdo y derecho de la igualdad
      const [left, right] = node.args;

      // Si el lado izquierdo es una suma (operador '+')
      if (isOperatorNode(left) && left.op === "+") {
        // Separamos el término principal y el que se desea mover
        const [main, toMove] = left.args;

        // Construimos el nuevo lado derecho restando el término a mover
        const newRight = simplify(`${right.toString()} - (${toMove.toString()})`);

        // Devolvemos la ecuación con el término transpuesto
        return `${main.toString()} = ${newRight.toString()}`;
      }

      // Si no cumple las condiciones para transponer, regresamos la expresión original
      return expression;
    } catch {
      // En caso de error, devolvemos mensaje indicativo
      return "Error al transponer";
    }
  }
}
