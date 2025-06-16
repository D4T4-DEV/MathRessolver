
import { AlgebraRule } from '@/core/engine-algebra-rules/AlgebraRule';
import { EquationStep } from '../entities/EquationStep';
import { TransformExpresionToLatex } from './TransformExpresionToLatex';

export class ApplyRule {
    constructor(
        private readonly transformToLatexUseCase: TransformExpresionToLatex,
    ) { }

    execute(rule: AlgebraRule, expression: string): EquationStep {
        const { laTex: latexBefore = '' } = this.transformToLatexUseCase.execute(expression);
        const result = rule.apply(expression);
        const { laTex: latexAfter = '' } = this.transformToLatexUseCase.execute(result);

        return {
            latexBefore,
            latexAfter,
            description: rule.name,
        };
    }
}
