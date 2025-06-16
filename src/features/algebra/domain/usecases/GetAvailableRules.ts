import { AlgebraRule } from '@/core/engine-algebra-rules/AlgebraRule';
import { algebraRules } from '@/core/engine-algebra-rules/rules';

export class GetAvailableRulesUseCase {
  execute(): AlgebraRule[] {
    return algebraRules;
  }
}
