import { parse } from 'mathjs';

export function toLatex(expression: string): string {
    try {
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