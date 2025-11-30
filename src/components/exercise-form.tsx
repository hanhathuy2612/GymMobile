import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AppButton } from "./ui/app-button";
import { FormField } from "./ui/form-field";


export type ExerciseFormValues = {
    name: string;
    gif: string;
    group: string;
}

const DEFAULT_INITIAL_VALUES = {
    name: '',
    gif: '',
    group: '',
}

export type ExerciseFormProps = {
    onSubmit: (values: ExerciseFormValues) => void;
}

export function ExerciseForm(props: ExerciseFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: DEFAULT_INITIAL_VALUES,
    })

    const onSubmit = (data: ExerciseFormValues) => props.onSubmit(data)

    return (
        <View style={styles.formContainer}>
            <FormField
                control={control}
                errors={errors}
                name="name"
                label="Name"
                placeholder="Name"
                rules={{
                    required: true,
                }}
            />

            <FormField
                control={control}
                errors={errors}
                name="group"
                label="Group"
                placeholder="Group"
                rules={{
                    maxLength: 100,
                }}
            />


            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="GIF"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="gif"
            />

            <AppButton title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    formContainer: {
        gap: theme.gap(2),
        padding: theme.gap(2),
    },
    formLabel: {
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },
}));