import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';
import { algebraRules } from '@/core/engine-algebra/rules';

export class GetAvailableRulesUseCase {
  execute(): AlgebraRule[] {
    return algebraRules;
  }
}
