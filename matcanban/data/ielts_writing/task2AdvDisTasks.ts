
import { WritingSeed } from '../../types';

type IeltsTask2Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask2AdvDisTasks: IeltsTask2Definition[] = [ 
    { 
        code: 'IELTS-T2-ADD-01',
        topic: 'Advantages & Disadvantages Essay', 
        prompt_en: 'International travel has become increasingly popular. What are the advantages and disadvantages of this trend?', 
        prompt_vi: 'Du lịch quốc tế đã trở nên ngày càng phổ biến. Ưu và nhược điểm của xu hướng này là gì?', 
        prompt_vi_short: 'ADD-01: Ưu/nhược điểm du lịch quốc tế',
        must_use: ['On the one hand', 'However', 'a significant drawback'], 
        focus: 'Presenting a balanced discussion of pros and cons',
        imageSeed: 't2-international-travel-advantages-disadvantages'
    } 
];
