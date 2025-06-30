import { LocalStorage } from "@/storage";
import { EquationResolution } from "../../domain/entities/EquationResolution";
import { EquationStorageRepository } from "../../domain/repositories/EquationStorageRepository";
import { keyToHistoryResolv } from "@/core/keys/localStorage";


export class EquationStorageRepositoryImpl implements EquationStorageRepository {
    constructor() { }

    async savedEquation(equation: EquationResolution): Promise<void> {
        try {
        const current = await this.loadEquationSaved() || [];
        await LocalStorage.save(keyToHistoryResolv, [...current, equation]);
        } catch (error) {
            console.error('Error guardando pasos localmente:', error);
        }
    }

    async loadEquationSaved(): Promise<EquationResolution[] | null> {
        try {
            const equationsSaved = await LocalStorage.load<EquationResolution[]>(keyToHistoryResolv);
            return equationsSaved ? equationsSaved : null;
        } catch (error) {
            console.error('Error cargando historial:', error);
            return null
        }
    }

    async deleteEquationsSaved(): Promise<void> {
        await LocalStorage.remove(keyToHistoryResolv);
    }
}