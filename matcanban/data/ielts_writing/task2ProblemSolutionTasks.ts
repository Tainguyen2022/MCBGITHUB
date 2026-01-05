
import { WritingSeed } from '../../types';

type IeltsTask2Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask2ProblemSolutionTasks: IeltsTask2Definition[] = [ 
    { 
        code: 'IELTS-T2-PRS-01',
        topic: 'Problem/Solution Essay', 
        prompt_en: 'In many countries, the population is aging rapidly. What problems does this cause for society? What solutions can you suggest?', 
        prompt_vi: 'Ở nhiều quốc gia, dân số đang già đi nhanh chóng. Điều này gây ra những vấn đề gì cho xã hội? Bạn có thể đề xuất những giải pháp nào?', 
        prompt_vi_short: 'PRS-01: Vấn đề dân số già',
        must_use: ['One of the main problems', 'A potential solution is', 'Furthermore'], 
        focus: 'Analyzing a problem and proposing viable solutions',
        imageSeed: 't2-aging-population-problem'
    } 
];
