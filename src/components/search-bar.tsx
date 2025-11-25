import { useCallback } from "react";
import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";

type SearchBarProps = {
    placeholder?: string;
    containerStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    onSearch?: (search: string) => void;
}

export function SearchBar(props: SearchBarProps) {
    const { placeholder = 'Search', containerStyle, inputStyle, onSearch } = props;

    const handleSearch = useCallback((text: string) => {
        onSearch?.(text);
    }, [onSearch]);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                placeholder={placeholder}
                style={[styles.input, inputStyle]}
                onChangeText={handleSearch}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
        padding: 10,
    },
});