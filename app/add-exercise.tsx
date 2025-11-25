import { exerciseImages } from "@/assets/images/exercises/exerciseImages";
import { Screen } from "@/components/Screen";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Exercise from "@/database/models/Exercise";
import { useAddExerciseMutation, useDayQuery } from "@/hooks/use-days-query";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";

// Get all available exercise names from the images
const availableExercises = Object.keys(exerciseImages).map((gif) => {
    // Convert filename to exercise name (remove .gif, replace - with space, capitalize)
    const name = gif
        .replace('.gif', '')
        .replace(/-/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');

    return { name, gif };
});

export default function AddExerciseScreen() {
    const { day } = useLocalSearchParams<{ day: string }>();
    const dayNumber = parseInt(day || "1", 10);
    const dayData = useDayQuery(dayNumber);
    const addExerciseMutation = useAddExerciseMutation();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedExercise, setSelectedExercise] = useState<{ name: string; gif: string } | null>(null);

    const filteredExercises = availableExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAddExercise = () => {
        if (!selectedExercise) return;

        const newExercise: Partial<Exercise> = {
            id: Date.now().toString(), // Temporary ID, will be replaced by database
            name: selectedExercise.name,
            gif: selectedExercise.gif,
            orderIndex: 0,
            imagePath: null,
            dayId: dayData?.id ?? ""
        };

        addExerciseMutation.mutate(
            { day: dayNumber, exercise: newExercise as Exercise },
            {
                onSuccess: () => {
                    Alert.alert("Success", "Exercise added successfully!", [
                        {
                            text: "OK",
                            onPress: () => router.back(),
                        },
                    ]);
                },
                onError: (error) => {
                    Alert.alert("Error", "Failed to add exercise. Please try again.");
                    console.error(error);
                },
            }
        );
    };

    const renderExerciseItem = ({ item }: { item: { name: string; gif: string } }) => {
        const isSelected = selectedExercise?.gif === item.gif;

        return (
            <TouchableOpacity
                style={[
                    styles.exerciseCard,
                    isSelected && styles.exerciseCardSelected,
                ]}
                onPress={() => setSelectedExercise(item)}
                activeOpacity={0.7}
            >
                <Image
                    source={exerciseImages[item.gif]}
                    style={styles.exerciseImage}
                    resizeMode="cover"
                />
                <View style={styles.exerciseInfo}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    {isSelected && (
                        <IconSymbol name="checkmark.circle.fill" size={20} color="#ff1ff4" />
                    )}
                </View>
            </TouchableOpacity>
        );
    };

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
                        <Text style={styles.title}>Add Exercise</Text>
                        <Text style={styles.subtitle}>Day {dayNumber}: {dayData?.dayName}</Text>
                    </View>
                </View>

                <View style={styles.searchContainer}>
                    <IconSymbol name="magnifyingglass" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search exercises..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <FlatList
                    data={filteredExercises}
                    renderItem={renderExerciseItem}
                    keyExtractor={(item) => item.gif}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No exercises found</Text>
                        </View>
                    }
                />

                {selectedExercise && (
                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={[
                                styles.addButton,
                                addExerciseMutation.isPending && styles.addButtonDisabled,
                            ]}
                            onPress={handleAddExercise}
                            disabled={addExerciseMutation.isPending}
                        >
                            {addExerciseMutation.isPending ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <>
                                    <IconSymbol name="plus.circle.fill" size={20} color="#fff" />
                                    <Text style={styles.addButtonText}>
                                        Add {selectedExercise.name}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
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
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        paddingHorizontal: theme.gap(2),
        paddingVertical: theme.gap(1.5),
        marginHorizontal: theme.gap(2),
        marginBottom: theme.gap(2),
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
        gap: theme.gap(1),
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: theme.colors.text,
    },
    listContent: {
        paddingHorizontal: theme.gap(2),
        paddingBottom: theme.gap(2),
    },
    exerciseCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 12,
        padding: theme.gap(1.5),
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
    exerciseCardSelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
        backgroundColor: theme.colors.background,
    },
    exerciseImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: theme.gap(1.5),
    },
    exerciseInfo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    exerciseName: {
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.text,
        flex: 1,
    },
    emptyContainer: {
        paddingVertical: theme.gap(4),
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
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
    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: theme.gap(1),
        backgroundColor: theme.colors.primary,
        borderRadius: 12,
        paddingVertical: theme.gap(2),
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    addButtonDisabled: {
        opacity: 0.6,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#fff",
    },
}));

