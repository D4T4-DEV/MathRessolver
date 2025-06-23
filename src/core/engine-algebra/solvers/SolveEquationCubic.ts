import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones cúbicas paso a paso con explicaciones detalladas.
 * Implementa métodos algebraicos para encontrar las raíces de polinomios de tercer grado.
 */
export class SolveCubicStepRule implements AlgebraRule {
    name = "Resolución Detallada de Ecuación Cúbica";

    private stepIndex = 0;
    private lhs = '';
    private rhs = '';
    private currentExpr = '';
    private done = false;
    private variable = 'x';

    /**
     * Aplica la regla paso a paso sobre una ecuación cúbica estándar.
     * Cada paso incluye una explicación matemática detallada del procedimiento.
     * 
     * @param expression - Ecuación cúbica en formato polinomial (ax³ + bx² + cx + d = 0)
     * @returns Objeto RuleResult con el paso actual y su fundamentación teórica
     */
    apply(expression: string): RuleResult {
        // Paso inicial: Normalización de la ecuación
        if (this.stepIndex === 0) {
            const parts = expression.split('=').map(s => s.trim());
            if (parts.length !== 2) return { result: expression };

            this.lhs = nerdamer(parts[0]).expand().toString();
            this.rhs = nerdamer(parts[1]).expand().toString();

            // Buscar la variable que se utilizo
            // const variableMatch = expression.match(/[a-zA-Z]/);
            // this.variable = variableMatch ? variableMatch[0] : 'x'; // si no se encuetra pone la defecto X

            this.currentExpr = `${this.lhs} = ${this.rhs}`;
            this.done = false;
        }

        if (this.done) {
            return {
                result: this.currentExpr,
                isFinal: true,
                description: "Proceso de resolución completado. Hemos determinado todas las raíces reales y complejas de la ecuación cúbica. Las soluciones encontradas representan los puntos donde la función polinómica de tercer grado intersecta el eje x."
            };
        }

        let resultStep: string | null = null;
        let description = '';

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Análisis inicial del polinomio
                resultStep = `${this.lhs} = ${this.rhs}`;
                description = "Iniciamos el proceso examinando la ecuación cúbica en su forma original. Hemos expandido y simplificado ambos miembros para identificar claramente los coeficientes del polinomio de tercer grado. Esta forma nos permite observar la estructura completa de la ecuación antes de comenzar el proceso de resolución.";
                break;

            case 1:
                // Paso 2: Reducción a la forma canónica
                this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
                resultStep = this.currentExpr;
                description = "Transformamos la ecuación a su forma canónica (P(x) = 0), moviendo todos los términos al lado izquierdo. Este paso es crucial porque los métodos de resolución de ecuaciones polinómicas requieren que la ecuación esté igualada a cero. La forma canónica nos permitirá aplicar técnicas como el Teorema de Cardano o factorización.";
                break;

            case 2:
                // Paso 3: Simplificación del polinomio
                const simplified = nerdamer(this.currentExpr).expand().toString();
                this.currentExpr = `${simplified} = 0`;
                resultStep = this.currentExpr;
                description = "Simplificamos completamente la expresión polinómica, combinando términos semejantes y ordenando los términos en orden descendente de grado (término cúbico, cuadrático, lineal e independiente). Esta forma ordenada es esencial para identificar correctamente los coeficientes a, b, c y d que utilizaremos en los métodos de resolución de ecuaciones cúbicas.";
                break;

            case 3:
                // Paso 4: Cálculo de raíces
                const cubicExpr = this.currentExpr.split('=')[0].trim();
                const roots = nerdamer.solve(cubicExpr, this.variable);

                if (roots.length > 1) {
                    resultStep = roots.map((r: any, i: number) => {
                        const rootType = r.text().includes('i') ? 'compleja' : 'real';
                        return `x${i + 1} = ${r.text()} (${rootType})`;
                    }).join(', ');
                    description = "Hemos calculado todas las raíces del polinomio cúbico. Una ecuación cúbica puede tener: tres raíces reales (todas distintas o una doble y una simple), o una raíz real y dos complejas conjugadas. El Teorema Fundamental del Álgebra garantiza exactamente tres soluciones (contando multiplicidades) en el campo complejo. Las soluciones encontradas representan los ceros de la función polinómica.";
                } else {
                    resultStep = `x = ${roots.text()}`;
                    description = "La ecuación cúbica presenta una única raíz real (con multiplicidad tres). Este caso especial ocurre cuando el polinomio es un cubo perfecto. Gráficamente, esto significa que la curva toca el eje x en un solo punto con una tangente triple.";
                }

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