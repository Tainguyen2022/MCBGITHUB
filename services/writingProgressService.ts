import { WritingProgress } from '../types';

const WRITING_PROGRESS_KEY_PREFIX = 'MATCANBAN_WRITING_PROGRESS_';

/**
 * Loads the writing progress for a specific user from localStorage.
 * @param userId The ID of the current user.
 * @returns An object containing the user's saved writing progress.
 */
export const getWritingProgress = (userId: string | null | undefined): WritingProgress => {
    if (!userId) return {};
    try {
        const key = `${WRITING_PROGRESS_KEY_PREFIX}${userId}`;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error("Failed to load writing progress:", error);
        return {};
    }
};

/**
 * Saves the user's writing progress for a specific item to localStorage.
 * @param userId The ID of the current user.
 * @param itemId The ID of the practice item.
 * @param text The user's input text to save.
 */
export const saveWritingProgress = (userId: string, itemId: string, text: string): void => {
    if (!userId || !itemId) return;
    try {
        const key = `${WRITING_PROGRESS_KEY_PREFIX}${userId}`;
        // Load existing progress to avoid overwriting other items
        const allProgressData = localStorage.getItem(key);
        const allProgress = allProgressData ? JSON.parse(allProgressData) : {};
        
        const updatedProgress = {
            ...allProgress,
            [itemId]: text
        };
        
        localStorage.setItem(key, JSON.stringify(updatedProgress));
    } catch (error) {
        console.error("Failed to save writing progress:", error);
    }
};
