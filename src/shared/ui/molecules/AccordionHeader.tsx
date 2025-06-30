import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ToggleIcon } from "../atoms/icons/ToggleIcon";

/**
 * Props esperadas por el componente AccordionHeader.
 * - title: texto que se muestra como encabezado del acordeón.
 * - isOpen: indica si el contenido del acordeón está expandido.
 * - onToggle: función que se ejecuta al presionar el encabezado para expandir/colapsar.
 */
interface AccordionHeaderProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
}

/**
 * AccordionHeader
 * 
 * Encabezado clickeable para un acordeón. Muestra:
 * - El título del acordeón.
 * - Un ícono que rota según el estado `isOpen`.
 * 
 * Al presionar el encabezado, se ejecuta `onToggle` para alternar el estado.
 */
export function AccordionHeader({ title, isOpen, onToggle }: AccordionHeaderProps) {
    return (
        <TouchableOpacity style={styles.header} onPress={onToggle}>
            {/* Título del acordeón */}
            <Text style={styles.title}>{title}</Text>

            {/* Ícono de flecha que rota según si está abierto o no */}
            <ToggleIcon isOpen={isOpen} />
        </TouchableOpacity>
    );
}

/**
 * Estilos para el encabezado del acordeón.
 */
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
