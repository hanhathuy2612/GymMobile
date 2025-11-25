import exercisesData from "@/assets/json/exercises.json";
import { Exercise } from "@/types/day";
import { useQuery } from "@tanstack/react-query";

export function useExercisesQuery() {
    const exercisesQuery = useQuery<Exercise[]>({
        queryKey: ['exercises'],
        queryFn: () => exercisesData,
    });
    return exercisesQuery;
}