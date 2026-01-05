import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const ieltsTask1PieContent: Record<string, WritingSeedContent> = {
    'IELTS-T1-PIE-01': {
        sample_answer_en: "The two pie charts illustrate the breakdown of electricity generation by source for a particular nation in the years 2015 and 2020.\n\nOverall, fossil fuels remained the primary source of electricity throughout the period, although its dominance slightly decreased. The most significant trend was the substantial growth in the proportion of power generated from renewable sources.\n\nIn 2015, fossil fuels were responsible for the vast majority of electricity, accounting for 75% of the total. Nuclear power contributed the second-largest share, at 20%. Renewable energy represented a mere 5% of the total electricity production.\n\nFive years later, in 2020, the reliance on fossil fuels had diminished to 60%. While the proportion from nuclear power also saw a slight reduction to 15%, the share of renewable energy sources experienced a dramatic threefold increase, rising to 25%. This made renewables the second most important source of electricity, surpassing nuclear power.",
        sample_answer_vi: "Hai biểu đồ tròn minh họa sự phân chia sản lượng điện theo nguồn tại một quốc gia cụ thể trong các năm 2015 và 2020.\n\nNhìn chung, nhiên liệu hóa thạch vẫn là nguồn điện chính trong suốt giai đoạn, mặc dù sự thống trị của nó có giảm nhẹ. Xu hướng đáng kể nhất là sự tăng trưởng đáng kể trong tỷ trọng điện năng được tạo ra từ các nguồn năng lượng tái tạo.\n\nVào năm 2015, nhiên liệu hóa thạch chịu trách nhiệm cho phần lớn điện năng, chiếm 75% tổng sản lượng. Năng lượng hạt nhân đóng góp phần lớn thứ hai, ở mức 20%. Năng lượng tái tạo chỉ chiếm một tỷ lệ nhỏ là 5% tổng sản lượng điện.\n\nNăm năm sau, vào năm 2020, sự phụ thuộc vào nhiên liệu hóa thạch đã giảm xuống còn 60%. Trong khi tỷ trọng từ năng lượng hạt nhân cũng giảm nhẹ xuống 15%, thì tỷ trọng của các nguồn năng lượng tái tạo đã tăng gấp ba lần một cách ngoạn mục, lên tới 25%. Điều này đã đưa năng lượng tái tạo trở thành nguồn điện quan trọng thứ hai, vượt qua năng lượng hạt nhân.",
        sample_outline_en: `1. Intro: Paraphrase the prompt (electricity generation by source in 2015 and 2020).\n2. Overview: State two main features: a) fossil fuels remained dominant but decreased; b) renewables saw significant growth.\n3. Body 1: Detail the proportions for all three sources in 2015.\n4. Body 2: Detail the proportions for all three sources in 2020, highlighting the key changes (decrease in fossil/nuclear, threefold increase in renewables).`,
        sample_outline_vi: `1. Mở bài: Diễn giải lại đề bài (sản xuất điện theo nguồn năm 2015 và 2020).\n2. Tổng quan: Nêu hai đặc điểm chính: a) nhiên liệu hóa thạch vẫn chiếm ưu thế nhưng đã giảm; b) năng lượng tái tạo tăng trưởng đáng kể.\n3. Thân bài 1: Chi tiết tỷ lệ của cả ba nguồn vào năm 2015.\n4. Thân bài 2: Chi tiết tỷ lệ của cả ba nguồn vào năm 2020, nhấn mạnh những thay đổi chính (giảm ở nhiên liệu hóa thạch/hạt nhân, tăng gấp ba ở năng lượng tái tạo).`,
        vocabulary: [
            { word: 'illustrate', ipa: '/ˈɪləstreɪt/', pos: 'v.', vi: 'minh họa' },
            { word: 'breakdown', ipa: '/ˈbreɪkdaʊn/', pos: 'n.', vi: 'sự phân chia, phân tích' },
            { word: 'dominance', ipa: '/ˈdɒmɪnəns/', pos: 'n.', vi: 'sự thống trị, ưu thế' },
            { word: 'renewable sources', ipa: '/rɪˈnjuːəbl ˈsɔːsɪz/', pos: 'n. phr.', vi: 'các nguồn năng lượng tái tạo' },
            { word: 'accounted for', ipa: '/əˈkaʊntɪd fɔː(r)/', pos: 'phr. v.', vi: 'chiếm (tỷ lệ)' },
            { word: 'diminished', ipa: '/dɪˈmɪnɪʃt/', pos: 'v.', vi: 'giảm bớt' },
            { word: 'threefold increase', ipa: '/ˈθriːfəʊld ˈɪŋkriːs/', pos: 'n. phr.', vi: 'sự tăng gấp ba lần' },
            { word: 'surpassing', ipa: '/səˈpɑːsɪŋ/', pos: 'v.', vi: 'vượt qua' }
        ]
    }
};