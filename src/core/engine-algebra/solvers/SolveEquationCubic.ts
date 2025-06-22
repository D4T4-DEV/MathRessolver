import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones cúbicas paso a paso.
 * Implementa la interfaz AlgebraRule.
 */
export class SolveCubicStepRule implements AlgebraRule {
    name = "Resolver Ecuación Cúbica Paso a Paso";

    private stepIndex = 0;
    private lhs = '';
    private rhs = '';
    private currentExpr = '';
    private done = false;
    private variable = 'x';

    /**
     * Aplica la regla paso a paso sobre una ecuación cúbica del tipo ax^3 + bx^2 + cx + d = 0.
     * 
     * @param expression - La ecuación cúbica (formato: 'ax^3 + bx^2 + cx + d = 0')
     * @returns Resultado parcial o final del paso aplicado con su descripcion
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
                description: "Hemos encontrado todas las soluciones de la ecuación cúbica."
            };
        }

        let resultStep: string | null = null;
        let description = '';

        switch (this.stepIndex) {
            case 0:
                resultStep = `${this.lhs} = ${this.rhs}`;
                description = "Mostramos la ecuación cúbica en su forma expandida y simplificada.";
                break;

            case 1:
                this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
                resultStep = this.currentExpr;
                description = "Movemos todos los términos al lado izquierdo para igualar a cero.";
                break;

            case 2:
                const simplified = nerdamer(this.currentExpr).expand().toString();
                this.currentExpr = `${simplified} = 0`;
                resultStep = this.currentExpr;
                description = "Expandimos y simplificamos la expresión para agrupar términos semejantes.";
                break;

            case 3:
                const cubicExpr = this.currentExpr.split('=')[0].trim();
                const roots = nerdamer.solve(cubicExpr, this.variable);

                if (roots.length > 1) {
                    resultStep = roots.map((r: any, i: number) => `x${i + 1} = ${r.text()}`).join(', ');
                    description = "Calculamos las tres soluciones (raíces) de la ecuación cúbica.";
                } else {
                    resultStep = `x = ${roots.text()}`;
                    description = "Calculamos la solución de la ecuación cúbica.";
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
