import { EquationResolution } from "../entities/EquationResolution";
import { EquationStorageRepository } from "../repositories/EquationStorageRepository";

export class LoadEquationSaved {

    constructor(private readonly repo: EquationStorageRepository) { }

    async execute(): Promise<EquationResolution[] | null> {
        const data = await this.repo.loadEquationSaved();
        return data
    }
}
