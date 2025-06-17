import { parse } from 'mathjs';

/**
 * Convierte una expresión algebraica a su representación en LaTeX.
 * Soporta expresiones simples y ecuaciones con '='.
 *
 * @param expression - La expresión algebraica a convertir.
 * @returns Cadena en formato LaTeX.
 */
export function toLatex(expression: string): string {
    try {
        // Verifica si es una ecuación con '='
        if (expression.includes('=')) {
            const [lhs, rhs] = expression.split('=');

            if (!lhs || !rhs) {
                return '\\text{Expresión inválida}';
            }

            const lhsTex = parse(lhs).toTex();
            const rhsTex = parse(rhs).toTex();

            return `${lhsTex} = ${rhsTex}`;
        }

        // Si no contiene '=', se trata como una expresión normal
        const node = parse(expression);
        return node.toTex();
    } catch (err) {
        return '\\text{Error en la expresión}';
    }
}

// Ejemplo
// toLatex('sqrt(3^2 + 4^2)')
// parse(expression) ->  devuelve diferentes funciones
// node.toTex() -> Devuelve su valor en LaTex en este ejemplo \\sqrt{3^{2} + 4^{2}}
// Si esta mal, devolvera un mensaje de error