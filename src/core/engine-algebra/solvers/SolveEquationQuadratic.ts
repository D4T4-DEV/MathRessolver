import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones cuadráticas paso a paso.
 * Implementa la interfaz AlgebraRule.
 */
export class SolveQuadraticStepRule implements AlgebraRule {
    name = "Resolver Ecuación Cuadrática Paso a Paso";

    private stepIndex = 0;
    private lhs = '';
    private rhs = '';
    private currentExpr = '';
    private done = false;
    private variable = 'x';

    /**
     * Aplica la regla paso a paso sobre una ecuación cuadrática del tipo ax² + bx + c = 0.
     * Cada llamada avanza un paso en el proceso de resolución.
     * 
     * @param expression - La ecuación cuadrática (formato: 'ax^2 + bx + c = 0')
     * @returns Resultado parcial o final del paso aplicado
     */
    apply(expression: string): RuleResult {
        // Paso 0: Inicialización
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
                description: "Hemos obtenido la(s) solución(es) final(es) de la ecuación cuadrática."
            };
        }

        let resultStep: string | null = null;
        let description = '';

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Mostrar forma expandida
                resultStep = `${this.lhs} = ${this.rhs}`;
                description = "Mostramos la ecuación cuadrática en su forma expandida y simplificada.";
                break;

            case 1:
                // Paso 2: Llevar todo al lado izquierdo: lhs - rhs = 0
                this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
                resultStep = this.currentExpr;
                description = "Trasladamos todos los términos al lado izquierdo para igualar a cero.";
                break;

            case 2:
                // Paso 3: Simplificar la expresión
                const simplified = nerdamer(this.currentExpr).expand().toString();
                this.currentExpr = `${simplified} = 0`;
                resultStep = this.currentExpr;
                description = "Expandimos y simplificamos la expresión para agrupar términos semejantes.";
                break;

            case 3:
                // Paso 4: Resolver para x
                const polyExpr = this.currentExpr.split('=')[0].trim();
                const solution = nerdamer.solve(polyExpr, this.variable);
                if (solution.length > 1) {
                    resultStep = `x₁ = ${solution.get(0).text()}, x₂ = ${solution.get(1).text()}`;
                    description = "Encontramos las dos soluciones reales para la variable x.";
                } else {
                    resultStep = `x = ${solution.text()}`;
                    description = "Encontramos la solución para la variable x.";
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
