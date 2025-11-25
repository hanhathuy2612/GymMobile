import { exerciseImages } from "@/assets/images/exercises/exerciseImages";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Day from "@/database/models/Day";
import Exercise from "@/database/models/Exercise";
import { excerciseRepository } from "@/database/repositories/exersice";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type DayCardProps = {
    item: Day;
}

type ExerciseItemProps = {
    item: Exercise;
}

export function ExerciseItem({ item }: ExerciseItemProps) {
    return (
        <TouchableOpacity
            style={styles.exerciseItem}
            onPress={() => {
                console.log(item.name);
            }}
            activeOpacity={0.7}
        >
            <View style={styles.exerciseImageContainer}>
                <Image
                    source={exerciseImages[item.gif]}
                    style={styles.exerciseImage}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.exerciseName}>{item.name}</Text>
        </TouchableOpacity>
    );
}

export function DayCard({ item }: DayCardProps) {
    const [exercises, setExercises] = useState<Exercise[]>([]);

    useEffect(() => {
        excerciseRepository.getExercisesByDayId(item.id).then((exercises: Exercise[]) => {
            setExercises(exercises ?? []);
        });
    }, [item]);

    const renderExerciseItem = ({ item }: { item: Exercise }) => {
        return (
            <ExerciseItem item={item} />
        );
    };

    const keyExtractor = (item: Exercise) => item.name;

    const handleManagePress = () => {
        router.push({
            pathname: '/manage-day/[day]',
            params: { day: item.day.toString() },
        });
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleManagePress}
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
                    <Text style={styles.exerciseCountText}>{exercises?.length ?? 0}</Text>
                    <Text style={styles.exerciseCountLabel}>exercises</Text>
                </View>
                <TouchableOpacity
                    style={styles.manageButton}
                    onPress={handleManagePress}
                >
                    <IconSymbol name="pencil.circle.fill" size={24} color="#ff1ff4" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={exercises}
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
    exerciseItem: {
        width: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    exerciseImageContainer: {
        width: '100%',
        height: 200,
        backgroundColor: theme.colors.background,
    },
    exerciseImage: {
        width: '100%',
        height: '100%',
    },
    exerciseName: {
        fontSize: 14,
        fontWeight: '600',
        color: theme.colors.text,
        padding: theme.gap(1.5),
        paddingTop: theme.gap(1),
    },
}));