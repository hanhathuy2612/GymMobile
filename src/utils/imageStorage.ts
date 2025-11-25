import { getExerciseImagePath, removeExerciseWithImage, storeExerciseImagePath } from '@/database/db';
import { saveImageFromBase64, saveImageFromUri } from './fileSystem';

/**
 * Save image from URI and update database
 */
export const saveExerciseImageFromUri = async (
    exerciseId: number,
    imageUri: string,
    extension: string = 'jpg'
): Promise<string> => {
    // Save to file system
    const filePath = await saveImageFromUri(imageUri, exerciseId, extension);

    // Update database with file path
    await storeExerciseImagePath(exerciseId, filePath);

    return filePath;
};

/**
 * Save image from base64 and update database
 */
export const saveExerciseImageFromBase64 = async (
    exerciseId: number,
    base64Data: string,
    extension: string = 'jpg'
): Promise<string> => {
    // Save to file system
    const filePath = await saveImageFromBase64(base64Data, exerciseId, extension);

    // Update database with file path
    await storeExerciseImagePath(exerciseId, filePath);

    return filePath;
};

/**
 * Get exercise image path from database, then return file URI
 */
export const getExerciseImageFile = async (exerciseId: number): Promise<string | null> => {
    const imagePath = await getExerciseImagePath(exerciseId);

    if (!imagePath) {
        return null;
    }

    // Verify file exists
    const { imageExistsByPath } = await import('./fileSystem');
    const exists = await imageExistsByPath(imagePath);

    return exists ? imagePath : null;
};

/**
 * Delete exercise and its associated image file
 */
export const deleteExerciseWithImage = async (exerciseId: number): Promise<void> => {
    await removeExerciseWithImage(exerciseId);
};

