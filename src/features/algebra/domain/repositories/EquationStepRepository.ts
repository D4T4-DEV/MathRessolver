import { AlgebraRule } from "@/core/engine-algebra-rules/AlgebraRule";
import { EquationStep } from "../entities/EquationStep";

export interface EquationStepRepository {
    applyRule(rule: AlgebraRule, expression: string): EquationStep;
    getAvailableRules(): AlgebraRule[];
}