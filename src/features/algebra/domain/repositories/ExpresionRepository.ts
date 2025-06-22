import { ExpresionAlgebraica } from "../entities/ExpresionAlgebra";

export interface ExpresionRepository {
    transformExpresionToLatex(expresion: string): ExpresionAlgebraica;
}