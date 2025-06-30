import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones cuadráticas paso a paso con explicaciones detalladas.
 * Implementa la interfaz AlgebraRule para proporcionar un proceso interactivo de resolución.
 */
export class SolveQuadraticStepRule implements AlgebraRule {
    name = "Resolución Detallada de Ecuación Cuadrática";

    private stepIndex = 0;
    private lhs = '';
    private rhs = '';
    private currentExpr = '';
    private done = false;
    private variable = 'x';

    /**
     * Aplica la regla paso a paso sobre una ecuación cuadrática.
     * Cada paso incluye una explicación detallada del procedimiento matemático realizado.
     * 
     * @param expression - La ecuación cuadrática en formato estándar (ej: 'ax^2 + bx + c = 0')
     * @returns Objeto RuleResult con el resultado del paso actual y su explicación
     */
    apply(expression: string): RuleResult {
        // Paso inicial: Preparación de la ecuación
        if (this.stepIndex === 0) {
            const parts = expression.split('=').map(s => s.trim());
            if (parts.length !== 2) return { result: expression };

            this.lhs = nerdamer(parts[0]).expand().toString();
            this.rhs = nerdamer(parts[1]).expand().toString();

            // Buscar la variable 
            // const variableMatch = expression.match(/[a-zA-Z]/);
            // this.variable = variableMatch ? variableMatch[0] : 'x'; // si no se encuetra pone la defecto X

            this.currentExpr = `${this.lhs} = ${this.rhs}`;
            this.done = false;
        }

        if (this.done) {
            return {
                result: this.currentExpr,
                isFinal: true,
                description: "Proceso completado. La ecuación cuadrática ha sido resuelta satisfactoriamente y se han determinado todas las posibles soluciones reales para la variable."
            };
        }

        let resultStep: string | null = null;
        let description = '';

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Presentación inicial de la ecuación
                resultStep = `${this.lhs} = ${this.rhs}`;
                description = "Primero, analizamos la ecuación cuadrática proporcionada. Hemos expandido y simplificado ambos lados de la ecuación para asegurar que no hay términos semejantes que puedan combinarse. Esta forma nos permite visualizar claramente la estructura de la ecuación.";
                break;

            case 1:
                // Paso 2: Preparación para la forma estándar
                this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
                resultStep = this.currentExpr;
                description = "Para resolver la ecuación cuadrática, primero debemos llevarla a su forma estándar (ax² + bx + c = 0). Restamos el lado derecho de la ecuación del lado izquierdo, trasladando todos los términos a un solo lado para igualar a cero. Este paso es fundamental para poder aplicar los métodos de resolución de ecuaciones cuadráticas.";
                break;

            case 2:
                // Paso 3: Simplificación de la expresión
                const simplified = nerdamer(this.currentExpr).expand().toString();
                this.currentExpr = `${simplified} = 0`;
                resultStep = this.currentExpr;
                description = "Ahora expandimos y simplificamos completamente la expresión algebraica. Combinamos términos semejantes y reorganizamos la ecuación en orden descendente de potencias (término cuadrático primero, luego lineal y finalmente constante). Esta forma ordenada nos permitirá identificar claramente los coeficientes a, b y c necesarios para la resolución.";
                break;

            case 3:
                // Paso 4: Resolución de la ecuación
                const polyExpr = this.currentExpr.split('=')[0].trim();
                const solution = nerdamer.solve(polyExpr, this.variable);

                if (solution.length > 1) {
                    resultStep = `x₁ = ${solution.get(0).text()}, x₂ = ${solution.get(1).text()}`;
                    description = "La ecuación cuadrática tiene dos soluciones reales distintas. Estas soluciones representan los puntos donde la parábola, que gráficamente representa la ecuación cuadrática, intersecta el eje x. Las soluciones pueden obtenerse mediante la fórmula cuadrática, completando el cuadrado o factorización, dependiendo del caso específico.";
                } else {
                    resultStep = `x = ${solution.text()}`;
                    description = "La ecuación cuadrática tiene una única solución real (una raíz doble). Esto ocurre cuando el discriminante es cero, lo que significa que la parábola toca el eje x en exactamente un punto, conocido como el vértice de la parábola.";
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