
// services/contentService.ts
import { 
    Tip, PracticeTest, FoundationTopic, Scenario, CambridgeTest,
    WritingCategory, Unit, Group, VocabPack,
    WritingSubcategory, WritingSeed
} from '../types';
import { LOCAL_STORAGE_KEYS } from '../constants';

let cachedData: any = null;

// This function fetches ALL public data in a single API call for performance.
const fetchAllData = async (): Promise<any> => {
    if (cachedData) {
        return cachedData;
    }
    try {
        const response = await fetch('/api/all-data');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const data = await response.json();
            cachedData = data;
            return data;
        } else {
            const text = await response.text();
            console.error("Received non-JSON response from /api/all-data:", text);
            throw new Error("Server returned non-JSON data.");
        }
    } catch (error) {
        console.error("Failed to fetch content from server:", error);
        cachedData = {}; // Cache an empty object on failure to prevent repeated failed requests
        return cachedData;
    }
};

// --- Getter functions for each data type ---

export const getTipsData = async (): Promise<Tip[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.TIPS_DATA] || [];
};

export const getPracticeTests = async (): Promise<PracticeTest[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.PRACTICE_TESTS] || [];
};

export const getFoundationPracticeData = async (): Promise<FoundationTopic[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.WRITING_FOUNDATION_CONTENT] || [];
};

export const getSpeakingScenarios = async (): Promise<Scenario[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.SPEAKING_SCENARIOS_CONTENT] || [];
};

export const getCambridgeStartersData = async (): Promise<CambridgeTest[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.CAMBRIDGE_STARTERS_DATA] || [];
};

export const getGrammarUnits = async (): Promise<Unit[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.GRAMMAR_UNITS] || [];
}

export const getGrammarGroups = async (): Promise<Group[]> => {
    const data = await fetchAllData();
    return data?.[LOCAL_STORAGE_KEYS.GRAMMAR_GROUPS] || [];
}

export const getGrammarVocab = async (): Promise<{ version: string, packs: VocabPack }> => {
    const data = await fetchAllData();
    const vocabData = data?.[LOCAL_STORAGE_KEYS.GRAMMAR_VOCAB];
    return Array.isArray(vocabData) && vocabData.length > 0 ? vocabData[0] : vocabData || { version: "unknown", packs: {} };
}

// FIX: Replaced the incorrect generic mergeContent function with a specific implementation for `WritingSubcategory` data.
// The original function was causing a type error because it expected an `id` property and did not handle the nested `seeds` structure.
type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;
type WritingContentMap = Record<string, WritingSeedContent>;

const mergeContent = (subcategories: WritingSubcategory[], contentMap: WritingContentMap): WritingSubcategory[] => {
    return subcategories.map(sub => ({
        ...sub,
        seeds: (sub.seeds || []).map(seed => ({
            ...seed,
            ...(contentMap[seed.code] || {})
        }))
    }));
};


// Function to get fully resolved Writing data
export const getWritingData = async (): Promise<WritingCategory[]> => {
    const allData = await fetchAllData();

    // Reconstruct the full writing data from modular parts
    const baseWritingData = allData[LOCAL_STORAGE_KEYS.WRITING_DATA] || [];

    // IELTS
    // FIX: Completed the subcategory objects to fully conform to the WritingSubcategory type.
    const ieltsT1Subcategories: WritingSubcategory[] = [
        { 
            track_id: 'IELTS', 
            task_type: 'Task 1', 
            subcategory_id: 'IELTS-T1-Line', 
            subcategory_name_vi: 'Biểu đồ Đường', 
            level: 'B2', 
            test_tags: ["IELTS"], 
            objective_vi: 'Viết bài báo cáo mô tả Biểu đồ Đường.', 
            seeds: allData[LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_LINE_TASKS] || [] 
        },
        { 
            track_id: 'IELTS', 
            task_type: 'Task 1', 
            subcategory_id: 'IELTS-T1-Bar', 
            subcategory_name_vi: 'Biểu đồ Cột', 
            level: 'B2', 
            test_tags: ["IELTS"], 
            objective_vi: 'Viết bài báo cáo mô tả Biểu đồ Cột.', 
            seeds: allData[LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_BAR_TASKS] || []
        },
    ];
    const ieltsT1Content = {
        ...(allData[LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_LINE_CONTENT] || {}),
        ...(allData[LOCAL_STORAGE_KEYS.WRITING_IELTS_T1_BAR_CONTENT] || {}),
    };

     const ieltsCategory: WritingCategory = {
        category_id: 'IELTS',
        track_name_vi: 'Luyện thi IELTS',
        subcategories: mergeContent(ieltsT1Subcategories, ieltsT1Content),
    };
    
    // This is a simplified example. A full implementation would merge all IELTS/TOEIC/VSTEP parts.
    // For now, this structure demonstrates the principle.
    return [...baseWritingData, ieltsCategory];
};
