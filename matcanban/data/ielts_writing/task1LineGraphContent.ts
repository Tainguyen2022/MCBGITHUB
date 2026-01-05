import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1LineContent: Record<string, WritingSeedContent> = {
    'IELTS-T1-LIN-01': {
        sample_answer_en: "The line graph illustrates the number of male and female students enrolled in further education in Britain, segmented by full-time and part-time study modes, for the academic years 1970/71, 1980/81, and 1990/91.\n\nOverall, what is most striking is the significant growth in female participation across both types of education. While men's full-time enrollment also rose, their numbers in part-time studies experienced a notable decline, eventually being surpassed by their female counterparts.\n\nFocusing on part-time education, men began as the dominant group with approximately one million students in 1970/71. However, this figure witnessed a steady decrease over the two decades, falling to around 850,000 by 1990/91. In stark contrast, female part-time enrollment surged, climbing from roughly 750,000 to a peak of over 1.1 million, making it the largest category by the end of the period.\n\nRegarding full-time studies, both genders saw an upward trend. Male enrollment increased modestly from just below 200,000 to approximately 250,000 over the 20-year span. Women, starting from a considerably lower base of about 100,000, experienced a much more dramatic rise, more than doubling to roughly 220,000 in 1990/91, bringing them almost to parity with the male figures.",
        sample_answer_vi: "Biểu đồ đường minh họa số lượng sinh viên nam và nữ theo học giáo dục sau phổ thông ở Anh, được phân chia theo hình thức học toàn thời gian và bán thời gian, cho các năm học 1970/71, 1980/81 và 1990/91.\n\nNhìn chung, điều nổi bật nhất là sự tăng trưởng đáng kể trong việc tham gia của nữ giới ở cả hai loại hình giáo dục. Trong khi số lượng nam giới theo học toàn thời gian cũng tăng, số lượng của họ trong các chương trình bán thời gian lại trải qua một sự sụt giảm đáng chú ý, và cuối cùng bị vượt qua bởi các đối tác nữ của họ.\n\nTập trung vào giáo dục bán thời gian, nam giới bắt đầu là nhóm chiếm ưu thế với khoảng một triệu sinh viên vào năm 1970/71. Tuy nhiên, con số này đã chứng kiến một sự sụt giảm đều đặn trong hai thập kỷ, giảm xuống còn khoảng 850.000 vào năm 1990/91. Trái ngược hoàn toàn, số lượng nữ sinh bán thời gian đã tăng vọt, từ khoảng 750.000 lên đến đỉnh điểm hơn 1,1 triệu, trở thành hạng mục lớn nhất vào cuối giai đoạn.\n\nVề các chương trình học toàn thời gian, cả hai giới đều có xu hướng tăng. Số lượng nam sinh tăng một cách khiêm tốn từ dưới 200.000 lên khoảng 250.000 trong khoảng thời gian 20 năm. Phụ nữ, bắt đầu từ một mức cơ sở thấp hơn đáng kể khoảng 100.000, đã trải qua một sự gia tăng ngoạn mục hơn nhiều, tăng hơn gấp đôi lên khoảng 220.000 vào năm 1990/91, đưa họ gần như ngang bằng với số liệu của nam giới.",
        sample_outline_en: `1. Introduction: Paraphrase the prompt (number of men/women in full-time/part-time further education in Britain over three periods).\n2. Overview: State two main trends: a) significant rise in female students in both modes; b) decrease in part-time male students while full-time numbers rose.\n3. Body Paragraph 1: Detail part-time education. Compare men (started highest, then declined) with women (started lower, but surged past men). Use specific figures for start and end points.\n4. Body Paragraph 2: Detail full-time education. Describe the modest increase for men and the more dramatic increase for women, noting they almost reached parity. Use specific figures.`,
        sample_outline_vi: `1. Mở bài: Diễn giải lại đề bài (số lượng nam và nữ trong giáo dục toàn thời gian/bán thời gian ở Anh qua ba giai đoạn).\n2. Tổng quan: Nêu hai xu hướng chính: a) số lượng nữ sinh tăng đáng kể ở cả hai hình thức; b) số lượng nam sinh bán thời gian giảm trong khi số lượng toàn thời gian tăng.\n3. Thân bài 1: Chi tiết về giáo dục bán thời gian. So sánh nam giới (bắt đầu cao nhất, sau đó giảm) với nữ giới (bắt đầu thấp hơn, nhưng tăng vọt vượt qua nam giới). Sử dụng số liệu cụ thể cho điểm đầu và điểm cuối.\n4. Thân bài 2: Chi tiết về giáo dục toàn thời gian. Mô tả sự tăng trưởng khiêm tốn của nam giới và sự tăng trưởng ngoạn mục hơn của nữ giới, lưu ý rằng họ gần như đạt đến sự ngang bằng. Sử dụng số liệu cụ thể.`,
        vocabulary: [
            { word: 'enrollment', ipa: '/ɪnˈrəʊlmənt/', pos: 'n.', vi: 'sự tuyển sinh, số lượng nhập học' },
            { word: 'surpass', ipa: '/səˈpɑːs/', pos: 'v.', vi: 'vượt qua' },
            { word: 'counterpart', ipa: '/ˈkaʊntəpɑːt/', pos: 'n.', vi: 'đối tác, người/vật tương ứng' },
            { word: 'dominant', ipa: '/ˈdɒmɪnənt/', pos: 'adj.', vi: 'chiếm ưu thế, thống trị' },
            { word: 'surge', ipa: '/sɜːdʒ/', pos: 'v.', vi: 'tăng vọt, dâng lên' },
            { word: 'modestly', ipa: '/ˈmɒdɪstli/', pos: 'adv.', vi: 'một cách khiêm tốn, nhỏ' },
            { word: 'parity', ipa: '/ˈpærəti/', pos: 'n.', vi: 'sự ngang bằng, bình đẳng' }
        ],
        practice: {
            reorder: [{ 
                words: [
                    { en: 'Female part-time enrollment', vi: 'Số lượng nữ sinh bán thời gian' },
                    { en: 'surged', vi: 'đã tăng vọt' },
                    { en: 'from roughly 750,000', vi: 'từ khoảng 750.000' },
                    { en: 'to a peak of', vi: 'lên mức đỉnh điểm là' },
                    { en: 'over 1.1 million.', vi: 'hơn 1,1 triệu.' }
                ], 
                answer: "Female part-time enrollment surged from roughly 750,000 to a peak of over 1.1 million." 
            }]
        }
    }
};