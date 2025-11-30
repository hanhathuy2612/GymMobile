import { Control, Controller, FieldErrors, RegisterOptions } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

export type FormFieldProps = {
    label: string;
    name: string;
    placeholder: string;
    control: Control<any>;
    rules: RegisterOptions<any>;
    errors: FieldErrors<any>;
}

export function FormField(props: FormFieldProps) {
    const { control, name, label, placeholder, rules, errors } = props;
    return (
        <>
            <Controller
                control={control}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <View style={styles.container}>
                        <Text style={styles.label}>{label}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={placeholder}
                            value={value}
                            onBlur={onBlur}
                            onChangeText={onChange}
                        />
                    </View>
                )}
                name={name}
            />
            {errors[name] && <Text>{errors[name]?.message as string}</Text>}
        </>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        gap: theme.gap(2),
    },
    label: {
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.borderRadius.md,
        padding: theme.gap(2),
    },
}));