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
    // Paso 0: Inicialización (solo en la primera llamada)
    if (this.stepIndex === 0) {
      const parts = expression.split('=').map(s => s.trim()); // Divide LHS y RHS
      if (parts.length !== 2) return { result: expression };  // Validación

      // Expande ambos lados de la ecuación
      this.lhs = nerdamer(parts[0]).expand().toString();
      this.rhs = nerdamer(parts[1]).expand().toString();
      this.currentExpr = `${this.lhs} = ${this.rhs}`;
      this.done = false; // Reinicia bandera de finalización
    }

    // Si ya se resolvió, devuelve el resultado final
    if (this.done) {
      return { result: this.currentExpr, isFinal: true };
    }

    let resultStep: string | null = null;

    // Ejecuta el paso correspondiente según stepIndex
    switch (this.stepIndex) {
      case 0:
        // Paso 1: Mostrar la ecuación simplificada
        resultStep = `${this.lhs} = ${this.rhs}`;
        break;

      case 1:
        // Paso 2: Reescribir en forma estándar: (lhs - rhs) = 0
        this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
        resultStep = this.currentExpr;
        break;

      case 2:
        // Paso 3: Expandir y simplificar la expresión resultante
        this.currentExpr = nerdamer(this.currentExpr).expand().toString() + ' = 0';
        resultStep = this.currentExpr;
        break;

      case 3:
        // Paso 4: Resolver para x usando nerdamer.solve
        const solutions = nerdamer.solve(`${this.lhs} - (${this.rhs})`, 'x');
        resultStep = `x = ${solutions.text()}`; // Solución final
        this.done = true; // Marca como finalizado
        break;
    }

    // Avanza al siguiente paso para la próxima llamada
    this.stepIndex++;

    // Devuelve el resultado del paso actual
    return {
      result: resultStep ?? expression,
      isFinal: this.done,
    };
  }
}