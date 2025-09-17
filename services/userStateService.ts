
const UI_STATE_KEY = 'MATCANBAN_UI_STATE';

interface AppUIState {
    grammar?: any;
    speaking?: any;
    writing?: any;
    examPractice?: any;
}

const loadState = (): AppUIState => {
    try {
        const serializedState = localStorage.getItem(UI_STATE_KEY);
        if (serializedState === null) {
            return {};
        }
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Could not load UI state from localStorage", err);
        return {};
    }
};

const saveState = (state: AppUIState) => {
    try {
        // Use a safe serializer to avoid circular references and non-serializable values
        const seen = new WeakSet();
        const serializedState = JSON.stringify(state, (key, value) => {
            // Skip functions
            if (typeof value === 'function') return undefined;
            // Skip React context-like objects
            if (value && typeof value === 'object' && ('Provider' in value || 'Consumer' in value)) {
                return undefined;
            }
            // Avoid circular refs
            if (value && typeof value === 'object') {
                if (seen.has(value)) return undefined;
                seen.add(value);
            }
            return value;
        });
        localStorage.setItem(UI_STATE_KEY, serializedState);
    } catch (err) {
        console.error("Could not save UI state to localStorage", err);
    }
};

// Grammar Page State
export const getGrammarPageState = () => {
    return loadState().grammar;
};

export const saveGrammarPageState = (grammarState: any) => {
    const currentState = loadState();
    saveState({ ...currentState, grammar: grammarState });
};

// Speaking Page State
export const getSpeakingPageState = () => {
    return loadState().speaking;
};

export const saveSpeakingPageState = (speakingState: any) => {
    const currentState = loadState();
    saveState({ ...currentState, speaking: speakingState });
};

// Writing Page State
export const getWritingPageState = () => {
    return loadState().writing;
};

export const saveWritingPageState = (writingState: any) => {
    const currentState = loadState();
    // Ensure only plain serializable data is stored
    const { selectedTrackId, selectedSubcategoryId, foundationLevelFilter } = writingState || {};
    const safe = {
        selectedTrackId: typeof selectedTrackId === 'string' ? selectedTrackId : undefined,
        selectedSubcategoryId: typeof selectedSubcategoryId === 'string' || selectedSubcategoryId === null ? selectedSubcategoryId : undefined,
        foundationLevelFilter: ['all','easy','medium','advanced'].includes(foundationLevelFilter) ? foundationLevelFilter : 'all'
    };
    saveState({ ...currentState, writing: safe });
};

// Exam Practice Page State
export const getExamPracticePageState = () => {
    return loadState().examPractice;
};

export const saveExamPracticePageState = (examPracticeState: any) => {
    const currentState = loadState();
    saveState({ ...currentState, examPractice: examPracticeState });
};
