import { AddOrUpdateExercise } from "@/components/add-or-update-exercise";
import { ExerciseItem } from "@/components/exercise-item";
import { Screen } from "@/components/screen";
import { SearchBar } from "@/components/search-bar";
import { AppButton } from "@/components/ui/app-button";
import { useExercisesQuery } from "@/hooks/use-exercise-query";
import { useGroupsQuery } from "@/hooks/use-groups-query";
import { Exercise, Group } from "@/types/day";
import { invertColorWithContrast } from "@/utils/invert-color";
import { useCallback, useMemo, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export default function ExercisesScreen() {
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [isAddExerciseOpen, setIsAddExerciseOpen] = useState(false);

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
                style={styles.groupItem(isSelected)}
                activeOpacity={0.3}
                onPress={() => handleGroupPress(item.name)}
            >
                <Text style={styles.groupItemText(isSelected)}>{item.name}</Text>
            </TouchableOpacity>
        );
    }, [handleGroupPress, selectedGroup]);

    const keyExtractor = useCallback((item: Exercise) => item.id.toString(), []);
    const keyExtractorGroup = useCallback((item: Group) => item.name, []);

    const handleSearch = useCallback((search: string) => {
        setSearch(search);
    }, []);

    const handleAddExercisePress = useCallback(() => {
        setIsAddExerciseOpen(true);
    }, []);

    return (
        <Screen edges={['left', 'right']}>
            <View style={styles.header}>
                <SearchBar
                    onSearch={handleSearch}
                    containerStyle={styles.searchBarContainer}
                />
                <AppButton
                    title="Add Exercise"
                    onPress={handleAddExercisePress}
                />
            </View>

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
            <AddOrUpdateExercise isOpen={isAddExerciseOpen} onClose={() => setIsAddExerciseOpen(false)} />
        </Screen>
    );
}

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        paddingHorizontal: theme.gap(2),
        gap: theme.gap(2),
        paddingBottom: runtime.insets.bottom,
    },
    searchBarContainer: {
        // paddingHorizontal: theme.gap(2),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.gap(2),
        gap: theme.gap(2),
    },
    groupsList: {
        padding: theme.gap(2),
        marginBottom: theme.gap(2),
    },
    groupsContainer: {
        gap: theme.gap(1.5),
    },
    groupItem: (isSelected: boolean) => ({
        paddingVertical: theme.gap(1),
        paddingHorizontal: theme.gap(1.5),
        borderRadius: 999,
        borderColor: theme.colors.border,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: isSelected ? invertColorWithContrast(theme.colors.background) : theme.colors.background,
    }),
    groupItemText: (isSelected: boolean) => ({
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        color: isSelected ? invertColorWithContrast(theme.colors.text) : theme.colors.text,
    }),
    itemSeparator: {
        height: theme.gap(2),
    },
}));