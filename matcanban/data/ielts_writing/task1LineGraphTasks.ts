import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1LineTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-LIN-01',
        topic: 'Line Graph', 
        prompt_en: 'The chart below shows the number of men and women in further education in Britain in three periods and whether they were studying full-time or part-time.', 
        prompt_vi: 'Biểu đồ cho thấy số lượng nam và nữ theo học giáo dục sau phổ thông ở Anh trong ba giai đoạn và liệu họ học toàn thời gian hay bán thời gian.', 
        prompt_vi_short: 'LIN-01: Nam & nữ trong giáo dục',
        must_use: ['Overall', 'a significant increase', 'In terms of'], 
        focus: 'Comparing data across categories and time',
        imageSeed: 't1-further-education-britain'
    } 
];