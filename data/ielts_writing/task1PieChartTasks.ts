import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1PieTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-PIE-01',
        topic: 'Pie Chart', 
        prompt_en: 'The charts below show the main sources of electricity in a particular country in 2015 and 2020.', 
        prompt_vi: 'Các biểu đồ dưới đây cho thấy các nguồn sản xuất điện chính tại một quốc gia cụ thể vào năm 2015 và 2020.', 
        prompt_vi_short: 'PIE-01: Nguồn sản xuất điện',
        must_use: ['accounted for', 'the largest proportion', 'meanwhile'], 
        focus: 'Comparing proportions between two different years',
        imageSeed: 't1-electricity-production-sources-2015-2020'
    } 
];