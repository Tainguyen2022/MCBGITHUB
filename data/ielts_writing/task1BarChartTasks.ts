import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1BarTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-BAR-01',
        topic: 'Bar Chart', 
        prompt_en: 'The chart below shows the main reasons why people chose to work from home in two different years.', 
        prompt_vi: 'Biểu đồ dưới đây cho thấy các lý do chính tại sao mọi người chọn làm việc tại nhà trong hai năm khác nhau.', 
        prompt_vi_short: 'BAR-01: Lý do làm việc tại nhà',
        must_use: ['The primary reason', 'a significant difference', 'In contrast'], 
        focus: 'Comparing and contrasting data between two groups',
        imageSeed: 't1-reasons-for-working-from-home-2019-2024'
    } 
];