import { addExerciseToDay, removeExerciseFromDay, updateDayExercises } from '@/database/db';
import Day from '@/database/models/Day';
import Exercise from '@/database/models/Exercise';
import { dayRepository } from '@/database/repositories/day';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// ✅ Custom hook để observe Observable - không cần observable-hooks
// TypeScript sẽ tự infer type từ WatermelonDB Observable
const useObservable = <T>(observable: any, initialValue: T): T => {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        if (!observable) {
            return;
        }

        const subscription = observable.subscribe({
            next: (val: T) => setValue(val),
            error: (err: any) => {
                console.error('Observable error:', err);
            },
        });

        return () => subscription.unsubscribe();
    }, [observable]);

    return value;
};

export const useDaysQuery = () => {
    const observable = dayRepository.observeAllDays();
    const days = useObservable(observable, [] as Day[]);
    return days;
};

// Reactive hook to get a specific day
export const useDayQuery = (dayNumber: number) => {
    const observable = dayRepository.observeDayById(dayNumber);
    const days = useObservable(observable, null as Day[] | null);
    return days?.[0] || null;
};

export const useUpdateDayMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ day, exercises }: { day: number; exercises: Exercise[] }) => {
            await updateDayExercises(day, exercises);
        },
        onSuccess: (_, variables) => {
            // Invalidate queries - WatermelonDB will auto-update reactive queries
            queryClient.invalidateQueries({ queryKey: ['gym-data'] });
            queryClient.invalidateQueries({ queryKey: ['day-data', variables.day] });
        },
    });
};

export const useAddExerciseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ day, exercise }: { day: number; exercise: Exercise }) => {
            return await addExerciseToDay(day, exercise);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['gym-data'] });
            queryClient.invalidateQueries({ queryKey: ['day-data', variables.day] });
        },
    });
};

export const useRemoveExerciseMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ exerciseId, dayNumber }: { exerciseId: number; dayNumber: number }) => {
            await removeExerciseFromDay(exerciseId);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['gym-data'] });
            queryClient.invalidateQueries({ queryKey: ['day-data', variables.dayNumber] });
        },
    });
};
