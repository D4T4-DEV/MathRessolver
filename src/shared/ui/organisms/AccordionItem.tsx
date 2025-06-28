import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { AccordionHeader } from "../molecules/AccordionHeader";

interface AccordionItemProps {
    title: string;
    children: React.ReactNode;
}

export function AccordionItem({ title, children }: AccordionItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <View style={styles.container}>
            <AccordionHeader title={title} isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
            {
                isOpen &&
                <View style={styles.content}>{children}</View>
            }
        </View>
    );
}

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
