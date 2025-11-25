import dayData from "@/assets/json/gym-data.json";
import { Day } from "@/types/day";
import { useQuery } from "@tanstack/react-query";

export function useDaysQuery() {
    const daysQuery = useQuery<Day[]>({
        queryKey: ['days'],
        queryFn: () => dayData,
    });

    return daysQuery;
}