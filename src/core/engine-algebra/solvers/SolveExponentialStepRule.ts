import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones exponenciales paso a paso.
 * Soporta ecuaciones del tipo: a * b^x = c o a*(b^x) = c
 */
export class SolveExponentialStepRule implements AlgebraRule {
    name = "Resolver Ecuación Exponencial Paso a Paso";

    private stepIndex = 0;
    private lhs = '';
    private rhs = '';
    private base = '';
    private coefficient = '';
    private currentExpr = '';
    private done = false;
    private variable = 'x';

    apply(expression: string): RuleResult {
        if (this.stepIndex === 0) {
            const parts = expression.split('=').map(s => s.trim());
            if (parts.length !== 2) return { result: expression };

            this.lhs = nerdamer(parts[0]).toString(); // e.g. 2*(3^x)
            this.rhs = nerdamer(parts[1]).toString(); // e.g. 18
            this.currentExpr = `${this.lhs} = ${this.rhs}`;
            this.done = false;
        }

        if (this.done) {
            return { result: this.currentExpr, isFinal: true };
        }

        let resultStep: string | null = null;

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Mostrar la ecuación original
                resultStep = this.currentExpr;
                break;

            case 1:
                // Paso 2: Aislar la base exponencial dividiendo entre el coeficiente
                // Soporta formatos como 2*3^x y 2*(3^x)
                const match = this.lhs.match(/^([0-9.]+)\*\(?([a-zA-Z0-9]+)\^([a-zA-Z])\)?$/);
                if (!match) {
                    this.done = true;
                    return { result: 'Ecuación exponencial no compatible', isFinal: true };
                }

                this.coefficient = match[1]; // 2
                this.base = match[2];        // 3
                const exponent = match[3];   // x

                const simplified = nerdamer(`${this.rhs} / ${this.coefficient}`).toString(); // 18/2 → 9
                this.currentExpr = `${this.base}^${exponent} = ${simplified}`;
                resultStep = this.currentExpr;
                break;

            case 2:
                // Paso 3: Aplicar logaritmo a ambos lados
                const rightSide = this.currentExpr.split('=')[1].trim();
                this.currentExpr = `${this.variable} * log(${this.base}) = log(${rightSide})`;
                resultStep = this.currentExpr;
                break;

            case 3:
                // Paso 4: Despejar x → x = log(valor) / log(base)
                const simplifiedValue = nerdamer(`${this.rhs}/${this.coefficient}`).evaluate().toString(); // numérico
                const logExpr = `log(${simplifiedValue}) / log(${this.base})`;
                const result = nerdamer(logExpr).evaluate().toString();

                this.currentExpr = `${this.variable} = ${result}`;
                resultStep = this.currentExpr;
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
