import { ExerciseItem } from "@/components/exercise-item";
import { Screen } from "@/components/Screen";
import { SearchBar } from "@/components/search-bar";
import { useExercisesQuery } from "@/hooks/use-exercise-query";
import { Exercise } from "@/types/day";
import { useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function ExercisesScreen() {
    const { data: exercises = [] } = useExercisesQuery();
    const [search, setSearch] = useState('');

    const filteredExercises = useMemo(() => {
        return exercises.filter((exercise) => exercise.name.toLowerCase().includes(search.toLowerCase()));
    }, [exercises, search]);

    const renderItem = useCallback(({ item }: { item: Exercise }) => {
        return <ExerciseItem item={item} isFullWidth />;
    }, []);

    const keyExtractor = useCallback((item: Exercise) => item.id.toString(), []);

    const handleSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    return (
        <Screen>
            <SearchBar
                onSearch={handleSearch}
                containerStyle={styles.searchBarContainer}
            />

            <FlatList
                data={filteredExercises}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.container}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        gap: 10,
    },
    searchBarContainer: {
        padding: 10,
    },
    itemSeparator: {
        height: 10,
    },
});