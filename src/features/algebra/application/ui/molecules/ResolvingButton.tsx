import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

/**
 * Props esperadas por el componente ResolvingButton.
 * - onPress: función que se ejecuta al presionar el botón.
 * - isResolving: indica si la operación está en curso (true = mostrando carga).
 */
interface ResolvingButtonProps {
    onPress: () => Promise<void> | void;
    isResolving: boolean;
}

/**
 * ResolvingButton
 * 
 * Botón que ejecuta una acción al presionarse y muestra un indicador de carga
 * mientras la operación está en progreso.
 * 
 * Funciona para operaciones asíncronas que requieren feedback visual de carga,
 * deshabilitando el botón para evitar múltiples pulsaciones.
 */
export const ResolvingButton = ({ onPress, isResolving }: ResolvingButtonProps) => {
    return (
        <TouchableOpacity
            style={[styles.button, isResolving && styles.disabled]}
            onPress={onPress}
            disabled={isResolving}
            activeOpacity={0.7}
        >
            {isResolving ? (
                <View style={styles.content}>
                    <ActivityIndicator size="small" color="#fff" />
                    <Text style={styles.text}> Resolviendo...</Text>
                </View>
            ) : (
                <Text style={styles.text}>Resolver</Text>
            )}
        </TouchableOpacity>
    );
};

/**
 * Estilos para el botón ResolvingButton.
 */
const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    disabled: {
        opacity: 0.7,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
