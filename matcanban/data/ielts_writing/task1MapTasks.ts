import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1MapTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-MAP-01',
        topic: 'Map', 
        prompt_en: 'The two maps below show the changes to a university sports centre in 2010 and now.', 
        prompt_vi: 'Hai bản đồ dưới đây cho thấy những thay đổi của một trung tâm thể thao đại học vào năm 2010 và hiện tại.', 
        prompt_vi_short: 'MAP-01: Thay đổi trung tâm thể thao',
        must_use: ['The most noticeable change', 'was replaced by', 'was constructed'], 
        focus: 'Describing and comparing changes between two maps',
        imageSeed: 't1-university-sports-centre-2010-vs-now'
    } 
];