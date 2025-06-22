import { MathNode, OperatorNode, ConstantNode, simplify } from 'mathjs';
import { EquationType } from '../@types/global';

/**
 * Type guard para OperatorNode
 */
function isOperatorNode(node: MathNode): node is OperatorNode {
  return node.type === 'OperatorNode';
}

/**
 * Type guard para ConstantNode
 */
function isConstantNode(node: MathNode): node is ConstantNode {
  return node.type === 'ConstantNode';
}

/**
 * Detecta el tipo de ecuación algebraica.
 */
export function detectEquationType(expression: string): EquationType {
  try {
    const [lhs] = expression.split('=');
    const node = simplify(lhs);
    const degrees: number[] = [];
    let isExponential = false;

    node.traverse((child: MathNode, path, parent) => {
      if (isOperatorNode(child) && child.op === '^') {
        const base = child.args[0];
        const exp = child.args[1];

        // Detectar exponencial: exponente es símbolo
        if (exp.type === 'SymbolNode') {
          isExponential = true;
        }

        // Detectar grado de polinomio: exponente constante
        if (isConstantNode(exp)) {
          const value = exp.value;
          if (typeof value === 'string') {
            degrees.push(parseInt(value));
          } else if (typeof value === 'number') {
            degrees.push(value);
          }
        }
      }

      // Detectar x sin exponente (sólo si no está como exponente)
      if (
        child.type === 'SymbolNode' &&
        (!parent || !(isOperatorNode(parent) && parent.op === '^' && parent.args[1] === child))
      ) {
        degrees.push(1);
      }
    });

    const maxDegree = Math.max(...degrees);

    if (maxDegree === 1) return 'lineal';
    if (maxDegree === 2) return 'cuadratica';
    if (maxDegree === 3) return 'cubica';
    if (isExponential) return 'exponencial';

    return 'desconocida';
  } catch {
    return 'desconocida';
  }
}

// console.log(detectEquationType('x^3 + 2x^2 + x + 1 = 0')); // cubica
// console.log(detectEquationType('2x^2 - 4x + 1 = 0')); // cuadratica
// console.log(detectEquationType('3x + 1 = 0')); // lineal
// console.log(detectEquationType('2^x + 3 = 0')); // exponencial
// console.log(detectEquationType('log(x) = 1')); // desconocida