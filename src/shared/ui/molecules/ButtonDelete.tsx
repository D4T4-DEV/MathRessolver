import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * Props esperadas por el componente DeleteButtonProps.
 * - onPress: función que se ejecuta al presionar el botón.
 * - sizeIcon (opcional): tamaño del ícono (por defecto: 24).
 * - colorIcon (opcional): color del ícono (por defecto: negro).
 */
interface DeleteButtonProps {
    onPress: () => Promise<void> | void;
    sizeIcon?: number;
    colorIcon?: string;
}

/**
 * DeleteButton
 * 
 * Botón con ícono de basurero (`delete`) que ejecuta una acción al presionarse.
 * Usualmente utilizado para eliminar algo o dentro de una vista.
 */
export const DeleteButton = ({
    onPress,
    sizeIcon = 24,
    colorIcon = 'black'
}: DeleteButtonProps) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.button}
        >
            <MaterialIcons name="delete" size={sizeIcon} color={colorIcon} />
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
