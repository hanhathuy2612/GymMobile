import { Screen } from "@/components/Screen";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Exercise from "@/database/models/Exercise";
import { useDayQuery, useUpdateDayMutation } from "@/hooks/use-days-query";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function ManageDayScreen() {
    const { day } = useLocalSearchParams<{ day: string }>();
    const dayNumber = parseInt(day || "1", 10);
    const dayData = useDayQuery(dayNumber);
    const updateDayMutation = useUpdateDayMutation();

    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        dayData?.exercises.fetch().then((exercises) => {
            setExercises(exercises ?? []);
        });
    }, [dayData]);

    const handleRemoveExercise = (exerciseId: number) => {
        Alert.alert(
            "Remove Exercise",
            "Are you sure you want to remove this exercise?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Remove",
                    style: "destructive",
                    onPress: () => {
                        const updated = exercises.filter(
                            (e) => e.id !== exerciseId.toString()
                        );
                        setExercises(updated);
                        updateDayMutation.mutate({
                            day: dayNumber,
                            exercises: updated,
                        });
                    },
                },
            ]
        );
    };

    const handleAddExercise = () => {
        router.push({
            pathname: "/add-exercise",
            params: { day: dayNumber.toString() },
        });
    };

    const handleSave = () => {
        updateDayMutation.mutate(
            {
                day: dayNumber,
                exercises: exercises,
            },
            {
                onSuccess: () => {
                    Alert.alert("Success", "Exercises updated successfully!", [
                        {
                            text: "OK",
                            onPress: () => router.back(),
                        },
                    ]);
                },
            }
        );
    };

    const renderExerciseItem = ({ item, index }: { item: Exercise; index: number }) => {
        return (
            <View style={styles.exerciseCard}>
                <View style={styles.exerciseNumber}>
                    <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                </View>
                <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                </View>
                <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveExercise(parseInt(item.id, 10))}
                >
                    <IconSymbol name="trash.fill" size={20} color="#ff3b30" />
                </TouchableOpacity>
            </View>
        );
    };

    if (!dayData) {
        return (
            <Screen>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ff1ff4" />
                    <Text style={styles.loadingText}>Loading day data...</Text>
                </View>
            </Screen>
        );
    }

    return (
        <Screen>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <IconSymbol name="chevron.left" size={24} color="#ff1ff4" />
                    </TouchableOpacity>
                    <View style={styles.headerText}>
                        <Text style={styles.title}>Day {dayNumber}</Text>
                        <Text style={styles.subtitle}>{dayData?.dayName}</Text>
                    </View>
                </View>

                <View style={styles.content}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            Exercises ({exercises.length})
                        </Text>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={handleAddExercise}
                        >
                            <IconSymbol name="plus.circle.fill" size={24} color="#ff1ff4" />
                            <Text style={styles.addButtonText}>Add Exercise</Text>
                        </TouchableOpacity>
                    </View>

                    {exercises.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <IconSymbol name="figure.step.training" size={64} color="#999" />
                            <Text style={styles.emptyText}>No exercises yet</Text>
                            <Text style={styles.emptySubtext}>
                                Tap &quot;Add Exercise&quot; to get started
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={exercises}
                            renderItem={renderExerciseItem}
                            keyExtractor={(item) => item.id.toString()}
                            contentContainerStyle={styles.listContent}
                            showsVerticalScrollIndicator={false}
                        />
                    )}
                </View>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.saveButton,
                            updateDayMutation.isPending && styles.saveButtonDisabled,
                        ]}
                        onPress={handleSave}
                        disabled={updateDayMutation.isPending}
                    >
                        {updateDayMutation.isPending ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: theme.gap(2),
    },
    loadingText: {
        fontSize: 16,
        color: theme.colors.text,
        opacity: 0.6,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: theme.gap(2),
        paddingTop: theme.gap(2),
        paddingBottom: theme.gap(1.5),
        gap: theme.gap(2),
    },
    backButton: {
        padding: theme.gap(0.5),
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: theme.colors.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        fontWeight: "500",
        color: theme.colors.text,
        opacity: 0.6,
        marginTop: 2,
    },
    content: {
        flex: 1,
        paddingHorizontal: theme.gap(2),
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: theme.gap(2),
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: theme.colors.text,
    },
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: theme.gap(0.5),
        paddingHorizontal: theme.gap(1.5),
        paddingVertical: theme.gap(1),
        borderRadius: 12,
        backgroundColor: theme.colors.background,
        borderWidth: 1,
        borderColor: theme.colors.primary,
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: "600",
        color: theme.colors.primary,
    },
    listContent: {
        paddingBottom: theme.gap(2),
    },
    exerciseCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: theme.gap(2),
        marginBottom: theme.gap(1.5),
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    exerciseNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: theme.colors.primary,
        justifyContent: "center",
        alignItems: "center",
        marginRight: theme.gap(1.5),
    },
    exerciseNumberText: {
        fontSize: 14,
        fontWeight: "700",
        color: "#fff",
    },
    exerciseInfo: {
        flex: 1,
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.text,
    },
    removeButton: {
        padding: theme.gap(0.5),
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: theme.gap(8),
        gap: theme.gap(1),
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
        color: theme.colors.text,
        opacity: 0.8,
    },
    emptySubtext: {
        fontSize: 14,
        color: theme.colors.text,
        opacity: 0.5,
    },
    footer: {
        paddingHorizontal: theme.gap(2),
        paddingVertical: theme.gap(2),
        borderTopWidth: 1,
        borderTopColor: theme.colors.cardBorder,
        backgroundColor: theme.colors.background,
    },
    saveButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        paddingVertical: theme.gap(2),
        alignItems: "center",
        justifyContent: "center",
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
}));

