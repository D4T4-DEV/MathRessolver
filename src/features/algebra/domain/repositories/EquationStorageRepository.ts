import { EquationResolution } from "../entities/EquationResolution";

export interface EquationStorageRepository {
    savedEquation(equation: EquationResolution): Promise<void>;
    loadEquationSaved(): Promise<EquationResolution[] | null>;
    deleteEquationsSaved(): Promise<void>;
}