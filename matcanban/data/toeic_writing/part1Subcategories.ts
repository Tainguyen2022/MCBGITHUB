import { WritingSubcategory, WritingSeed } from '../../types';

type ToeicTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

const toeicP1Base: ToeicTask1Definition[] = [
    { 
        code: 'TOEIC-P1-DESC-01',
        topic: 'Describe a Picture', 
        prompt_en: 'Write a sentence about a group of people in a meeting room.', 
        prompt_vi: 'Viết một câu về một nhóm người trong phòng họp.', 
        prompt_vi_short: 'Nhóm người trong phòng họp',
        must_use: ['are sitting around a table', 'Present Continuous'], 
        focus: 'Describing a group action', 
    }
];

export const toeicTask1Subcategories: WritingSubcategory[] = [
    { track_id: 'TOEIC', task_type: 'Tasks 1-5', subcategory_id: 'TOEIC-P1-Describe', subcategory_name_vi: 'Task 1-5: Miêu tả Tranh', level: 'B1', test_tags: ["TOEIC"], objective_vi: 'Viết một câu mô tả chính xác bức tranh.', seeds: toeicP1Base },
];