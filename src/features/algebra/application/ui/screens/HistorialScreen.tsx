import React, { useLayoutEffect } from 'react';
import { useHistoryViewModel } from '../../viewmodels/useHistory';
import { HistoryTemplate } from '../templates/HistoryTemplate';
import { useRouter, useNavigation } from 'expo-router';
import { BackButton } from '@/shared/ui/molecules/ButtonBack';
import { DeleteButton } from '@/shared/ui/molecules/ButtonDelete';

/**
 * HistorialScreen
 * 
 * Pantalla encargada de mostrar el historial de resoluciones algebraicas.
 * - Utiliza el viewmodel `useHistoryViewModel` para obtener el estado de carga, historial y función de borrado.
 * - Configura dinámicamente el header con botones personalizados:
 *    - Botón de regreso (BackButton).
 *    - Botón de borrado de historial (DeleteButton), visible solo si hay elementos en el historial.
 */
const HistorialScreen = () => {
    const router = useRouter();
    const navigation = useNavigation();
    const { loading, history, deleteHistory } = useHistoryViewModel();

    // Configuración dinámica del header según el estado del historial
    useLayoutEffect(() => {
        navigation.setOptions({
            // Botón de navegación (izquierda)
            headerLeft: () => (
                <BackButton onPress={() => router.replace('/')} />
            ),
            // Botón de borrar historial (derecha) solo si hay elementos
            headerRight: () =>
                history.length > 0 ? (
                    <DeleteButton onPress={deleteHistory} />
                ) : null,
        });
    }, [history]);

    return (
        <HistoryTemplate
            history={history}
            loading={loading}
        />
    );
};

export default HistorialScreen;
