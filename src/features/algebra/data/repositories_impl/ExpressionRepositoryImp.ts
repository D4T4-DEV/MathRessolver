import { toLatex } from "@/core/utils/astToLatex";
import { ExpresionRepository } from "../../domain/repositories/ExpresionRepository";
import { ExpresionAlgebraica } from "../../domain/entities/ExpresionAlgebra";

export class ExpresionRepositoryImpl implements ExpresionRepository {
    constructor() { }

    // funcion para poder obtener de una expresion comun un latex
    transformExpresionToLatex(expresion: string): ExpresionAlgebraica {
        const transform = toLatex(expresion);
        return (
            {
                expresion: expresion,
                laTex: transform
            }
        );
    }
}