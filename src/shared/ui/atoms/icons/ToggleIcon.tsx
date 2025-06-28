import React from "react";
import { StyleSheet } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

interface ToggleIconProps {
    isOpen: boolean;
}

export function ToggleIcon({ isOpen }: ToggleIconProps) {
    return (
        <AntDesign
            name="caretdown"
            size={24}
            color="black"
            style={[styles.icon, { transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }]}
        />
    );
}

const styles = StyleSheet.create({
    icon: {
        fontSize: 18,
    },
});
