import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from 'react-native-unistyles';
import { ExerciseForm, ExerciseFormValues } from './exercise-form';

type AddOrUpdateExerciseProps = {
    isOpen: boolean;
    title: string;
    onClose?: () => void;
}

const SNAP_POINTS = ['100%'];

export function AddOrUpdateExercise(props: AddOrUpdateExerciseProps) {
    const { isOpen, title, onClose } = props;

    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        if (isOpen) {
            bottomSheetRef.current?.expand();
        } else {
            bottomSheetRef.current?.close();
        }
    }, [isOpen]);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('[handleSheetChanges]', index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
        onClose?.();
    }, [bottomSheetRef, onClose]);

    const handleSubmit = useCallback((values: ExerciseFormValues) => {
        console.log('[handleSubmit]', values);
    }, []);

    return (
        <BottomSheet
            index={-1}
            snapPoints={SNAP_POINTS}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing={true}
            enablePanDownToClose={true}
            onClose={onClose}
            handleStyle={styles.handleContainer}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>{title}</Text>
                    <TouchableOpacity onPress={handleClosePress}>
                        <FontAwesome name="close" size={24} color="black" style={{ fontWeight: 300 }} />
                    </TouchableOpacity>
                </View>
                <ExerciseForm onSubmit={handleSubmit} />
            </BottomSheetView>
        </BottomSheet>
    );
}

const styles = StyleSheet.create((theme) => ({
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: theme.gap(2),
        paddingHorizontal: theme.gap(2),
    },
    headerTitle: {
        fontSize: theme.fontSizes.lg,
        fontWeight: '600',
    },
    contentContainer: {
        flex: 1,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    handleContainer: {
        display: 'none',
    },
    formContainer: {
        flex: 1,
        padding: theme.gap(2),
    },
}));
