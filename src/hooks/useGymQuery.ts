import gymData from "@/assets/json/gym-data.json";
import { GymData } from "@/types/gym";
import { useQuery } from "@tanstack/react-query";

export const useGymQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["gym-data"],
        queryFn: () => gymData as GymData[],
    });

    return { data, isLoading, error };
};
