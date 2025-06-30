import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

/**
 * Props esperadas por el componente BackButton.
 * - onPress: función que se ejecuta al presionar el botón.
 * - sizeIcon (opcional): tamaño del ícono (por defecto: 24).
 * - colorIcon (opcional): color del ícono (por defecto: negro).
 */
interface BackButtonProps {
    onPress: () => Promise<void> | void;
    sizeIcon?: number;
    colorIcon?: string;
}

/**
 * BackButton
 * 
 * Botón con ícono de flecha hacia atrás (`arrow-back-outline`) que ejecuta una acción al presionarse.
 * Usualmente utilizado para navegación o retroceso dentro de una vista.
 */
export const BackButton = ({
    onPress,
    sizeIcon = 24,
    colorIcon = 'black'
}: BackButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <Ionicons name="arrow-back-outline" size={sizeIcon} color={colorIcon} />
        </TouchableOpacity>
    );
};

/**
 * Estilos para el botón BackButton.
 */
const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
});
