import { EquationResolution } from '@/features/algebra/domain/entities/EquationResolution';
import { AccordionItem } from '@/shared/ui/organisms/AccordionItem';
import MathRenderer from '@/shared/ui/atoms/MathRenderer';
import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { BackButton } from '@/shared/ui/molecules/ButtonBack';
import { DeleteButton } from '@/shared/ui/molecules/ButtonDelete';

interface HistoryTemplateProps {
    history: EquationResolution[];
    loading: boolean;
    onBack: () => void;
    onDelete: () => void;
}

export const HistoryTemplate = ({ history, loading, onBack, onDelete }: HistoryTemplateProps) => {
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size='large' color="#007AFF" />
                <Text>Cargando historial...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Botones de accion*/}
            <View style={styles.actionsContainer}>
                <BackButton onPress={onBack} />

                {/* Boton de eliminar todo el historial */}
                {
                    history.length > 0 ? (
                        <DeleteButton onPress={onDelete} />
                    ) : null
                }
            </View>

            {history.length === 0 ? (
                <View style={styles.center}>
                    <Text>No hay historial guardado.</Text>
                </View>
            ) : (
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
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffff'
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    entryContainer: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    title: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 4,
    },
    date: {
        fontSize: 12,
        color: '#666',
        marginBottom: 10,
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
        backgroundColor: '#ffff'
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        marginBottom: 8,
        marginTop: 42,
    },
});
