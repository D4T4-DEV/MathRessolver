import { useEffect, useState } from "react";
import { EquationResolution } from "../../domain/entities/EquationResolution";
import { LocalStorage } from "@/storage";
import { keyToHistoryResolv } from "@/core/keys/localStorage";

export const useHistoryViewModel = () => {
    const [history, setHistory] = useState<EquationResolution[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const savedHistory = await LocalStorage.load<EquationResolution[]>(keyToHistoryResolv);
                if (savedHistory) setHistory(savedHistory);
            } catch (error) {
                console.error('Error cargando historial:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return {
        history,
        loading
    };
};
