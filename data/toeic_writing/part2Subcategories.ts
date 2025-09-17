import { WritingSubcategory, WritingSeed } from '../../types';

type ToeicTask2Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

const toeicP2Base: ToeicTask2Definition[] = [
    { 
        code: 'TOEIC-P2-EMAIL-01',
        topic: 'Email Response', 
        prompt_en: 'Reply to an email asking to confirm the time of a meeting.', 
        prompt_vi: 'Trả lời email yêu cầu xác nhận thời gian cuộc họp.', 
        prompt_vi_short: 'Xác nhận thời gian họp', 
        must_use: ['The meeting is scheduled for...'], 
        focus: 'Providing information',
    }
];

export const toeicTask2Subcategories: WritingSubcategory[] = [
    { track_id: 'TOEIC', task_type: 'Tasks 6-7', subcategory_id: 'TOEIC-P2-Email', subcategory_name_vi: 'Task 6-7: Trả lời Email', level: 'B1', test_tags: ["TOEIC"], objective_vi: 'Viết một email trả lời yêu cầu.', seeds: toeicP2Base },
];