import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { ToggleIcon } from "../atoms/icons/ToggleIcon";

interface AccordionHeaderProps {
    title: string;
    isOpen: boolean;
    onToggle: () => void;
}

export function AccordionHeader({ title, isOpen, onToggle }: AccordionHeaderProps) {
    return (
        <TouchableOpacity style={styles.header} onPress={onToggle}>
            <Text style={styles.title}>{title}</Text>
            <ToggleIcon isOpen={isOpen} />
        </TouchableOpacity>
    );
}

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
