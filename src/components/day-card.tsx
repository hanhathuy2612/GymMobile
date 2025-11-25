import { Day, Exercise } from "@/types/day";
import { useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { ExerciseItem } from "./exercise-item";

type DayCardProps = {
    item: Day;
}

export function DayCard({ item }: DayCardProps) {
    const renderExerciseItem = useCallback(({ item }: { item: Exercise }) => {
        return (
            <ExerciseItem item={item} />
        );
    }, []);

    const keyExtractor = useCallback((item: Exercise) => item.id.toString(), []);

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.95}
        >
            <View style={styles.header}>
                <View style={styles.dayBadge}>
                    <Text style={styles.dayNumber}>{item.day}</Text>
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.day}>Day {item.day}</Text>
                    <Text style={styles.dayName}>{item.dayName}</Text>
                </View>
                <View style={styles.exerciseCount}>
                    <Text style={styles.exerciseCountText}>{item.exercises?.length ?? 0}</Text>
                    <Text style={styles.exerciseCountLabel}>exercises</Text>
                </View>
            </View>
            <FlatList
                data={item.exercises}
                renderItem={renderExerciseItem}
                keyExtractor={keyExtractor}
                style={styles.exercisesList}
                contentContainerStyle={styles.exercisesListContent}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={styles.exerciseSeparator} />}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        backgroundColor: theme.colors.cardBackground,
        borderRadius: 16,
        padding: theme.gap(2.5),
        marginVertical: theme.gap(1),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        borderWidth: 1,
        borderColor: theme.colors.cardBorder,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.gap(2),
        gap: theme.gap(2),
    },
    dayBadge: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: theme.colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    dayNumber: {
        fontSize: 20,
        fontWeight: '800',
        color: '#fff',
    },
    headerText: {
        flex: 1,
        flexDirection: 'column',
        gap: 2,
    },
    day: {
        fontSize: 18,
        fontWeight: '700',
        color: theme.colors.text,
        letterSpacing: -0.3,
    },
    dayName: {
        fontSize: 14,
        fontWeight: '500',
        color: theme.colors.text,
        opacity: 0.7,
    },
    exerciseCount: {
        alignItems: 'flex-end',
    },
    exerciseCountText: {
        fontSize: 20,
        fontWeight: '700',
        color: theme.colors.primary,
    },
    exerciseCountLabel: {
        fontSize: 11,
        fontWeight: '500',
        color: theme.colors.text,
        opacity: 0.5,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    manageButton: {
        padding: theme.gap(0.5),
    },
    exercisesList: {
        marginHorizontal: -theme.gap(0.5),
    },
    exercisesListContent: {
        paddingHorizontal: theme.gap(0.5),
    },
    exerciseSeparator: {
        width: theme.gap(2),
    },

}));