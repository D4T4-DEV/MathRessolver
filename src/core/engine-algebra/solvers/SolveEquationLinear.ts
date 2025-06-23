import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones lineales con explicación detallada.
 * 
 * Resuelve ecuaciones de primer grado de la forma general:
 *   ax + b = cx + d
 * mediante transformaciones algebraicas paso a paso, incluyendo:
 * 1. Simplificación inicial de términos
 * 2. Traslado de términos para agrupar variables
 * 3. Reducción a forma canónica
 * 4. Despeje final de la incógnita
 * 
 * Cada paso incluye fundamentación matemática detallada.
 */
export class SolveLinearStepRule implements AlgebraRule {
  name = "Resolución Detallada de Ecuación Lineal";

  // Control del proceso paso a paso
  private stepIndex = 0;
  private lhs = '';
  private rhs = '';
  private currentExpr = '';
  private done = false;
  private variable = '';

  /**
   * Aplica transformaciones algebraicas paso a paso con explicación detallada.
   * 
   * @param expression - Ecuación lineal en formato string (ej. "2x + 3 = 7 - x")
   * @returns Objeto con:
   *   - result: Estado actual de la ecuación
   *   - isFinal: Si es el paso final
   *   - description: Explicación detallada del paso
   */
  apply(expression: string): RuleResult {
    // Paso de inicialización y validación
    if (this.stepIndex === 0) {
      const parts = expression.split('=').map(s => s.trim());
      if (parts.length !== 2) return {
        result: expression,
        description: "La ecuación debe contener exactamente un signo igual que separa dos expresiones"
      };

      this.lhs = nerdamer(parts[0]).expand().toString();
      this.rhs = nerdamer(parts[1]).expand().toString();

      // Buscar la variable que se utilizo 
      const variableMatch = expression.match(/[a-zA-Z]/);
      this.variable = variableMatch ? variableMatch[0] : 'x'; // si no se encuetra pone la defecto X
      
      this.currentExpr = `${this.lhs} = ${this.rhs}`;
      this.done = false;
    }

    if (this.done) {
      return {
        result: this.currentExpr,
        isFinal: true,
        description: `Solución final obtenida. El valor ${this.currentExpr} es la única solución de la ecuación lineal. ` +
          `Geométricamente, representa el punto de intersección entre las rectas definidas por ambos lados ` +
          `de la ecuación original. Al sustituir este valor en la ecuación original, se satisface la igualdad.`
      };
    }

    let resultStep: string | null = null;
    let description: string = '';

    switch (this.stepIndex) {
      case 0:
        // Paso 1: Simplificación inicial
        resultStep = `${this.lhs} = ${this.rhs}`;
        description = `Preparamos la ecuación para su resolución expandiendo y simplificando ambos miembros. ` +
          `Hemos transformado "${expression}" a su forma desarrollada. ` +
          `Este paso es crucial para identificar claramente todos los términos algebraicos presentes ` +
          `y asegurar que no hay operaciones pendientes de resolver.`;
        break;

      case 1:
        // Paso 2: Normalización a forma canónica
        this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
        resultStep = this.currentExpr;
        description = `Trasladamos todos los términos a un solo miembro para igualar a cero. ` +
          `Restamos "${this.rhs}" a ambos lados aplicando el principio de equivalencia: ` +
          `si a = b entonces a - b = 0. Esta transformación nos permite trabajar con ` +
          `una sola expresión algebraica igualada a cero, lo que facilita el despeje.`;
        break;

      case 2:
        // Paso 3: Reducción de términos semejantes
        const simplified = nerdamer(this.currentExpr).expand().toString();
        this.currentExpr = simplified + ' = 0';
        resultStep = this.currentExpr;
        description = `Combinamos términos semejantes mediante expansión algebraica. ` +
          `Este proceso agrupa: (1) términos con la variable ${this.variable} y ` +
          `(2) términos constantes. La ecuación ahora muestra claramente los coeficientes ` +
          `que multiplican a la variable y el término independiente, preparándola para el despeje final.`;
        break;

      case 3:
        // Paso 4: Resolución final
        const solutions = nerdamer.solve(`${this.lhs} - (${this.rhs})`, this.variable);
        resultStep = `${this.variable} = ${solutions.text()}`;
        description = `Despejamos la variable ${this.variable} resolviendo la ecuación lineal resultante. ` +
          `El proceso consiste en: (1) Aislar los términos con ${this.variable}, ` +
          `(2) Factorizar ${this.variable}, y (3) Dividir por el coeficiente resultante. ` +
          `La solución obtenida es única porque las ecuaciones lineales tienen exactamente ` +
          `una solución real (excepto en casos especiales de identidad o contradicción).`;
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