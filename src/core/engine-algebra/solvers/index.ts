import { AlgebraRule } from '../AlgebraRule';
import { SolveLinearStepRule } from '../solvers/SolveEquationLinear';


/**
 * Lista de instancias de reglas algebraicas disponibles en la aplicación.
 * 
 * Estas reglas implementan la interfaz AlgebraRule y pueden ser aplicadas
 * en secuencia o de forma individual para manipular expresiones algebraicas.
 */
export const algebraSolvers: AlgebraRule[] = [
    new SolveLinearStepRule(), // Resolvedor de expresiones algebraicas de primer grado
];
