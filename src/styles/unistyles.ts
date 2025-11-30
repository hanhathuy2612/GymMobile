import { generateRandomColor } from '@/utils/generate-random-color';
import { StyleSheet } from 'react-native-unistyles';

const fontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
}

const lightTheme = {
    colors: {
        primary: '#ff1ff4',
        secondary: '#1ff4ff',
        background: '#fff',
        text: '#000',
        textShadow: '#fff',
        border: '#000',
        card: '#fff',
        cardText: '#000',
        cardBorder: '#000',
        cardBackground: '#fff',
        random: () => generateRandomColor(),
        cardShadow: '#000',
    },
    gap: (v: number) => v * 8,
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        xl: 32,
    },
    fontSizes
}

const darkTheme = {
    colors: {
        primary: '#aa12ff',
        secondary: 'pink',
        background: '#000',
        text: '#fff',
        textShadow: '#000',
        border: '#fff',
        card: '#000',
        cardText: '#fff',
        cardBorder: '#fff',
        cardBackground: '#000',
        cardShadow: '#fff',
        random: () => generateRandomColor(),
    },
    gap: (v: number) => v * 8,
    borderRadius: {
        sm: 4,
        md: 8,
        lg: 16,
        xl: 32,
    },
    fontSizes
}

const appThemes = {
    light: lightTheme,
    dark: darkTheme
}

const breakpoints = {
    xs: 0,
    sm: 300,
    md: 500,
    lg: 800,
    xl: 1200
}

type AppBreakpoints = typeof breakpoints
type AppThemes = typeof appThemes

declare module 'react-native-unistyles' {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface UnistylesThemes extends AppThemes { }
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    export interface UnistylesBreakpoints extends AppBreakpoints { }
}

StyleSheet.configure({
    settings: {
        initialTheme: 'dark',
    },
    breakpoints,
    themes: appThemes,
})