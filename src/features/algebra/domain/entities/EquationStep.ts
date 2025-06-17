export interface EquationStep {
  description: string;
  latexBefore: string;
  latexAfter: string;
  ruleName: string;
  isFinal?: boolean;
  expressionBefore?: string;
  expressionAfter?: string;
}
