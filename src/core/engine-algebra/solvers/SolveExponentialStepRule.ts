import { AlgebraRule, RuleResult } from "../AlgebraRule";
import nerdamerImport from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Solve';

const nerdamer = nerdamerImport as any;

/**
 * Regla algebraica para resolver ecuaciones exponenciales paso a paso.
 * 
 * Esta regla está diseñada para resolver ecuaciones del tipo:
 *   a * b^x = c
 * donde:
 * - a es el coeficiente numérico (por ejemplo, 2)
 * - b es la base de la potencia (por ejemplo, 3)
 * - x es la variable desconocida que se quiere despejar
 * - c es el resultado conocido (por ejemplo, 18)
 * 
 * La resolución se realiza paso a paso, explicando cada transformación:
 * 1. Mostrar la ecuación original.
 * 2. Aislar la potencia exponencial dividiendo ambos lados por el coeficiente.
 * 3. Aplicar logaritmo en ambos lados para bajar el exponente.
 * 4. Despejar la variable dividiendo logaritmos.
 * 
 * Implementa la interfaz AlgebraRule para integrarse en el motor algebraico.
 */
export class SolveExponentialStepRule implements AlgebraRule {
    name = "Resolución Detallada de Ecuación Exponencial";

    // Índice del paso actual (incrementa con cada llamada a apply)
    private stepIndex = 0;
    // Lado izquierdo de la ecuación (ejemplo: "2*(3^x)")
    private lhs = '';
    // Lado derecho de la ecuación (ejemplo: "18")
    private rhs = '';
    // Base de la potencia exponencial (ejemplo: "3")
    private base = '';
    // Coeficiente multiplicador (ejemplo: "2")
    private coefficient = '';
    // Expresión algebraica actual que refleja el estado de la resolución
    private currentExpr = '';
    // Bandera que indica si la solución ha sido completada
    private done = false;
    // Variable a despejar (por defecto 'x')
    private variable = 'x';

    /**
     * Método principal que aplica la regla paso a paso.
     * 
     * Cada vez que se llama avanza un paso en la resolución de la ecuación.
     * 
     * @param expression - La ecuación exponencial en formato string, por ejemplo "2*(3^x) = 18"
     * @returns Un objeto RuleResult que contiene:
     *  - result: la expresión algebraica resultante en el paso actual
     *  - isFinal: booleano que indica si la resolución terminó
     *  - description: explicación textual de la transformación aplicada en este paso
     */
    apply(expression: string): RuleResult {
        // Inicialización en la primera llamada
        if (this.stepIndex === 0) {
            const parts = expression.split('=').map(s => s.trim());
            if (parts.length !== 2) return { result: expression };

            this.lhs = nerdamer(parts[0]).toString();
            this.rhs = nerdamer(parts[1]).toString();

            // Buscar la variable 
            // const variableMatch = expression.match(/[a-zA-Z]/);
            // this.variable = variableMatch ? variableMatch[0] : 'x'; // si no se encuetra pone la defecto X

            this.currentExpr = `${this.lhs} = ${this.rhs}`;
            this.done = false;
        }

        // Si ya terminó, devuelve el resultado final con su descripción
        if (this.done) {
            return {
                result: this.currentExpr,
                isFinal: true,
                description: "Hemos encontrado la solución para la ecuación exponencial."
            };
        }

        let resultStep: string | null = null;
        let description = '';

        switch (this.stepIndex) {
            case 0:
                // Paso 1: Mostrar la ecuación original
                resultStep = this.currentExpr;
                description = `Paso 1: Escribimos la ecuación original. Queremos encontrar el valor de ${this.variable} en una expresión exponencial.`;
                break;

            case 1:
                // Paso 2: Aislar la potencia exponencial dividiendo entre el coeficiente
                const match = this.lhs.match(/^([0-9.]+)\*\(?([a-zA-Z0-9]+)\^([a-zA-Z])\)?$/);
                if (!match) {
                    this.done = true;
                    return {
                        result: 'Ecuación exponencial no compatible',
                        isFinal: true,
                        description: `La ecuación no tiene el formato esperado (a * b^x = c). Asegúrate de que esté en esa forma para aplicar esta regla.`,
                    };
                }

                this.coefficient = match[1];
                this.base = match[2];
                const exponent = match[3];

                const simplified = nerdamer(`${this.rhs} / ${this.coefficient}`).toString();
                this.currentExpr = `${this.base}^${exponent} = ${simplified}`;
                resultStep = this.currentExpr;
                description =
                    `Paso 2: Dividimos ambos lados de la ecuación entre el coeficiente ${this.coefficient} para aislar la potencia ${this.base}^${exponent}. ` +
                    `Esto nos permite tener la potencia sola en un lado, facilitando el siguiente paso.`;
                break;

            case 2:
                // Paso 3: Aplicar logaritmo a ambos lados para bajar el exponente
                const rightSide = this.currentExpr.split('=')[1].trim();
                this.currentExpr = `${this.variable} * log(${this.base}) = log(${rightSide})`;
                resultStep = this.currentExpr;
                description =
                    `Paso 3: Aplicamos logaritmo en ambos lados de la ecuación. ` +
                    `Esto aprovecha la propiedad logarítmica: log(b^x) = x * log(b), lo cual nos permite bajar el exponente ` +
                    `y transformar la ecuación exponencial en una ecuación lineal.`;
                break;

            case 3:
                // Paso 4: Despejar x → x = log(valor) / log(base)
                const simplifiedValue = nerdamer(`${this.rhs}/${this.coefficient}`).evaluate().toString();
                const logExpr = `log(${simplifiedValue}) / log(${this.base})`;
                const result = nerdamer(logExpr).evaluate().toString();

                this.currentExpr = `${this.variable} = ${result}`;
                resultStep = this.currentExpr;
                description =
                    `Paso 4: Finalmente despejamos ${this.variable} dividiendo ambos lados entre log(${this.base}). ` +
                    `Aplicamos la fórmula: x = log(${simplifiedValue}) / log(${this.base}). ` +
                    `Este es el valor final de la incógnita.`;
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
