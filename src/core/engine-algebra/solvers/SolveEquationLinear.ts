import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

// Inicializa nerdamer como una instancia genérica
const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones lineales paso a paso.
 * Implementa la interfaz AlgebraRule para integrarse en el motor simbólico.
 */
export class SolveLinearStepRule implements AlgebraRule {
  name = "Resolver Ecuación Lineal Paso a Paso";

  // Estado interno para llevar el seguimiento del proceso paso a paso
  private stepIndex = 0;    // Índice del paso actual
  private lhs = '';         // Lado izquierdo de la ecuación
  private rhs = '';         // Lado derecho de la ecuación
  private currentExpr = ''; // Expresión actual en el proceso
  private done = false;     // Bandera para saber si la solución ha terminado

  /**
   * Aplica la regla paso a paso sobre una ecuación lineal del tipo ax + b = c.
   * Cada llamada a este método avanza un paso en el proceso de resolución.
   * 
   * @param expression - La ecuación lineal a resolver (formato: 'ax + b = c')
   * @returns El resultado parcial o final del paso aplicado
   */
  apply(expression: string): RuleResult {
    if (this.stepIndex === 0) {
      const parts = expression.split('=').map(s => s.trim());
      if (parts.length !== 2) return { result: expression };

      this.lhs = nerdamer(parts[0]).expand().toString();
      this.rhs = nerdamer(parts[1]).expand().toString();
      this.currentExpr = `${this.lhs} = ${this.rhs}`;
      this.done = false;
    }

    if (this.done) {
      return {
        result: this.currentExpr,
        isFinal: true,
        description: "Hemos llegado a la solución final de la ecuación lineal."
      };
    }

    let resultStep: string | null = null;
    let description: string = '';

    switch (this.stepIndex) {
      case 0:
        resultStep = `${this.lhs} = ${this.rhs}`;
        description = `Expresamos la ecuación original con ambos lados simplificados.`;
        break;

      case 1:
        this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
        resultStep = this.currentExpr;
        description = `Restamos ambos lados de la ecuación para llevarla a la forma estándar: (LHS - RHS) = 0.`;
        break;

      case 2:
        const simplified = nerdamer(this.currentExpr).expand().toString();
        this.currentExpr = simplified + ' = 0';
        resultStep = this.currentExpr;
        description = `Expandimos y simplificamos la expresión para agrupar todos los términos en un solo lado.`;
        break;

      case 3:
        const solutions = nerdamer.solve(`${this.lhs} - (${this.rhs})`, 'x');
        resultStep = `x = ${solutions.text()}`;
        description = `Resolvemos la ecuación para x, obteniendo la solución final.`;
        this.done = true;
        break;
    }

    this.stepIndex++;

    return {
      result: resultStep ?? expression,
      isFinal: this.done,
      description,
    };
  }
}