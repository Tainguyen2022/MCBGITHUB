
import { Tip } from '../../types';

export const tips3to4: Tip[] = [
    {
        id: 3,
        title: 'Câu trả lời quá ngắn',
        situation: '📝 Bạn trả lời chỉ có một hoặc hai câu, không đủ để giám khảo đánh giá khả năng của bạn.',
        solution65: {
            en: 'Always extend your answer by adding a reason (because...) or an example (for example...).',
            vi: 'Luôn mở rộng câu trả lời bằng cách thêm lý do (because...) hoặc ví dụ (for example...).'
        },
        solution75: {
            en: 'Use sophisticated phrases to introduce reasons, examples, or an alternative viewpoint to logically and fully develop your point.',
            vi: 'Sử dụng các cụm từ tinh tế để giới thiệu lý do, ví dụ, hoặc một quan điểm khác để phát triển ý một cách logic và đầy đủ.'
        },
        examples65: [
            {
                phrase: { en: 'Answer + “because…”', vi: 'Trả lời + “bởi vì…”' },
                sampleSpeech: { en: 'Yes, I really enjoy reading, because it helps me to relax and learn new things.', vi: 'Có, tôi rất thích đọc sách, vì nó giúp tôi thư giãn và học hỏi những điều mới.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Do you like reading?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Yes, I really enjoy reading, <strong class="vocab-highlight-en">because</strong> it's a great way for me to unwind after a long day. For instance, getting lost in a good novel helps me forget about any stress from work or my studies."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn có thích đọc sách không?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Có, tôi thực sự thích đọc sách, <strong class="vocab-highlight-vi">bởi vì</strong> đó là một cách tuyệt vời để tôi thư giãn sau một ngày dài. Ví dụ, đắm chìm trong một cuốn tiểu thuyết hay giúp tôi quên đi mọi căng thẳng từ công việc hoặc học tập."` 
                }
            }
        ],
        examples75: [
            {
                phrase: { en: 'Answer + “The main reason for this is that…”', vi: 'Trả lời + “Lý do chính cho điều này là…”' },
                sampleSpeech: { en: 'Absolutely. The main reason for this is that it provides an escape from reality.', vi: 'Chắc chắn rồi. Lý do chính cho điều này là nó mang đến một lối thoát khỏi thực tại.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "Why do you think people enjoy watching films?"</b><br/><br/>
                         💬 <b>Candidate:</b> "From my perspective, people are drawn to films for a variety of reasons. However, I believe <strong class="vocab-highlight-en">the main reason for this is that</strong> cinema provides a powerful form of escapism. For a couple of hours, you can be completely immersed in a different world, which is a fantastic way to de-stress."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Tại sao bạn nghĩ mọi người thích xem phim?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Theo quan điểm của tôi, mọi người bị thu hút bởi phim ảnh vì nhiều lý do. Tuy nhiên, tôi tin rằng <strong class="vocab-highlight-vi">lý do chính cho điều này là</strong> điện ảnh cung cấp một hình thức thoát ly thực tại mạnh mẽ. Trong vài giờ, bạn có thể hoàn toàn đắm chìm trong một thế giới khác, đó là một cách tuyệt vời để giải tỏa căng thẳng."`
                }
            }
        ]
    },
    {
        id: 4,
        title: 'Ngữ pháp đơn điệu',
        situation: '⚙️ Bạn chỉ sử dụng các cấu trúc ngữ pháp cơ bản như thì hiện tại đơn hoặc quá khứ đơn, làm bài nói thiếu sự đa dạng.',
        solution65: {
            en: 'Try to use more complex tenses like the Present Perfect or conditionals (e.g., "If I have time, I will...").',
            vi: 'Cố gắng sử dụng các thì phức tạp hơn như Hiện tại Hoàn thành hoặc câu điều kiện (ví dụ: "Nếu tôi có thời gian, tôi sẽ...").'
        },
        solution75: {
            en: 'Actively use a variety of structures: complex sentences, conditionals, relative clauses, and the passive voice to demonstrate linguistic range.',
            vi: 'Chủ động sử dụng đa dạng cấu trúc: câu phức, câu điều kiện, mệnh đề quan hệ, và thể bị động để thể hiện khả năng ngôn ngữ.'
        },
        examples65: [
            {
                phrase: { en: 'Use Present Perfect for experiences: “I’ve never been there, but I’d love to go.”', vi: 'Dùng Hiện tại Hoàn thành cho trải nghiệm: “Tôi chưa bao giờ đến đó, nhưng tôi rất muốn đi.”' },
                sampleSpeech: { en: 'I’ve never been to Japan, but I’d love to go someday to experience the culture.', vi: 'Tôi chưa bao giờ đến Nhật Bản, nhưng tôi rất muốn đi một ngày nào đó để trải nghiệm văn hóa.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What foreign country would you like to visit?"</b><br/><br/>
                         💬 <b>Candidate:</b> "Well, <strong class="vocab-highlight-en">I've never been to</strong> Japan, but I'd love to go someday. I'm fascinated by its unique culture and the stunning natural landscapes I've seen in pictures."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn muốn đến thăm quốc gia nào?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "À, <strong class="vocab-highlight-vi">tôi chưa bao giờ đến</strong> Nhật Bản, nhưng tôi rất muốn đi một ngày nào đó. Tôi bị mê hoặc bởi nền văn hóa độc đáo và những cảnh quan thiên nhiên tuyệt đẹp mà tôi đã thấy trong ảnh."`
                }
            }
        ],
        examples75: [
            {
                phrase: { en: 'Use a relative clause: “...which is something that I really enjoy.”', vi: 'Dùng mệnh đề quan hệ: “...đó là điều mà tôi thực sự thích.”' },
                sampleSpeech: { en: 'I often go cycling in the park, which is something that helps me clear my head.', vi: 'Tôi thường đi đạp xe trong công viên, điều này giúp tôi giải tỏa đầu óc.' },
                fullSampleSpeech: { 
                    en: `🗣️ <b class="question-highlight">Examiner: "What do you do to relax?"</b><br/><br/>
                         💬 <b>Candidate:</b> "My favorite way to unwind is by going for a long cycle ride, <strong class="vocab-highlight-en">which is something that I find incredibly therapeutic</strong>. Being outdoors and focusing on the physical activity helps me to clear my head after a stressful week."`,
                    vi: `🗣️ <b class="question-highlight">Giám khảo: "Bạn làm gì để thư giãn?"</b><br/><br/>
                         💬 <b>Thí sinh:</b> "Cách thư giãn yêu thích của tôi là đi một chuyến xe đạp dài, <strong class="vocab-highlight-vi">đó là điều mà tôi thấy cực kỳ trị liệu</strong>. Ở ngoài trời và tập trung vào hoạt động thể chất giúp tôi giải tỏa đầu óc sau một tuần căng thẳng."`
                }
            }
        ]
    }
];
