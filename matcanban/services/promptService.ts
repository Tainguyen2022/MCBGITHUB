import { AIPromptCollection } from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';
import { loadOrInitializeData, saveData } from './dataService';
import { defaultPrompts } from '../data/prompts';

export const getPrompts = (): AIPromptCollection => {
    try {
        const prompts = loadOrInitializeData(LOCAL_STORAGE_KEYS.PROMPTS, defaultPrompts);
        // Basic validation
        if (prompts && typeof prompts === 'object' && prompts.checkGrammar) {
            // Ensure new prompts are added if they don't exist in storage
            let updated = false;
            for (const key in defaultPrompts) {
                if (!prompts[key as keyof AIPromptCollection]) {
                    prompts[key as keyof AIPromptCollection] = defaultPrompts[key as keyof AIPromptCollection];
                    updated = true;
                }
            }
            if(updated) savePrompts(prompts);
            return prompts;
        }
        console.warn("Prompts data in localStorage is malformed. Resetting to default.");
        saveData(LOCAL_STORAGE_KEYS.PROMPTS, defaultPrompts);
        return defaultPrompts;
    } catch (error) {
        console.error("Error loading prompts, resetting to default.", error);
        saveData(LOCAL_STORAGE_KEYS.PROMPTS, defaultPrompts);
        return defaultPrompts;
    }
};

export const savePrompts = (prompts: AIPromptCollection): void => {
    saveData(LOCAL_STORAGE_KEYS.PROMPTS, prompts);
};
