import { AlgebraRule } from "@/core/engine-algebra/AlgebraRule";
import { EquationStep } from "../entities/EquationStep";
import { EquationType } from "@/core/@types/global";

export interface EquationStepRepository {
    applyRule(rule: AlgebraRule, expression: string): EquationStep;
    getAvailableRules(): AlgebraRule[];
    applySolver(rule: AlgebraRule, expression: string): EquationStep;
    // getAvailableSolvers(): AlgebraRule[];
    detecTypeExpressionAlgebra(expression: string): EquationType;
}