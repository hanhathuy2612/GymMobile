import { exerciseImages } from "@/assets/images/exercises/exerciseImages";
import { Exercise } from "@/types/day";
import { useCallback } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type ExerciseItemProps = {
    item: Exercise;
    isFullWidth?: boolean;
    onPress?: (item: Exercise) => void;
}

export function ExerciseItem(props: ExerciseItemProps) {
    const { item, isFullWidth = false, onPress } = props;

    const handlePress = useCallback(() => {
        onPress?.(item);
    }, [item, onPress]);

    return (
        <TouchableOpacity
            style={styles.exerciseItem(isFullWidth)}
            onPress={handlePress}
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


const styles = StyleSheet.create((theme) => ({
    exerciseItem: (isFullWidth: boolean) => ({
        width: isFullWidth ? '100%' : 200,
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
    }),
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