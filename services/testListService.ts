// services/testListService.ts
import { TestListItem } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { loadOrInitializeData, saveData } from './dataService';
import { testLists as defaultTestLists } from '../data/testLists';

type TestListCollection = Record<string, Record<string, TestListItem[]>>;

/**
 * Loads the entire collection of test lists from storage.
 * @returns The collection of all test lists.
 */
const getTestLists = (): TestListCollection => {
    return loadOrInitializeData(LOCAL_STORAGE_KEYS.PRACTICE_TESTS_LISTS, defaultTestLists);
};

/**
 * Deletes a specific practice test from its list and saves the updated collection to localStorage.
 * @param exam - The exam type (e.g., 'toeic', 'ielts').
 * @param part - The specific part of the exam (e.g., 'part1', 'listening_theory').
 * @param testId - The ID of the test to delete.
 */
export const deleteTestFromList = (exam: string, part: string, testId: string): void => {
    const allLists = getTestLists();

    if (allLists[exam] && allLists[exam][part]) {
        const originalCount = allLists[exam][part].length;
        allLists[exam][part] = allLists[exam][part].filter(test => test.id !== testId);
        const newCount = allLists[exam][part].length;

        if (originalCount > newCount) {
            saveData(LOCAL_STORAGE_KEYS.PRACTICE_TESTS_LISTS, allLists);
            console.log(`Successfully deleted test '${testId}' from ${exam}/${part}.`);
        } else {
            console.warn(`Test with ID '${testId}' not found in ${exam}/${part}. No changes made.`);
        }
    } else {
        console.error(`Could not find list for exam '${exam}' and part '${part}'.`);
    }
};
