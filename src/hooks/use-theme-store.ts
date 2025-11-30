import { settingsStore } from "../stores/settings/settings-store";

export function useThemeStore() {
    const getTheme = () => {
        const settings = settingsStore.getSettings();
        return settings?.theme ?? 'light';
    }

    const setTheme = (theme: 'light' | 'dark') => {
        const settings = settingsStore.getSettings();
        if (settings) {
            settingsStore.setSettings({ ...settings, theme });
        } else {
            settingsStore.setSettings({ theme });
        }
    }

    return { getTheme, setTheme };
}