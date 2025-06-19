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
     * @returns Resultado parcial o final del paso aplicado
     */
    apply(expression: string): RuleResult {
        // Paso 0: Inicializar si es la primera vez
        if (this.stepIndex === 0) {
            const parts = expression.split('=').map(s => s.trim());
            if (parts.length !== 2) return { result: expression };

            this.lhs = nerdamer(parts[0]).expand().toString();
            this.rhs = nerdamer(parts[1]).expand().toString();
            this.currentExpr = `${this.lhs} = ${this.rhs}`;
            this.done = false;
        }

        if (this.done) {
            return { result: this.currentExpr, isFinal: true };
        }

        let resultStep: string | null = null;

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Mostrar la ecuación expandida
                resultStep = `${this.lhs} = ${this.rhs}`;
                break;

            case 1:
                // Paso 2: Llevar todo al lado izquierdo
                this.currentExpr = `(${this.lhs}) - (${this.rhs}) = 0`;
                resultStep = this.currentExpr;
                break;

            case 2:
                // Paso 3: Expandir y simplificar
                const simplified = nerdamer(this.currentExpr).expand().toString();
                this.currentExpr = `${simplified} = 0`;
                resultStep = this.currentExpr;
                break;

            case 3:
                // Paso 4: Resolver con nerdamer
                const cubicExpr = this.currentExpr.split('=')[0].trim();
                const roots = nerdamer.solve(cubicExpr, this.variable);

                // Formatea múltiples soluciones
                if (roots.length > 1) {
                    resultStep = roots.map((r: any, i: number) => `x${i + 1} = ${r.text()}`).join(', ');
                } else {
                    resultStep = `x = ${roots.text()}`;
                }

                this.done = true;
                break;
        }

        this.stepIndex++;

        return {
            result: resultStep ?? expression,
            isFinal: this.done,
        };
    }
}
