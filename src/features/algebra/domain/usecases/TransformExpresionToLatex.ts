import { ExpresionAlgebraica } from "../entities/ExpresionAlgebra";
import { ExpresionRepository } from "../repositories/ExpresionRepository";

export class TransformExpresionToLatex {
    constructor(private readonly repository: ExpresionRepository) { }

    // Ejecuta lo que se pase para poder transformarlo
    execute(expression: string): ExpresionAlgebraica {
        const result = this.repository.transformExpresionToLatex(expression);
        return result;
    }
}