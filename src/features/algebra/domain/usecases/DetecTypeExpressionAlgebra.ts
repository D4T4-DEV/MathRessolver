import { EquationType } from '@/core/@types/global';
import { detectEquationType } from '@/core/utils/detectEquationType';

/**
 * Caso de uso para detectar el tipo de una expresión algebraica.
 */
export class DetecTypeExpressionAlgebraUseCase {
    constructor() { }

    execute(expression: string): EquationType {
        return detectEquationType(expression);
    }
}