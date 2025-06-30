import { EquationStorageRepository } from "../repositories/EquationStorageRepository";

export class DeleteEquationsSaved {

    constructor(private readonly repo: EquationStorageRepository) { }

    async execute(): Promise<void> {
        await this.repo.deleteEquationsSaved();
    }
}
