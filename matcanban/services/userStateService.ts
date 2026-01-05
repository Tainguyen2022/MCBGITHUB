
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
        const serializedState = JSON.stringify(state);
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
    saveState({ ...currentState, writing: writingState });
};

// Exam Practice Page State
export const getExamPracticePageState = () => {
    return loadState().examPractice;
};

export const saveExamPracticePageState = (examPracticeState: any) => {
    const currentState = loadState();
    saveState({ ...currentState, examPractice: examPracticeState });
};
