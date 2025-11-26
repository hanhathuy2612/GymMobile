import { KeyboardAvoidingView, View } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";


type ScreenProps = {
    children: React.ReactNode;
    edges?: Edge[];
}

export function Screen({ children, edges = ['top', 'left', 'right', 'bottom'] }: ScreenProps) {
    return (
        <SafeAreaView edges={edges} mode="padding">
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.container}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create((theme, runtime) => ({
    container: {
        backgroundColor: theme.colors.background,
    },
}));