export type Day = {
    day: number;
    dayName: string;
    exercises: Exercise[];
}

export type Exercise = {
    id: number;
    name: string;
    gif: string;
    group?: string;
}

export type Group = {
    name: string;
    color: string;
}