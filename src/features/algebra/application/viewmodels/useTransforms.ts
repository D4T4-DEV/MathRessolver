import { useState } from "react";
import { transformToLatexUseCase } from "../../di/container";
import { ExpresionAlgebraica } from "../../domain/entities/ExpresionAlgebra";

export function useMathTransforms() {
    const [expresion, setExpresion] = useState<ExpresionAlgebraica>({
        expresion: '',
        laTex: '',
    });

    const transformExpressionToLatex = (input: string) => {
        const result = transformToLatexUseCase.execute(input);
        setExpresion(result);
    };

    return {
        expresion,
        transformExpressionToLatex,
    };
}
