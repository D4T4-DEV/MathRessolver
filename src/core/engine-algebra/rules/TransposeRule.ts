import { AlgebraRule, RuleResult } from "../AlgebraRule";
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
   * @returns Un objeto RuleResult con la expresión transpuesta o la original si no aplica.
   */
  apply(expression: string): RuleResult {
    try {
      const node = parse(expression);

      if (!isOperatorNode(node) || node.op !== "=") {
        return { result: expression };
      }

      const [left, right] = node.args;

      if (isOperatorNode(left) && left.op === "+") {
        const [main, toMove] = left.args;
        const newRight = simplify(`${right.toString()} - (${toMove.toString()})`);
        const newExpression = `${main.toString()} = ${newRight.toString()}`;

        return { result: newExpression };
      }

      return { result: expression };
    } catch {
      return { result: "Error al transponer" };
    }
  }
}
