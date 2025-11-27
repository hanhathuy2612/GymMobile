import { KeyboardAvoidingView, StyleProp, View, ViewStyle } from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native-unistyles";

type ScreenProps = {
    children: React.ReactNode;
    edges?: Edge[];
    style?: StyleProp<ViewStyle>;
}

export function Screen({ children, edges = ['top', 'left', 'right', 'bottom'], style = {} }: ScreenProps) {
    return (
        <SafeAreaView edges={edges} mode="padding" style={styles.safeArea}>
            <KeyboardAvoidingView behavior="padding" style={styles.keyboardAvoidingView}>
                <View style={[styles.container, style]}>
                    {children}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create((theme) => ({
    safeArea: {
        flex: 1,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
}));