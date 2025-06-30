import { EquationResolution } from "../entities/EquationResolution";
import { EquationStorageRepository } from "../repositories/EquationStorageRepository";

export class SavedEquation {

    constructor(private readonly repo: EquationStorageRepository) { }

    async execute(equation: EquationResolution): Promise<void> {
        await this.repo.savedEquation(equation);
    }
}
