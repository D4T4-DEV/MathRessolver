import { MathNode, OperatorNode, ConstantNode, simplify } from 'mathjs';

type EquationType = 'lineal' | 'cuadratica' | 'exponencial' | 'desconocida';

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

    node.traverse((child: MathNode) => {
      if (isOperatorNode(child) && child.op === '^') {
        const exp = child.args[1];
        if (isConstantNode(exp)) {
          const value = exp.value;
          if (typeof value === 'string') {
            degrees.push(parseInt(value));
          } else if (typeof value === 'number') {
            degrees.push(value);
          }
        }
      }

      if (child.type === 'SymbolNode') {
        degrees.push(1); // x es grado 1 si no tiene exponente explícito
      }
    });

    const maxDegree = Math.max(...degrees);

    if (maxDegree === 1) return 'lineal';
    if (maxDegree === 2) return 'cuadratica';

    let isExponential = false;
    node.traverse((child: MathNode) => {
      if (isOperatorNode(child) && child.op === '^') {
        const exp = child.args[1];
        if (exp.type === 'SymbolNode') {
          isExponential = true;
        }
      }
    });

    if (isExponential) return 'exponencial';

    return 'desconocida';
  } catch {
    return 'desconocida';
  }
}
