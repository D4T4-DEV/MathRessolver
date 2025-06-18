import { AlgebraRule } from '@/core/engine-algebra/AlgebraRule';
import { EquationStep } from '../entities/EquationStep';
import { TransformExpresionToLatex } from './TransformExpresionToLatex';

export class ApplySolver {
    constructor(
        private readonly transformToLatexUseCase: TransformExpresionToLatex,
    ) { }

    execute(rule: AlgebraRule, expression: string): EquationStep {
        // Obtiene el resultado (un paso)
        const ruleResult = rule.apply(expression);

        // Convierte antes y después a LaTeX
        const { laTex: latexBefore = '' } = this.transformToLatexUseCase.execute(expression);
        const { laTex: latexAfter = '' } = this.transformToLatexUseCase.execute(ruleResult.result);

        return {
            description: rule.name,
            latexBefore,
            latexAfter,
            ruleName: rule.name,
            isFinal: ruleResult.isFinal ?? false,
            expressionBefore: expression,
            expressionAfter: ruleResult.result,
        };
    }
}
