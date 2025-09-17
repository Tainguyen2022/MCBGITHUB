import { VocabItem, CustomVocabData } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { loadOrInitializeData, saveData } from './dataService';

// The data stored in localStorage will now be a dictionary mapping user IDs to their vocab packs.
type AllUsersCustomVocabData = Record<string, CustomVocabData>;

/**
 * Loads all custom vocab data from storage.
 * @returns An object containing all users' custom vocab data.
 */
const loadAllCustomPacks = (): AllUsersCustomVocabData => {
    // ARCHITECTURE NOTE:
    // In a full cloud implementation, this function would be asynchronous.
    // It would first attempt to fetch the user's specific vocab file (e.g., 'matcanban_vocab.json') 
    // from their Google Drive using an OAuth token. If it fails or the file doesn't exist,
    // it would fall back to localStorage as a cache.
    return loadOrInitializeData(LOCAL_STORAGE_KEYS.CUSTOM_VOCAB, {});
};

/**
 * Saves all custom vocab data to storage.
 * @param allPacks - The object containing all users' custom vocab data.
 */
const saveAllCustomPacks = (allPacks: AllUsersCustomVocabData): void => {
    // ARCHITECTURE NOTE:
    // In a full cloud implementation, this function would be asynchronous.
    // It would save the current user's updated vocab data back to their file
    // on Google Drive, ensuring data persistence and privacy.
    saveData(LOCAL_STORAGE_KEYS.CUSTOM_VOCAB, allPacks);
};

/**
 * Gets the custom vocabulary packs for a specific user.
 * @param userId - The ID of the user. Can be null if no user is logged in.
 * @returns The user's custom vocabulary data. Returns an empty object if no user ID is provided or user has no data.
 */
export const getCustomPacksForUser = (userId: string | null | undefined): CustomVocabData => {
    if (!userId) {
        return {};
    }
    const allPacks = loadAllCustomPacks();
    return allPacks[userId] || {};
};


/**
 * Adds a new, empty pack for a specific user.
 * @param userId - The ID of the user.
 * @param packName - The name for the new pack.
 * @returns The updated custom vocabulary data for the user.
 */
export const addPackForUser = (userId: string, packName: string): CustomVocabData => {
    const trimmedName = packName.trim();
    if (!userId || !trimmedName) return getCustomPacksForUser(userId);

    const allPacks = loadAllCustomPacks();
    const userPacks = allPacks[userId] || {};
    
    if (userPacks.hasOwnProperty(trimmedName)) {
        return userPacks; // Do nothing if name already exists
    }
    
    const newPacks = { ...userPacks, [trimmedName]: [] };
    allPacks[userId] = newPacks;
    saveAllCustomPacks(allPacks);
    return newPacks;
};

/**
 * Deletes a pack for a specific user.
 * @param userId - The ID of the user.
 * @param packName - The name of the pack to delete.
 * @returns The updated custom vocabulary data for the user.
 */
export const deletePackForUser = (userId: string, packName: string): CustomVocabData => {
    if (!userId) return {};
    const allPacks = loadAllCustomPacks();
    const userPacks = allPacks[userId];
    if (!userPacks) return {};
    
    const newPacks = { ...userPacks };
    delete newPacks[packName];
    allPacks[userId] = newPacks;
    saveAllCustomPacks(allPacks);
    return newPacks;
};

/**
 * Adds a word to a specific pack for a specific user.
 * @param userId - The ID of the user.
 * @param packName - The name of the pack to add the word to.
 * @param word - The vocabulary item to add.
 * @returns The updated custom vocabulary data for the user.
 */
export const addWordToPackForUser = (userId: string, packName: string, word: VocabItem): CustomVocabData => {
    if (!userId || !packName || !word) return getCustomPacksForUser(userId);
    
    const allPacks = loadAllCustomPacks();
    const userPacks = allPacks[userId] || {};
    if (!userPacks[packName]) return userPacks;

    const pack = [...userPacks[packName]];
    const exists = pack.some(w => (w.base || w.word) === (word.base || word.word));
    
    if (!exists) {
        pack.push(word);
        const newPacks = { ...userPacks, [packName]: pack };
        allPacks[userId] = newPacks;
        saveAllCustomPacks(allPacks);
        return newPacks;
    }
    return userPacks;
};

/**
 * Deletes a word from a specific pack for a specific user.
 * @param userId - The ID of the user.
 * @param packName - The name of the pack to delete the word from.
 * @param wordIdentifier - The base form or word text of the item to delete.
 * @returns The updated custom vocabulary data for the user.
 */
export const deleteWordFromPackForUser = (userId: string, packName: string, wordIdentifier: string): CustomVocabData => {
    if (!userId || !packName || !wordIdentifier) return getCustomPacksForUser(userId);
    
    const allPacks = loadAllCustomPacks();
    const userPacks = allPacks[userId];
    if (!userPacks || !userPacks[packName]) return userPacks || {};

    const newPack = userPacks[packName].filter(w => (w.base || w.word) !== wordIdentifier);
    const newPacks = { ...userPacks, [packName]: newPack };
    allPacks[userId] = newPacks;
    saveAllCustomPacks(allPacks);
    return newPacks;
};