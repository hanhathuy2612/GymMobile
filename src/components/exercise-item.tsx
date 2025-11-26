import { exerciseImages } from "@/assets/images/exercises/exerciseImages";
import { Exercise } from "@/types/day";
import { useCallback, useMemo } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type ExerciseItemProps = {
    item: Exercise;
    isFullWidth?: boolean;
    highlightText?: string;
    onPress?: (item: Exercise) => void;
}

export function ExerciseItem(props: ExerciseItemProps) {
    const { theme } = useUnistyles();
    const { item, isFullWidth = false, highlightText = '', onPress } = props;

    const handlePress = useCallback(() => {
        onPress?.(item);
    }, [item, onPress]);

    const highlightedText = useMemo(() => {
        const regex = new RegExp(`(${highlightText})`, 'gi');
        const parts = item.name.split(regex);
        return parts.map((part, index) => {
            if (index % 2 === 0) {
                return part;
            }
            return <Text key={index} style={{ color: theme.colors.primary }}>{part}</Text>;
        });
    }, [item.name, highlightText, theme.colors.primary]);

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
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.exerciseName}>{highlightedText}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create((theme) => ({
    exerciseItem: (isFullWidth: boolean) => ({
        width: isFullWidth ? '100%' : 200,
        minWidth: 200,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
        shadowColor: theme.colors.cardShadow,
        borderColor: theme.colors.cardBorder,
        borderWidth: 1,
        borderStyle: 'solid',
        padding: theme.gap(1),
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