import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1ProcessTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-PRO-01',
        topic: 'Process Diagram', 
        prompt_en: 'The diagram below shows the process of smoking fish.', 
        prompt_vi: 'Sơ đồ dưới đây cho thấy quy trình làm cá hun khói.', 
        prompt_vi_short: 'PRO-01: Quy trình làm cá hun khói',
        must_use: ['The process begins with', 'The final stage involves', 'sequencing words'], 
        focus: 'Describing a linear process using passive voice and sequencing language',
        imageSeed: 't1-process-of-smoking-fish'
    } 
];