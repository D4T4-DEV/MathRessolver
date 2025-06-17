import { AlgebraRule } from '../AlgebraRule';
import { DistributeRule } from './DistributeRule';
import { ReduceTermsRule } from './ReduceTermsRule';
import { SimplifyRule } from './SimplifyRule';
import { SolveLinearStepRule } from './SolveEquationLinear';
import { TransposeRule } from './TransposeRule';

/**
 * Lista de instancias de reglas algebraicas disponibles en la aplicación.
 * 
 * Estas reglas implementan la interfaz AlgebraRule y pueden ser aplicadas
 * en secuencia o de forma individual para manipular expresiones algebraicas.
 */
export const algebraRules: AlgebraRule[] = [
    new TransposeRule(),    // Regla para transponer términos en ecuaciones
    new DistributeRule(),   // Regla para aplicar la propiedad distributiva
    new ReduceTermsRule(),  // Regla para reducir términos semejantes
    new SimplifyRule(),     // Regla para simplificar expresiones algebraicas
    new SolveLinearStepRule(), // Regla para resolver expresiones algebraicas de primer grado
];
