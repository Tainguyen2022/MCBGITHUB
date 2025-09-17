import { WritingSeed } from '../../types';

type IeltsTask1Definition = Omit<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1MixTasks: IeltsTask1Definition[] = [ 
    { 
        code: 'IELTS-T1-MIX-01',
        topic: 'Mixed Charts', 
        prompt_en: 'The charts below show the percentage of households owning cars and the average distance traveled per household in three countries in 2000 and 2020.', 
        prompt_vi: 'Các biểu đồ dưới đây cho thấy tỷ lệ hộ gia đình sở hữu ô tô và khoảng cách di chuyển trung bình mỗi hộ ở ba quốc gia vào năm 2000 và 2020.', 
        prompt_vi_short: 'MIX-01: Sở hữu ô tô & khoảng cách di chuyển',
        must_use: ['Overall, it is clear that', 'in contrast', 'experienced a significant change'], 
        focus: 'Summarizing and comparing mixed data (bar + line/pie)',
        imageSeed: 't1-mix-car-ownership-vs-distance-2000-2020'
    },
    { 
        code: 'IELTS-T1-MIX-02',
        topic: 'Mixed Charts', 
        prompt_en: 'The bar chart and pie chart give information about internet usage by age group and the types of online activities in a country in 2010.', 
        prompt_vi: 'Biểu đồ cột và biểu đồ tròn cung cấp thông tin về việc sử dụng internet theo nhóm tuổi và các loại hoạt động trực tuyến ở một quốc gia vào năm 2010.', 
        prompt_vi_short: 'MIX-02: Internet theo tuổi & hoạt động',
        must_use: ['accounted for', 'the proportion of', 'by contrast'], 
        focus: 'Describing proportions and category comparisons',
        imageSeed: 't1-mix-internet-usage-by-age-and-activity-2010'
    }
];



