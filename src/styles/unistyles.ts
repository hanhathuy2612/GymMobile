import { StyleSheet } from 'react-native-unistyles'

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
    },
    gap: (v: number) => v * 8
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
    },
    gap: (v: number) => v * 8
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
    export interface UnistylesThemes extends AppThemes { }
    export interface UnistylesBreakpoints extends AppBreakpoints { }
}

StyleSheet.configure({
    settings: {
        initialTheme: 'light',
    },
    breakpoints,
    themes: appThemes
})