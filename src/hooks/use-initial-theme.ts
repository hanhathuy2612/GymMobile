import { UnistylesRuntime } from "react-native-unistyles";
import { useThemeStore } from "./use-theme-store";

export function useInitialTheme() {
    const { getTheme } = useThemeStore();
    const currentTheme = getTheme();
    UnistylesRuntime.setTheme(currentTheme);
}