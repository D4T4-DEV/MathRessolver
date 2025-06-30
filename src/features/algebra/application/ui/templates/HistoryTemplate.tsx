import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { EquationResolution } from '@/features/algebra/domain/entities/EquationResolution';
import { AccordionItem } from '@/shared/ui/organisms/AccordionItem';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';

/**
 * Props esperadas por el componente HistoryTemplate.
 * - history: lista de resoluciones algebraicas almacenadas.
 * - loading: booleano que indica si los datos están siendo cargados.
 */
interface HistoryTemplateProps {
    history: EquationResolution[];
    loading: boolean;
}

/**
 * HistoryTemplate
 * 
 * Componente de presentación que muestra el historial de ecuaciones resueltas.
 * Incluye:
 * - Estado de carga con indicador.
 * - Mensaje si no hay historial.
 * - Lista expandible (accordion) por resolución, con pasos intermedios y descripción.
 */
export const HistoryTemplate = ({ history, loading }: HistoryTemplateProps) => {
    // Estado de carga
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color="#007AFF" />
                <Text>Cargando historial...</Text>
            </View>
        );
    }

    // Historial vacío
    if (history.length === 0) {
        return (
            <View style={styles.center}>
                <Text>No hay historial guardado.</Text>
            </View>
        );
    }

    // Renderizado del historial
    return (
        <View style={styles.container}>
            <FlatList
                data={history}
                contentContainerStyle={styles.scrollContent}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item: resolution, index }) => (
                    <AccordionItem title={`Resolución del ${new Date(resolution.date).toLocaleString()}`}>
                        {resolution.steps.map((step, j) => {
                            const isLastStep = j === resolution.steps.length - 1;

                            return (
                                <View key={j} style={styles.stepContainer}>
                                    {!isLastStep ? (
                                        <View>
                                            <Text style={styles.stepTitle}>Paso {j + 1}:</Text>

                                            <Text>Antes:</Text>
                                            <MathRenderer math={step.latexBefore} style={styles.mathContainer} />

                                            <Text>Después:</Text>
                                            <MathRenderer math={step.latexAfter} style={styles.mathContainer} />

                                            <AccordionItem title={`Explícame el paso ${j + 1}`}>
                                                <Text style={styles.stepDescription}>{step.description}</Text>
                                            </AccordionItem>
                                        </View>
                                    ) : (
                                        <View>
                                            <Text style={styles.finalTitle}>Dato importante</Text>
                                            <AccordionItem title="Dato importante de resolución">
                                                <Text style={styles.stepDescription}>{step.description}</Text>
                                                <MathRenderer math={step.latexBefore} style={styles.mathContainer} />
                                            </AccordionItem>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </AccordionItem>
                )}
            />
        </View>
    );
};

/**
 * Estilos para el componente HistoryTemplate.
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff',
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    stepContainer: {
        marginBottom: 16,
    },
    stepTitle: {
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 4,
    },
    stepDescription: {
        fontStyle: 'italic',
        marginTop: 4,
    },
    finalTitle: {
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 6,
    },
    mathContainer: {
        marginTop: 4,
        alignSelf: 'center',
        width: 200,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundColor: '#ffff',
    }
});
