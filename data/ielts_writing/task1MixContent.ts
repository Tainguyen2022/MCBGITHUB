import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1MixContent: Record<string, WritingSeedContent> = {
  'IELTS-T1-MIX-01': {
    sample_answer_en: "The bar chart compares the percentage of households owning at least one car in three countries in 2000 and 2020, while the line chart shows the average distance traveled per household in the same period. Overall, car ownership rose in all three countries, and the average distance traveled also increased, with Country B consistently recording the highest figures.",
    sample_answer_vi: "Biểu đồ cột so sánh tỷ lệ hộ gia đình sở hữu ít nhất một chiếc ô tô ở ba quốc gia vào năm 2000 và 2020, trong khi biểu đồ đường cho thấy khoảng cách di chuyển trung bình mỗi hộ trong cùng giai đoạn. Nhìn chung, sở hữu ô tô tăng ở cả ba quốc gia và khoảng cách di chuyển trung bình cũng tăng, với Quốc gia B liên tục ghi nhận số liệu cao nhất.",
    sample_outline_en: `1. Introduction: Paraphrase charts (ownership + distance).\n2. Overview: Rising trend in both metrics; Country B highest.\n3. BP1: Car ownership by country (2000 vs 2020).\n4. BP2: Distance trends and cross-country comparison.`,
    sample_outline_vi: `1. Mở bài: Diễn giải lại biểu đồ (sở hữu + khoảng cách).\n2. Tổng quan: Xu hướng tăng ở cả hai chỉ số; Quốc gia B cao nhất.\n3. Thân bài 1: Sở hữu ô tô theo quốc gia (2000 so với 2020).\n4. Thân bài 2: Xu hướng khoảng cách và so sánh giữa các quốc gia.`,
    vocabulary: [
      { word: 'ownership', ipa: '/ˈoʊnərʃɪp/', pos: 'n.', vi: 'quyền sở hữu' },
      { word: 'proportion', ipa: '/prəˈpɔːrʃən/', pos: 'n.', vi: 'tỷ lệ' },
      { word: 'household', ipa: '/ˈhaʊshoʊld/', pos: 'n.', vi: 'hộ gia đình' },
      { word: 'distance traveled', ipa: '/ˈdɪstəns ˈtrævəld/', pos: 'n.', vi: 'khoảng cách di chuyển' }
    ],
    practice: {
      reorder: [{
        words: [
          { en: 'Car ownership', vi: 'Sở hữu ô tô' },
          { en: 'increased', vi: 'đã tăng' },
          { en: 'in all countries.', vi: 'ở tất cả các quốc gia.' }
        ],
        answer: 'Car ownership increased in all countries.'
      }]
    }
  },
  'IELTS-T1-MIX-02': {
    sample_answer_en: "The bar chart shows internet usage by age group, while the pie chart illustrates the distribution of online activities in 2010. Overall, younger age groups used the internet more frequently, and social networking and entertainment accounted for the largest proportions of online activities.",
    sample_answer_vi: "Biểu đồ cột cho thấy việc sử dụng internet theo nhóm tuổi, trong khi biểu đồ tròn minh họa phân bổ các hoạt động trực tuyến vào năm 2010. Nhìn chung, các nhóm tuổi trẻ sử dụng internet thường xuyên hơn, và mạng xã hội cùng giải trí chiếm tỷ lệ lớn nhất trong các hoạt động trực tuyến.",
    sample_outline_en: `1. Introduction: Paraphrase charts (age vs activities).\n2. Overview: Younger groups higher; social/entertainment dominant.\n3. BP1: Usage by age patterns.\n4. BP2: Activity breakdown and notable contrasts.`,
    sample_outline_vi: `1. Mở bài: Diễn giải lại biểu đồ (tuổi vs hoạt động).\n2. Tổng quan: Nhóm trẻ cao hơn; mạng xã hội/giải trí chiếm ưu thế.\n3. Thân bài 1: Mẫu hình sử dụng theo tuổi.\n4. Thân bài 2: Phân bố hoạt động và khác biệt nổi bật.`,
    vocabulary: [
      { word: 'proportion', ipa: '/prəˈpɔːrʃən/', pos: 'n.', vi: 'tỷ lệ' },
      { word: 'account for', ipa: '/əˈkaʊnt fɔːr/', pos: 'v.', vi: 'chiếm' },
      { word: 'age group', ipa: '/eɪdʒ ɡruːp/', pos: 'n.', vi: 'nhóm tuổi' }
    ],
    practice: {
      fill_blank: [{
        sentence: { en: 'Social networking ____ the largest share of online activities.', vi: 'Mạng xã hội ____ phần lớn nhất của các hoạt động trực tuyến.' },
        missing_word: 'accounts for',
        options: ['accounts for', 'reduces', 'ignores', 'limits']
      }]
    }
  }
};



