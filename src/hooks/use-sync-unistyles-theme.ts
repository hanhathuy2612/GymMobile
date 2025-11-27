import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { UnistylesRuntime } from 'react-native-unistyles';

/**
 * This hook is used to sync the unistyles theme with the system color scheme
 */
export function useSyncUnistylesTheme() {
    const systemColorScheme = Appearance.getColorScheme();

    useEffect(() => {
        // Sync theme with system when app is launched
        if (systemColorScheme && systemColorScheme !== UnistylesRuntime.themeName) {
            UnistylesRuntime.setTheme(systemColorScheme);
        }

        // Listen to system color scheme changes
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            if (colorScheme && colorScheme !== UnistylesRuntime.themeName) {
                UnistylesRuntime.setTheme(colorScheme);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [systemColorScheme]);
}