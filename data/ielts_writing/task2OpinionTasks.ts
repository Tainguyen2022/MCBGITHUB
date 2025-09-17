
import { WritingSeed } from '../../types';

type IeltsTask2Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask2OpinionTasks: IeltsTask2Definition[] = [ 
    { 
        code: 'IELTS-T2-OPN-01',
        topic: 'Opinion Essay', 
        prompt_en: 'Some people think that governments should spend money on the arts (e.g., museums, galleries). Others think that this money would be better spent on other public services like healthcare and education. To what extent do you agree or disagree?', 
        prompt_vi: 'Một số người nghĩ rằng chính phủ nên chi tiền cho nghệ thuật (ví dụ: bảo tàng, phòng trưng bày). Những người khác cho rằng số tiền này sẽ được chi tiêu tốt hơn cho các dịch vụ công khác như y tế và giáo dục. Bạn đồng ý hay không đồng ý ở mức độ nào?', 
        prompt_vi_short: 'OPN-01: Tài trợ nghệ thuật vs. Dịch vụ công',
        must_use: ['While it is true that', 'The primary reason is', 'In conclusion'], 
        focus: 'Developing a clear and consistent opinion with concessions',
        imageSeed: 't2-government-funding-arts-vs-health'
    } 
];
