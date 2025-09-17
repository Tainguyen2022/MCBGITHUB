import { WritingSubcategory, WritingSeed } from '../../types';

type ToeicTask3Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

const toeicP3Base: ToeicTask3Definition[] = [
    { 
        code: 'TOEIC-P3-OPN-01',
        topic: 'Opinion Essay', 
        prompt_en: 'Do you agree or disagree that uniforms should be required for all employees?', 
        prompt_vi: 'Bạn đồng ý hay không đồng ý rằng tất cả nhân viên nên bắt buộc mặc đồng phục?', 
        prompt_vi_short: 'Bắt buộc nhân viên mặc đồng phục?',
        must_use: ['I believe that...', 'One reason is...'], 
        focus: 'Stating opinion and giving reasons',
    }
];

export const toeicTask3Subcategories: WritingSubcategory[] = [
    { track_id: 'TOEIC', task_type: 'Task 8', subcategory_id: 'TOEIC-P3-Opinion', subcategory_name_vi: 'Task 8: Viết bài luận', level: 'B2', test_tags: ["TOEIC"], objective_vi: 'Viết một bài luận trình bày quan điểm về một chủ đề công sở.', seeds: toeicP3Base }
];