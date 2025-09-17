import { WritingCategory, WritingSubcategory, WritingSeed, WritingVocabItem } from '../types';

// This file is now deprecated for exam data.
// It only contains the base categories. All exam data has been moved to modular files.

export const writingPracticeData: WritingCategory[] = [
    {
        category_id: 'EASY',
        track_name_vi: 'Kỹ năng Nền tảng',
        subcategories: [], // This is handled by foundationPracticeData
    },
     {
        category_id: 'AI_WRITING_ASSISTANT',
        track_name_vi: 'Trợ lý Viết AI',
        subcategories: [],
    },
    // The TOEIC, IELTS, and VSTEP categories are now loaded from separate files and merged at runtime.
];