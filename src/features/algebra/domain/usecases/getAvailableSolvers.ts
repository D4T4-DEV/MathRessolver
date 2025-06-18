import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';
import { algebraSolvers } from '@/core/engine-algebra/solvers';

export class GetAvailableSolversUseCase {
    execute(): AlgebraRule[] {
        return algebraSolvers;
    }
}
