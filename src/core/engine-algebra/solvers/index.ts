import { EquationType } from '@/core/@types/global';
import { AlgebraRule } from '../AlgebraRule';
import { SolveLinearStepRule } from '../solvers/SolveEquationLinear';
import { SolveQuadraticStepRule } from './SolveEquationQuadratic';
import { SolveCubicStepRule } from './SolveEquationCubic';


/**
 * Lista de instancias de reglas algebraicas disponibles en la aplicación.
 * 
 * Estas reglas implementan la interfaz AlgebraRule y pueden ser aplicadas
 * en secuencia o de forma individual para manipular expresiones algebraicas.
 */
export const algebraSolvers: Record<EquationType, AlgebraRule[]> = {
    lineal: [new SolveLinearStepRule()],
    cuadratica: [new SolveQuadraticStepRule()],
    exponencial: [new SolveCubicStepRule()],
    desconocida: [],
};
