import { WritingSubcategory, WritingSeed } from '../../types';

type ToeicTask3Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

const toeicP3Base: ToeicTask3Definition[] = [
    { 
        code: 'TOEIC-P3-OPN-01',
        topic: 'Opinion Essay - Workplace Uniforms', 
        prompt_en: 'Do you agree or disagree that uniforms should be required for all employees?', 
        prompt_vi: 'Bạn đồng ý hay không đồng ý rằng tất cả nhân viên nên bắt buộc mặc đồng phục?', 
        prompt_vi_short: 'Bắt buộc nhân viên mặc đồng phục',
        must_use: ['I believe that...', 'One reason is...'], 
        focus: 'Stating opinion and giving reasons about workplace policies',
    },
    { 
        code: 'TOEIC-P3-OPN-02',
        topic: 'Opinion Essay - Remote Work', 
        prompt_en: 'Do you think employees should be allowed to work from home permanently?', 
        prompt_vi: 'Bạn có nghĩ rằng nhân viên nên được phép làm việc từ nhà vĩnh viễn không?', 
        prompt_vi_short: 'Làm việc từ nhà vĩnh viễn',
        must_use: ['In my opinion...', 'Furthermore...'], 
        focus: 'Discussing modern work arrangements',
    },
    { 
        code: 'TOEIC-P3-OPN-03',
        topic: 'Opinion Essay - Training Programs', 
        prompt_en: 'Should companies provide regular training programs for their employees?', 
        prompt_vi: 'Các công ty có nên cung cấp các chương trình đào tạo thường xuyên cho nhân viên của họ không?', 
        prompt_vi_short: 'Chương trình đào tạo thường xuyên',
        must_use: ['I strongly believe...', 'For example...'], 
        focus: 'Discussing employee development and training',
    },
    { 
        code: 'TOEIC-P3-OPN-04',
        topic: 'Opinion Essay - Flexible Hours', 
        prompt_en: 'Do you agree that flexible working hours improve employee productivity?', 
        prompt_vi: 'Bạn có đồng ý rằng giờ làm việc linh hoạt cải thiện năng suất của nhân viên không?', 
        prompt_vi_short: 'Giờ làm việc linh hoạt',
        must_use: ['I agree that...', 'This is because...'], 
        focus: 'Analyzing workplace flexibility and productivity',
    },
    { 
        code: 'TOEIC-P3-OPN-05',
        topic: 'Opinion Essay - Team Building', 
        prompt_en: 'Is it important for companies to organize team-building activities?', 
        prompt_vi: 'Việc các công ty tổ chức các hoạt động xây dựng đội nhóm có quan trọng không?', 
        prompt_vi_short: 'Hoạt động xây dựng đội nhóm',
        must_use: ['I think it is essential...', 'The main benefit is...'], 
        focus: 'Discussing team collaboration and workplace culture',
    }
];

export const toeicTask3Subcategories: WritingSubcategory[] = [
    { track_id: 'TOEIC', task_type: 'Task 8', subcategory_id: 'TOEIC-P3-Opinion', subcategory_name_vi: 'Task 8: Viết bài luận', level: 'B2', test_tags: ["TOEIC"], objective_vi: 'Viết một bài luận trình bày quan điểm về một chủ đề công sở.', seeds: toeicP3Base }
];