import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { AccordionHeader } from "../molecules/AccordionHeader";

/**
 * Props esperadas por el componente AccordionItem.
 * - title: texto que se muestra como encabezado del acordeón.
 * - children: contenido que se muestra al expandir el acordeón.
 */
interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

/**
 * AccordionItem
 * 
 * Componente tipo acordeón que puede expandirse o contraerse.
 * Muestra un encabezado (`AccordionHeader`) que al presionarse
 * alterna el estado de visibilidad del contenido (`children`).
 */
export function AccordionItem({ title, children }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false); // Estado local para controlar si está abierto

    return (
        <View style={styles.container}>
            {/* Encabezado clickeable que alterna el estado abierto/cerrado */}
            <AccordionHeader
                title={title}
                isOpen={isOpen}
                onToggle={() => setIsOpen(!isOpen)}
            />

            {/* Contenido visible solo si el acordeón está abierto */}
            {isOpen && (
                <View style={styles.content}>
                    {children}
                </View>
            )}
        </View>
    );
}

/**
 * Estilos del acordeón.
 */
const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        borderRadius: 8,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    content: {
        padding: 16,
        backgroundColor: "#fff",
    },
});
