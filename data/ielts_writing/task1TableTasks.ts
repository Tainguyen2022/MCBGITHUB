import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1TableTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-TAB-01',
        topic: 'Table', 
        prompt_en: 'The table below shows the sales of Fairtrade-labelled coffee and bananas in five European countries in 1999 and 2004.', 
        prompt_vi: 'Bảng dưới đây cho thấy doanh số bán cà phê và chuối có nhãn Fairtrade tại năm quốc gia châu Âu vào năm 1999 và 2004.', 
        prompt_vi_short: 'TAB-01: Doanh số Fairtrade',
        must_use: ['sales', 'experienced significant growth', 'respectively'], 
        focus: 'Comparing data in a table across categories and years',
        imageSeed: 't1-fairtrade-coffee-banana-sales-europe'
    } 
];