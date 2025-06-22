import { EquationType } from '@/core/@types/global';
import { AlgebraRule } from '../AlgebraRule';
import { SolveLinearStepRule } from '../solvers/SolveEquationLinear';
import { SolveQuadraticStepRule } from './SolveEquationQuadratic';
import { SolveCubicStepRule } from './SolveEquationCubic';
import { SolveExponentialStepRule } from './SolveExponentialStepRule';


/**
 * Lista de instancias de reglas algebraicas disponibles en la aplicación.
 * 
 * Estas reglas implementan la interfaz AlgebraRule y pueden ser aplicadas
 * en secuencia o de forma individual para manipular expresiones algebraicas.
 */
export const algebraSolversFactory: Record<EquationType, (() => AlgebraRule)[]> = {
    lineal: [() => new SolveLinearStepRule()],
    cuadratica: [() => new SolveQuadraticStepRule()],
    cubica: [() => new SolveCubicStepRule()],
    exponencial: [() => new SolveExponentialStepRule()],
    desconocida: [],
};