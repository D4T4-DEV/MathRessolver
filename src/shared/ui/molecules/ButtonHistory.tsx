import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

/**
 * Props esperadas por el componente HistoryButton.
 * - onPress: función que se ejecuta al presionar el botón.
 * - sizeIcon (opcional): tamaño del ícono (por defecto: 24).
 * - colorIcon (opcional): color del ícono (por defecto: negro).
 */
interface HistoryButtonProps {
    onPress: () => Promise<void> | void;
    sizeIcon?: number;
    colorIcon?: string;
}

/**
 * HistoryButton
 * 
 * Botón que muestra un ícono de historial y ejecuta una acción al presionarse.
 * Está pensado para operaciones rápidas, no incluye indicador de carga ni deshabilitación.
 */
export const HistoryButton = ({
    onPress,
    sizeIcon = 24,
    colorIcon = 'black'
}: HistoryButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <FontAwesome5 name="history" size={sizeIcon} color={colorIcon} />
        </TouchableOpacity>
    );
};

/**
 * Estilos para el botón HistoryButton.
 */
const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
});
