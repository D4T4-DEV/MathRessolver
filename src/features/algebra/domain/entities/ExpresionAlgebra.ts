export interface ExpresionAlgebraica {
    expresion?: string;
    laTex?: string;
}

/**
 * Representa una expresión algebraica junto con su equivalente en LaTeX.
 * Esta estructura se utiliza para mantener tanto la versión interna (texto plano)
 * como la presentación visual (LaTeX) de una expresión matemática.

export interface ExpresionAlgebraica {

     * Expresión algebraica en formato texto plano.
     * Ejemplo: "2x + 3 = 7"

    expresion?: string;

     * Representación de la expresión en formato LaTeX.
     * Ejemplo: "2x + 3 = 7" → "2x + 3 = 7" en sintaxis LaTeX.
     * Esta propiedad es útil para renderizar la expresión en la UI con MathJax o KaTeX.

    laTex?: string;
}

**/