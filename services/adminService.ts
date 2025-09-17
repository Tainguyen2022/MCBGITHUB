import { LOCAL_STORAGE_KEYS } from '../constants';
import { vocab } from '../data/vocab';

export const getCurrentVersion = (): string => {
    return vocab.version;
};

export const backupData = (): void => {
    try {
        const backupData: Record<string, any> = {};
        const keysToBackup = Object.values(LOCAL_STORAGE_KEYS);

        keysToBackup.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    backupData[key] = JSON.parse(data);
                } catch {
                    backupData[key] = data; // Store as raw string if not JSON
                }
            }
        });

        const jsonString = JSON.stringify(backupData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        const timestamp = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
        a.download = `matcanban_backup_${timestamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Backup failed:", error);
        alert("Backup failed. See console for details.");
    }
};

export const restoreData = (file: File): Promise<void> => {
    return new Promise((resolve, reject) => {
        if (!file || file.type !== 'application/json') {
            reject(new Error("Invalid file type. Please select a JSON file."));
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const dataToRestore = JSON.parse(content);
                
                // FIX: Add a type guard to ensure dataToRestore is a valid object before iterating over its keys.
                // This prevents runtime errors and satisfies stricter TypeScript rules.
                if (typeof dataToRestore === 'object' && dataToRestore !== null) {
                    Object.keys(dataToRestore).forEach(key => {
                        if (Object.values(LOCAL_STORAGE_KEYS).includes(key)) {
                            const value = (dataToRestore as Record<string, unknown>)[key];
                            localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
                        }
                    });
                } else {
                    throw new Error("Backup file content is not a valid object.");
                }
                resolve();
            } catch (error) {
                console.error("Restore failed:", error);
                reject(new Error("Failed to parse or restore backup file."));
            }
        };

        reader.onerror = () => {
            reject(new Error("Failed to read the file."));
        };
        
        reader.readAsText(file);
    });
};