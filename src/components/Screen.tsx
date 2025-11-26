import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView edges={['top', 'left', 'right', 'bottom']}>
            {children}
        </SafeAreaView>
    );
}