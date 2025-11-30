import { Controller, useForm } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { AppButton } from "./ui/app-button";


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
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="name"
            />
            {errors.name && <Text>This is required.</Text>}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="group"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
                name="group"
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
    },
    formLabel: {
        fontSize: theme.fontSizes.md,
        fontWeight: '600',
        color: theme.colors.text,
    },
}));