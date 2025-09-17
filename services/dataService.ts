const DATA_VERSION_KEY = 'MATCANBAN_DATA_VERSION';
const CURRENT_DATA_VERSION = '1.0.0'; // Change this to force a re-fetch for all users

/**
 * No longer fetches from a server. This function now resolves immediately, 
 * allowing the app to run in a fully client-side mode.
 */
export const initializeAppContent = async (): Promise<void> => {
    console.log("Running in client-only mode. Skipping server fetch for initial data.");
    // This function is now a no-op to prevent server calls.
    // The app will rely on data compiled into the app or stored in localStorage.
    return Promise.resolve();
};


export const loadOrInitializeData = <T,>(key: string, defaultData: T): T => {
    try {
        const storedData = localStorage.getItem(key);
        if (storedData) {
            return JSON.parse(storedData);
        }
        // If data is not in localStorage (e.g., server fetch failed or first load),
        // we use the default data compiled with the app.
        // We no longer save it back here, as initializeAppContent is the source of truth.
        return defaultData;
    } catch (error) {
        console.error(`Failed to load or parse data for key "${key}", using default.`, error);
        return defaultData;
    }
};

export const saveData = <T,>(key: string, data: T): void => {
    try {
        localStorage.setItem(key, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Failed to save data for key "${key}".`, error);
        alert(`Error saving data for ${key}. Check console for details.`);
    }
};