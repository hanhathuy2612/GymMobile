import { exerciseImages } from "@/assets/images/exercises/exerciseImages";
import { Exercise, GymData } from "@/types/gym";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type DayCardProps = {
    item: GymData;
}

type ExerciseItemProps = {
    item: Exercise;
}

export function ExerciseItem({ item }: ExerciseItemProps) {
    return (
        <TouchableOpacity style={styles.exerciseItem} onPress={() => {
            console.log(item.name);
        }}>
            <Text style={styles.exerciseName}>{item.name}</Text>
            <View style={styles.exerciseImageContainer}>
                <Image
                    source={exerciseImages[item.gif]}
                    style={styles.exerciseImage}
                    resizeMode="cover"
                />
            </View>
        </TouchableOpacity>
    );
}

export function DayCard({ item }: DayCardProps) {
    const renderExerciseItem = ({ item }: { item: Exercise }) => {
        return (
            <ExerciseItem item={item} />
        );
    };

    const keyExtractor = (item: Exercise) => item.id.toString();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.day}>Day {item.day}</Text>
                <Text style={styles.dayName}>{item.dayName}</Text>
            </View>
            <FlatList
                data={item.exercises}
                renderItem={renderExerciseItem}
                keyExtractor={keyExtractor}
                style={styles.exercisesList}
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 16,
        elevation: 1,
        gap: 16,
    },
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
    },
    day: {
        fontSize: 20,
        fontWeight: 'bold',
        color: theme.colors.text,
        textShadowColor: theme.colors.textShadow,
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        textShadowOpacity: 0.5,
    },
    dayName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    exercisesList: {
        gap: 16,
    },
    exerciseItem: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        elevation: 1,
    },
    exerciseName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    exerciseImageContainer: {
        width: 240,
        height: 240,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 1,
    },
    exerciseImage: {
        width: '100%',
        height: '100%',
    },
}));