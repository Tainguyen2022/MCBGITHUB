
import { WritingSeed } from '../../types';

type IeltsTask2Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask2DiscussionTasks: IeltsTask2Definition[] = [ 
    { 
        code: 'IELTS-T2-DIS-01',
        topic: 'Discussion Essay', 
        prompt_en: 'Some people believe that spending money on space exploration is a waste of resources that could be used to solve problems on Earth. Others argue that it is essential for the future of humanity. Discuss both these views and give your own opinion.', 
        prompt_vi: 'Một số người tin rằng chi tiền cho việc khám phá không gian là một sự lãng phí tài nguyên có thể được dùng để giải quyết các vấn đề trên Trái Đất. Những người khác cho rằng điều đó là cần thiết cho tương lai của nhân loại. Thảo luận cả hai quan điểm này và đưa ra ý kiến của riêng bạn.', 
        prompt_vi_short: 'DIS-01: Chi tiền cho khám phá không gian',
        must_use: ['On the one hand', 'On the other hand', 'From my perspective'], 
        focus: 'Discussing two opposing views and presenting a personal opinion',
        imageSeed: 't2-space-exploration-vs-earth-problems'
    } 
];
