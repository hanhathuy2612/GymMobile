import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type AppButtonProps = {
    title?: string;
    variant?: 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
    onPress?: () => void;
}

export function AppButton(props: AppButtonProps) {
    const { title = 'Button', variant = 'primary', size = 'medium', onPress } = props;
    styles.useVariants(({ variant, size }));

    return (
        <TouchableOpacity onPress={onPress} style={[styles.button]}>
            <Text >{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create((theme) => ({
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.md,
        variants: {
            variant: {
                primary: { backgroundColor: theme.colors.primary },
                secondary: { backgroundColor: theme.colors.secondary },
            },
            size: {
                small: { paddingHorizontal: theme.gap(1), paddingVertical: theme.gap(0.5) },
                medium: { paddingHorizontal: theme.gap(1.5), paddingVertical: theme.gap(1) },
                large: { paddingHorizontal: theme.gap(2), paddingVertical: theme.gap(1.5) },
            },
        },
    },
    text: {
        color: theme.colors.background,
        fontSize: theme.fontSizes.md,
        fontWeight: 'bold',
        variant: {
            primary: {
                color: theme.colors.background,
            },
            secondary: {
                color: theme.colors.primary,
            },
        },
        size: {
            small: { fontSize: theme.fontSizes.sm },
            medium: { fontSize: theme.fontSizes.md },
            large: { fontSize: theme.fontSizes.lg },
        },
    },
}));