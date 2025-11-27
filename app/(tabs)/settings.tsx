import { Screen } from "@/components/screen";
import { ThemeToggle } from "@/components/theme-toggle";
import { StyleSheet } from "react-native-unistyles";

export default function SettingsScreen() {
    return (
        <Screen edges={['left', 'right']} style={styles.container}>
            <ThemeToggle />
        </Screen>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        padding: theme.gap(2)
    },
}));