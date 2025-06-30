import React from "react";
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

/**
 * Props esperadas por el componente ToggleIcon.
 * - isOpen: determina si el ícono debe estar rotado o no.
 */
interface ToggleIconProps {
    isOpen: boolean;
}

/**
 * ToggleIcon
 * 
 * Componente ícono que indica si un acordeón o sección está expandida o contraída.
 * Utiliza un ícono de flecha hacia abajo que rota 180° cuando `isOpen` es true.
 */
export function ToggleIcon({ isOpen }: ToggleIconProps) {
    return (
        <AntDesign
            name="caretdown" // Ícono de flecha hacia abajo
            size={24}
            color="black"
            style={[
                {
                    // Rotación condicional: 180° si está abierto, 0° si está cerrado
                    transform: [{ rotate: isOpen ? "180deg" : "0deg" }]
                }
            ]}
        />
    );
}
