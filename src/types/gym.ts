export interface GymData {
    day: number;
    dayName: string;
    exercises: Exercise[];
}

export interface Exercise {
    id: number;
    name: string;
    gif: string;
}