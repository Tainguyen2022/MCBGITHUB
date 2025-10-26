import { WritingSeed } from '../../types';

type WritingSeedContent = Pick<WritingSeed, 'sample_answer_en' | 'sample_answer_vi' | 'sample_outline_en' | 'sample_outline_vi' | 'vocabulary' | 'practice'>;

export const vstepTask1Content: Record<string, WritingSeedContent> = {
    'VSTEP-T1-THX-01': {
        sample_answer_en: "Hi Linh,\n\nI just wanted to say thank you so much again for letting me stay with you last weekend. I had a wonderful time exploring the city with you!\n\nI really appreciate your hospitality. It was great catching up. Let me know when you're planning to visit my city so I can host you.\n\nBest,\n[Your Name]", 
        sample_answer_vi: "Chào Linh,\n\nMình chỉ muốn nói lời cảm ơn bạn một lần nữa vì đã cho mình ở lại cuối tuần trước. Mình đã có một khoảng thời gian tuyệt vời khi khám phá thành phố cùng bạn!\n\nMình thực sự trân trọng lòng hiếu khách của bạn. Thật tuyệt khi được hàn huyên. Hãy cho mình biết khi nào bạn định đến thăm thành phố của mình để mình có thể tiếp đãi bạn nhé.\n\nThân,\n[Tên của bạn]", 
        sample_outline_en: "1. Greeting: Start with an informal greeting (e.g., Hi Linh,).\n2. Main Point (Thanks): Clearly state the reason for writing - to say thank you.\n3. Specific Detail: Mention a specific positive memory (e.g., exploring the city).\n4. Express Gratitude: Use phrases like 'I really appreciate...'.\n5. Offer Reciprocation: Offer to host them in the future.\n6. Closing: End with an informal closing (e.g., Best, Cheers,).",
        sample_outline_vi: "1. Chào hỏi: Bắt đầu bằng một lời chào thân mật (ví dụ: Chào Linh,).\n2. Ý chính (Cảm ơn): Nêu rõ lý do viết thư - để cảm ơn.\n3. Chi tiết cụ thể: Đề cập đến một kỷ niệm tích cực cụ thể (ví dụ: khám phá thành phố).\n4. Bày tỏ lòng biết ơn: Sử dụng các cụm từ như 'Tôi thực sự trân trọng...'.\n5. Đề nghị đáp lại: Đề nghị được tiếp đãi họ trong tương lai.\n6. Kết thư: Kết thúc bằng một lời chào thân mật (ví dụ: Thân, Chúc sức khỏe,).",
        vocabulary: [
            { word: 'hospitality', ipa: '/ˌhɒspɪˈtæləti/', pos: 'n.', vi: 'lòng hiếu khách' },
            { word: 'appreciate', ipa: '/əˈpriːʃieɪt/', pos: 'v.', vi: 'trân trọng, đánh giá cao' },
            { word: 'catching up', ipa: '/ˈkætʃɪŋ ʌp/', pos: 'phr.', vi: 'hàn huyên, cập nhật tin tức' },
            { word: 'host', ipa: '/həʊst/', pos: 'v.', vi: 'tiếp đãi, làm chủ nhà' }
        ],
        practice: { 
            reorder: [{ words: [{en:"I", vi:"Mình"}, {en:"had", vi:"đã có"}, {en:"a", vi:"một"}, {en:"wonderful", vi:"tuyệt vời"}, {en:"time.", vi:"khoảng thời gian."}], answer: "I had a wonderful time." }],
            fill_blank: [{ sentence: { en: "I really ____ your hospitality.", vi: "Mình thực sự ____ lòng hiếu khách của bạn." }, missing_word: 'appreciate', options: ['appreciate', 'apply', 'approve'] }]
        } 
    },
    'VSTEP-T1-APL-01': {
        sample_answer_en: "Dear Professor Smith,\n\nI am writing to sincerely apologize for the late submission of my essay on World History. I understand the deadline was last Friday, and I take full responsibility for not meeting it.\n\nUnfortunately, I had an unexpected family emergency that required my immediate attention over the weekend. I have now completed the assignment and attached it to this email. I hope you will understand my situation and still consider my submission.\n\nSincerely,\n[Your Name]", 
        sample_answer_vi: "Kính gửi Giáo sư Smith,\n\nEm viết thư này để chân thành xin lỗi về việc nộp muộn bài luận Lịch sử Thế giới. Em hiểu rằng hạn chót là thứ Sáu tuần trước, và em hoàn toàn chịu trách nhiệm về việc không tuân thủ.\n\nThật không may, em đã có một việc gia đình đột xuất cần sự có mặt ngay lập tức của em vào cuối tuần. Hiện tại em đã hoàn thành bài tập và đính kèm trong email này. Em hy vọng thầy sẽ thông cảm cho hoàn cảnh của em và vẫn xem xét bài nộp của em.\n\nTrân trọng,\n[Tên của bạn]", 
        sample_outline_en: "1. Formal Salutation: Dear Professor [Last Name],\n2. State Purpose & Apologize: Clearly state you are writing to apologize for the late submission.\n3. Take Responsibility: Acknowledge the deadline and accept responsibility.\n4. Provide a Brief Reason: Briefly and honestly explain the reason (e.g., family emergency, illness).\n5. State Action Taken: Mention that the assignment is now complete and attached.\n6. Polite Request: Politely ask for understanding or consideration.\n7. Formal Closing: Sincerely, / Respectfully,",
        sample_outline_vi: "1. Chào hỏi trang trọng: Kính gửi Giáo sư [Họ],\n2. Nêu mục đích & Xin lỗi: Nêu rõ bạn viết thư để xin lỗi vì đã nộp bài muộn.\n3. Nhận trách nhiệm: Thừa nhận hạn chót và nhận trách nhiệm.\n4. Đưa ra lý do ngắn gọn: Giải thích lý do một cách ngắn gọn và trung thực (ví dụ: việc gia đình đột xuất, ốm).\n5. Nêu hành động đã thực hiện: Đề cập rằng bài tập hiện đã hoàn thành và được đính kèm.\n6. Yêu cầu lịch sự: Lịch sự mong được thông cảm hoặc xem xét.\n7. Kết thư trang trọng: Trân trọng, / Kính thư,",
        vocabulary: [
            { word: 'sincerely apologize', ipa: '/sɪnˈsɪəli əˈpɒlədʒaɪz/', pos: 'v. phr.', vi: 'chân thành xin lỗi' },
            { word: 'submission', ipa: '/səbˈmɪʃn/', pos: 'n.', vi: 'sự nộp bài' },
            { word: 'take full responsibility', ipa: '/teɪk fʊl rɪˌspɒnsəˈbɪləti/', pos: 'v. phr.', vi: 'chịu hoàn toàn trách nhiệm' },
            { word: 'unexpected', ipa: '/ˌʌnɪkˈspektɪd/', pos: 'adj.', vi: 'bất ngờ, đột xuất' }
        ],
        practice: { 
            reorder: [{ words: [{en:"I", vi:"Em"}, {en:"take", vi:"nhận"}, {en:"full", vi:"toàn bộ"}, {en:"responsibility.", vi:"trách nhiệm."}], answer: "I take full responsibility." }],
            find_error: [{ sentence: { en: 'I am writing to apologize of the delay.', vi: 'Em viết thư để xin lỗi về sự chậm trễ.' }, error_word: 'of', correct_word: 'for' }]
        } 
    },
    'VSTEP-T1-REQ-01': { /* Placeholder content */ },
    'VSTEP-T1-CMP-01': { /* Placeholder content */ },
    'VSTEP-T1-INV-01': { /* Placeholder content */ },
    'VSTEP-T1-ADV-01': { /* Placeholder content */ },
    'VSTEP-T1-APP-01': { /* Placeholder content */ }
};
