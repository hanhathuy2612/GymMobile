import groupData from "@/assets/json/groups.json";
import { Group } from "@/types/day";
import { useQuery } from "@tanstack/react-query";

export function useGroupsQuery() {
    const groupsQuery = useQuery<Group[]>({
        queryKey: ['groups'],
        queryFn: () => groupData,
    });
    return groupsQuery;
}