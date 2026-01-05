import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const toeicTask3Content: Record<string, WritingSeedContent> = {
    'TOEIC-P3-OPN-01': {
        sample_answer_en: "I believe that requiring uniforms for all employees is a beneficial policy. One reason is that uniforms create a professional and consistent brand image for the company. For example, when customers see employees in a clean, standardized uniform, it builds trust and confidence. Furthermore, it can reduce conflicts among staff regarding appropriate work attire.",
        sample_answer_vi: "Tôi tin rằng việc yêu cầu đồng phục cho tất cả nhân viên là một chính sách có lợi. Một lý do là đồng phục tạo ra một hình ảnh thương hiệu chuyên nghiệp và nhất quán cho công ty. Ví dụ, khi khách hàng thấy nhân viên trong một bộ đồng phục sạch sẽ, được tiêu chuẩn hóa, điều đó xây dựng niềm tin và sự tự tin. Hơn nữa, nó có thể giảm thiểu xung đột giữa các nhân viên về trang phục công sở phù hợp.",
        sample_outline_en: `1. Introduction:\n   - State agreement: Requiring uniforms is beneficial.\n2. Body Paragraph 1:\n   - Main Point: Professional brand image.\n   - Example: Clean, standardized uniforms build customer trust.\n3. Body Paragraph 2:\n   - Main Point: Reduces workplace conflicts.\n   - Example: Eliminates issues with inappropriate attire.\n4. Conclusion:\n   - Summarize: Uniforms improve image and workplace harmony.\n   - Restate opinion.`,
        sample_outline_vi: `1. Mở bài:\n   - Nêu quan điểm đồng ý: Yêu cầu đồng phục là có lợi.\n2. Thân bài 1:\n   - Luận điểm: Tạo hình ảnh thương hiệu chuyên nghiệp.\n   - Ví dụ: Đồng phục sạch sẽ, chuẩn hóa xây dựng lòng tin của khách hàng.\n3. Thân bài 2:\n   - Luận điểm: Giảm xung đột nơi công sở.\n   - Ví dụ: Loại bỏ các vấn đề về trang phục không phù hợp.\n4. Kết bài:\n   - Tóm tắt: Đồng phục cải thiện hình ảnh và sự hòa hợp tại nơi làm việc.\n   - Khẳng định lại quan điểm.`,
         practice: {
            reorder: [{ words: [{en:"Uniforms", vi:"Đồng phục"}, {en:"create", vi:"tạo ra"}, {en:"a", vi:"một"}, {en:"professional", vi:"chuyên nghiệp"}, {en:"brand", vi:"thương hiệu"}, {en:"image.", vi:"hình ảnh."}], answer: "Uniforms create a professional brand image." }],
            fill_blank: [{ sentence: { en: "This policy is ____ for the company.", vi: "Chính sách này ____ cho công ty." }, missing_word: 'beneficial', options: ['good', 'beneficial', 'useful'] }]
        }
    }
};