import { DayCard } from "@/components/day-card";
import { Screen } from "@/components/Screen";
import { useGymQuery } from "@/hooks/useGymQuery";
import { GymData } from "@/types/gym";
import { ActivityIndicator, FlatList, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export function HomeScreen() {
    const { data, isLoading } = useGymQuery();

    const renderItem = ({ item }: { item: GymData }) => {
        return <DayCard item={item} />;
    };

    const keyExtractor = (item: GymData) => item.day.toString();

    return (
        <Screen>
            <View style={styles.titleContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" />
                ) : (
                    <FlatList
                        data={data ?? []}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                    />
                )}
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
}));