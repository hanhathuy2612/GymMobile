import { DayCard } from "@/components/day-card";
import { Screen } from "@/components/Screen";
import { useDaysQuery } from "@/hooks/use-days-query";
import { Day } from "@/types/day";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function HomeScreen() {
    const { data: days = [], isLoading, refetch } = useDaysQuery();

    const renderItem = useCallback(({ item }: { item: Day }) => {
        return <DayCard item={item} />;
    }, []);

    const keyExtractor = useCallback((item: Day) => item.day.toString(), []);

    const renderHeader = useCallback(() => (
        <View style={styles.header}>
            <Text style={styles.title}>Workout Plan</Text>
            <Text style={styles.subtitle}>
                {days ? `${days.length} training days` : "Your fitness journey starts here"}
            </Text>
        </View>
    ), [days]);

    const renderEmpty = useCallback(() => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workout data available</Text>
            <Text style={styles.emptySubtext}>Pull down to refresh</Text>
        </View>
    ), []);

    const renderLoading = useCallback(() => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ff1ff4" />
            <Text style={styles.loadingText}>Loading workouts...</Text>
        </View>
    ), []);

    if (isLoading) {
        return (
            <Screen>
                {renderHeader()}
                {renderLoading()}
            </Screen>
        );
    }

    return (
        <Screen edges={['top', 'left', 'right']}>
            <FlatList
                data={days ?? []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={renderEmpty}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={refetch}
                        tintColor="#ff1ff4"
                        colors={["#ff1ff4"]}
                    />
                }
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    header: {
        paddingHorizontal: theme.gap(2),
        paddingTop: theme.gap(3),
        paddingBottom: theme.gap(2),
        backgroundColor: theme.colors.background,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: theme.colors.text,
        marginBottom: theme.gap(0.5),
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: theme.colors.text,
        opacity: 0.6,
        fontWeight: '500',
    },
    listContent: {
        paddingHorizontal: theme.gap(2),
        paddingBottom: theme.gap(4),
    },
    separator: {
        height: theme.gap(2),
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.gap(8),
        gap: theme.gap(2),
    },
    loadingText: {
        fontSize: 16,
        color: theme.colors.text,
        opacity: 0.6,
        fontWeight: '500',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.gap(8),
        gap: theme.gap(1),
    },
    emptyText: {
        fontSize: 18,
        fontWeight: '600',
        color: theme.colors.text,
        opacity: 0.8,
    },
    emptySubtext: {
        fontSize: 14,
        color: theme.colors.text,
        opacity: 0.5,
    },
}));