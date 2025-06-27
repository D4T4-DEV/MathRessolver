import { useState } from "react";
import { transformToLatexUseCase } from "../../di/container";
import { ExpresionAlgebraica } from "../../domain/entities/ExpresionAlgebra";

/**
 * Hook personalizado que actúa como ViewModel para transformar expresiones algebraicas a formato LaTeX.
 * Encapsula el estado de una expresión y su representación en LaTeX, utilizando un caso de uso del dominio.
 */
export function useMathTransforms() {
    // Estado que almacena la expresión en formato crudo y en formato LaTeX
    const [expresion, setExpresion] = useState<ExpresionAlgebraica>({
        expresion: '', // Expresión original ingresada por el usuario
        laTex: '',     // Representación en LaTeX de la expresión
    });

    /**
     * Transforma una cadena de texto algebraica a su versión en LaTeX.
     * Utiliza el caso de uso correspondiente para mantener la lógica de dominio desacoplada.
     *
     * @param input - Expresión algebraica en formato string.
     */
    const transformExpressionToLatex = (input: string) => {
        const result = transformToLatexUseCase.execute(input); // Ejecuta la transformación
        setExpresion(result); // Actualiza el estado con la nueva representación
    };

    // Expone el estado y la función de transformación al componente de presentación (UI)
    return {
        expresion,
        transformExpressionToLatex,
    };
}
