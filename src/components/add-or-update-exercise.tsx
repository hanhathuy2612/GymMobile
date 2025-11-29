import FontAwesome from '@expo/vector-icons/FontAwesome';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from 'react-native-unistyles';

type AddOrUpdateExerciseProps = {
    isOpen: boolean;
    onClose?: () => void;
}

const snapPoints = ['100%'];

export function AddOrUpdateExercise(props: AddOrUpdateExerciseProps) {
    const { isOpen, onClose } = props;
    const navigation = useNavigation();
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    useEffect(() => {
        console.log('isOpen', isOpen);
        if (isOpen) {
            console.log('set options');
            navigation.setOptions({
                title: 'Add Exercise'
            });
            bottomSheetRef.current?.expand();
        } else {
            navigation.setOptions({
                title: 'Add Exercise',
            });
            bottomSheetRef.current?.close();
        }
    }, [isOpen, navigation]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add Exercise',
        });
    }, [isOpen, navigation]);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
        onClose?.();
    }, [bottomSheetRef, onClose]);

    return (
        <BottomSheet
            index={-1}
            snapPoints={snapPoints}
            ref={bottomSheetRef}
            onChange={handleSheetChanges}
            enableDynamicSizing={true}
            enablePanDownToClose={true}
            onClose={onClose}
            handleStyle={styles.handleContainer}
        >
            <BottomSheetView style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Add Exercise</Text>
                    <TouchableOpacity onPress={handleClosePress}>
                        <FontAwesome name="close" size={24} color="black" style={{ fontWeight: 300 }} />
                    </TouchableOpacity>
                </View>
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
}));
