import { useEffect, useState } from "react";
import { EquationResolution } from "../../domain/entities/EquationResolution";
import { deleteEquationsSavedUseCase, loadEquationSavedUseCase } from "../../di/container";

export const useHistoryViewModel = () => {
    const [history, setHistory] = useState<EquationResolution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const savedHistory = await loadEquationSavedUseCase.execute();
                if (savedHistory) setHistory(savedHistory);
            } catch (error) {
                console.error('Error cargando historial:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const deleteHistory = async () => {
        await deleteEquationsSavedUseCase.execute();
        setHistory([]);
        setLoading(false);
    }

    return {
        history,
        loading,
        deleteHistory
    };
};
