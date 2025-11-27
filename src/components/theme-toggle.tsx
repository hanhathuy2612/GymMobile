import { useCallback, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, UnistylesRuntime } from 'react-native-unistyles';


export function ThemeToggle() {
    const [isDark, setIsDark] = useState(UnistylesRuntime.themeName === 'dark');

    const toggleTheme = useCallback(() => {
        const isDark = UnistylesRuntime.themeName === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        UnistylesRuntime.setTheme(newTheme);
        setIsDark(!isDark);
    }, []);

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={toggleTheme}
        >
            <Text style={styles.text}>
                {isDark ? '🌙 Dark' : '☀️ Light'}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create((theme) => ({
    button: {
        padding: 12,
        borderRadius: 8,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    text: {
        color: theme.colors.background,
        fontSize: 16,
        fontWeight: '600',
    },
}));