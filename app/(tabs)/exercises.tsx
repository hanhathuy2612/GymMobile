import { ExerciseItem } from "@/components/exercise-item";
import { Screen } from "@/components/Screen";
import { SearchBar } from "@/components/search-bar";
import { useExercisesQuery } from "@/hooks/use-exercise-query";
import { useGroupsQuery } from "@/hooks/use-groups-query";
import { Exercise, Group } from "@/types/day";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function ExercisesScreen() {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [search, setSearch] = useState('');

    const { data: exercises = [] } = useExercisesQuery();
    const { data: groups = [] } = useGroupsQuery();

    const filteredExercises = useMemo(() => {
        const condition1 = (exercise: Exercise) => exercise.name.toLowerCase().includes(search.toLowerCase());
        const condition2 = (exercise: Exercise) => selectedGroup ? exercise.group === selectedGroup : true;
        return exercises.filter((exercise) => condition1(exercise) && condition2(exercise));
    }, [exercises, search, selectedGroup]);

    const renderItem = useCallback(({ item }: { item: Exercise }) => {
        return <ExerciseItem item={item} isFullWidth={true} highlightText={search} />;
    }, [search]);

    const handleGroupPress = useCallback((group: string) => {
        if (selectedGroup === group) {
            setSelectedGroup(null);
        } else {
            setSelectedGroup(group);
        }
    }, [selectedGroup]);

    const renderGroupItem = useCallback(({ item }: { item: Group }) => {
        const isSelected = selectedGroup === item.name;
        return (
            <TouchableOpacity
                style={styles.groupItem(item.color, isSelected)}
                activeOpacity={0.3}
                onPress={() => handleGroupPress(item.name)}
            >
                <Text style={styles.groupItemText(item.color, isSelected)}>{item.name}</Text>
            </TouchableOpacity>
        );
    }, [handleGroupPress, selectedGroup]);

    const keyExtractor = useCallback((item: Exercise) => item.id.toString(), []);
    const keyExtractorGroup = useCallback((item: Group) => item.name, []);

    const handleSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    return (
        <Screen edges={['left', 'right', 'bottom']}>
            <SearchBar
                onSearch={handleSearch}
                containerStyle={styles.searchBarContainer}
            />

            <FlatList
                data={groups}
                renderItem={renderGroupItem}
                keyExtractor={keyExtractorGroup}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.groupsList}
                contentContainerStyle={styles.groupsContainer}
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

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        paddingHorizontal: theme.gap(2),
        gap: theme.gap(2),
        paddingBottom: runtime.insets.bottom + 100,
    },
    searchBarContainer: {
        paddingHorizontal: theme.gap(2),
    },
    groupsList: {
        padding: theme.gap(2),
    },
    groupsContainer: {
        gap: theme.gap(1.5),
    },
    groupItem: (color: string, isSelected: boolean) => ({
        paddingVertical: theme.gap(1),
        paddingHorizontal: theme.gap(1.5),
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: isSelected ? color : theme.colors.background,
    }),
    groupItemText: (color: string, isSelected: boolean) => ({
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        color: isSelected ? theme.colors.background : color,
    }),
    itemSeparator: {
        height: theme.gap(2),
    },
}));