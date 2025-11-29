import { useCallback } from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";

type SearchBarProps = {
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    onSearch?: (search: string) => void;
}

export function SearchBar(props: SearchBarProps) {
    const { placeholder = 'Search', containerStyle, inputStyle, onSearch } = props;
    const { theme } = useUnistyles();

    const handleSearch = useCallback((text: string) => {
        onSearch?.(text);
    }, [onSearch]);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, inputStyle]}
                onChangeText={handleSearch}
                placeholderTextColor={theme.colors.text}
            />
        </View>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flexGrow: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        padding: 10,
        color: theme.colors.text,
    },
}));