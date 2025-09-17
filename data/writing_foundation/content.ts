import { FoundationTopic } from '../../types';

export const foundationContent: FoundationTopic[] = [
    // --- Level: Easy (Cơ Bản) ---
    // Category: Cấu trúc câu
    {
        id: 'FT-EASY-S-01',
        name_vi: 'Câu đơn (S-V-O)',
        name_en: 'Simple Sentence (S-V-O)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The marketing team developed a new strategy.',
        practice: {
            reorder: [{ words: [{ en: 'The team', vi: 'Đội' }, { en: 'developed', vi: 'đã phát triển' }, { en: 'a new strategy.', vi: 'một chiến lược mới.' }], answer: 'The team developed a new strategy.' }],
            fill_blank: [{ sentence: { en: 'She ____ a detailed report.', vi: 'Cô ấy ____ một báo cáo chi tiết.' }, missing_word: 'wrote', options: ['wrote', 'is', 'happy'] }]
        }
    },
    {
        id: 'FT-EASY-S-02',
        name_vi: 'Câu với "There is/are"',
        name_en: 'Sentences with "There is/are"',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'There is a meeting in the main conference room.',
        practice: {
            reorder: [{ words: [{ en: 'There is', vi: 'Có' }, { en: 'a meeting', vi: 'một cuộc họp' }, { en: 'in the conference room.', vi: 'trong phòng họp.' }], answer: 'There is a meeting in the conference room.' }],
            fill_blank: [{ sentence: { en: 'There ____ several issues to discuss.', vi: 'Có ____ vài vấn đề cần thảo luận.' }, missing_word: 'are', options: ['is', 'are', 'be'] }]
        }
    },
     {
        id: 'FT-EASY-S-03',
        name_vi: 'Câu với "be" + tính từ (S-V-C)',
        name_en: 'Sentence with "be" + Adjective (S-V-C)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The new design is very modern.',
        practice: {
            reorder: [{ words: [{ en: 'The design', vi: 'Thiết kế' }, { en: 'is', vi: 'thì' }, { en: 'very modern.', vi: 'rất hiện đại.' }], answer: 'The new design is very modern.' }],
            find_error: [{ sentence: { en: 'These products is popular.', vi: 'Những sản phẩm này thì phổ biến.' }, error_word: 'is', correct_word: 'are' }]
        }
    },
    // Category: Thì (Tenses)
    {
        id: 'FT-EASY-T-01',
        name_vi: 'Hiện tại đơn',
        name_en: 'Present Simple',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'Our company provides excellent customer service.',
        practice: {
            reorder: [{ words: [{ en: 'Our company', vi: 'Công ty chúng tôi' }, { en: 'provides', vi: 'cung cấp' }, { en: 'excellent service.', vi: 'dịch vụ xuất sắc.' }], answer: 'Our company provides excellent service.' }],
            find_error: [{ sentence: { en: 'He always finish his work on time.', vi: 'Anh ấy luôn hoàn thành công việc đúng giờ.' }, error_word: 'finish', correct_word: 'finishes' }]
        }
    },
    {
        id: 'FT-EASY-T-02',
        name_vi: 'Hiện tại tiếp diễn',
        name_en: 'Present Continuous',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'The team is currently working on a new project.',
        practice: {
            fill_blank: [{ sentence: { en: 'I am ____ a report for the manager.', vi: 'Tôi đang ____ một báo cáo cho quản lý.' }, missing_word: 'writing', options: ['write', 'writing', 'wrote'] }]
        }
    },
    {
        id: 'FT-EASY-T-03',
        name_vi: 'Quá khứ đơn',
        name_en: 'Past Simple',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'They attended the conference last week.',
        practice: {
            reorder: [{ words: [{ en: 'They attended', vi: 'Họ đã tham dự' }, { en: 'the conference', vi: 'hội nghị' }, { en: 'last week.', vi: 'tuần trước.' }], answer: 'They attended the conference last week.' }],
            fill_blank: [{ sentence: { en: 'We ____ the project last month.', vi: 'Chúng tôi ____ dự án vào tháng trước.' }, missing_word: 'completed', options: ['complete', 'completed', 'completes'] }]
        }
    },

    // --- Level: Medium (Trung Bình) ---
    // Category: Cấu trúc câu
    {
        id: 'FT-MED-S-01',
        name_vi: 'Mệnh đề quan hệ',
        name_en: 'Relative Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'The employee who received the award is very dedicated.',
        practice: {
            reorder: [{ words: [{ en: 'The employee', vi: 'Người nhân viên' }, { en: 'who received the award', vi: 'người đã nhận giải thưởng' }, { en: 'is very dedicated.', vi: 'rất tận tâm.' }], answer: 'The employee who received the award is very dedicated.' }],
            choose_phrase: [{ sentence: { en: 'This is the report ____ I submitted yesterday.', vi: 'Đây là báo cáo ____ tôi đã nộp hôm qua.' }, correct_phrase: 'that', options: ['who', 'that', 'whose'] }]
        }
    },
    {
        id: 'FT-MED-S-02',
        name_vi: 'Câu bị động',
        name_en: 'Passive Voice',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'The new software was installed by the IT department.',
        practice: {
            find_error: [{ sentence: { en: 'The email were sent this morning.', vi: 'Email đã được gửi sáng nay.' }, error_word: 'were', correct_word: 'was' }],
            drag_drop: [{ sentence_parts: [{ en: 'The report', vi: 'Báo cáo' }, { en: 'was written', vi: 'đã được viết' }, { en: 'by the manager.', vi: 'bởi quản lý.' }], correct_order: ['The report', 'was written', 'by the manager.']}]
        }
    },
    {
        id: 'FT-MED-S-03',
        name_vi: 'Câu ghép (FANBOYS)',
        name_en: 'Compound Sentences (FANBOYS)',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'She is very creative, so she was assigned to the design team.',
        practice: {
            choose_phrase: [{ sentence: { en: 'He worked hard, ____ he did not get the promotion.', vi: 'Anh ấy đã làm việc chăm chỉ, ____ anh ấy không được thăng chức.' }, correct_phrase: 'but', options: ['and', 'so', 'but'] }]
        }
    },
    // Category: Thì (Tenses)
    {
        id: 'FT-MED-T-01',
        name_vi: 'Hiện tại hoàn thành',
        name_en: 'Present Perfect',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'Our team has successfully completed the first phase of the project.',
        practice: {
            reorder: [{ words: [{ en: 'Our team has', vi: 'Đội của chúng tôi đã' }, { en: 'successfully completed', vi: 'hoàn thành thành công' }, { en: 'the first phase.', vi: 'giai đoạn đầu.' }], answer: 'Our team has successfully completed the first phase.' }],
            fill_blank: [{ sentence: { en: 'I have not seen the final version ____.', vi: 'Tôi vẫn chưa xem phiên bản cuối cùng ____.' }, missing_word: 'yet', options: ['already', 'just', 'yet'] }]
        }
    },
    {
        id: 'FT-MED-T-02',
        name_vi: 'Quá khứ tiếp diễn',
        name_en: 'Past Continuous',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'I was reviewing the documents when the client called.',
        practice: {
            choose_phrase: [{ sentence: { en: 'While she ____, her colleague prepared the slides.', vi: 'Trong khi cô ấy ____, đồng nghiệp của cô đã chuẩn bị slide.' }, correct_phrase: 'was writing the report', options: ['wrote the report', 'was writing the report', 'writes the report'] }]
        }
    },
    {
        id: 'FT-MED-T-03',
        name_vi: 'Tương lai đơn (will/be going to)',
        name_en: 'Future Simple (will/be going to)',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'I think the new policy will improve efficiency.',
        practice: {
            fill_blank: [{ sentence: { en: 'Look at the schedule! We ____ miss the deadline.', vi: 'Nhìn lịch trình kìa! Chúng ta ____ trễ hạn chót mất.' }, missing_word: 'are going to', options: ['will', 'are going to', 'will be'] }]
        }
    },

    // --- Level: Advanced (Nâng cao) ---
    // Category: Cấu trúc câu
    {
        id: 'FT-ADV-S-01',
        name_vi: 'Câu đảo ngữ',
        name_en: 'Inversion',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'Rarely have we seen such a rapid growth in sales.',
        practice: {
            reorder: [{ words: [{ en: 'Rarely have we seen', vi: 'Hiếm khi chúng tôi thấy' }, { en: 'such a rapid', vi: 'một sự tăng trưởng nhanh như vậy' }, { en: 'growth.', vi: '.' }], answer: 'Rarely have we seen such a rapid growth.' }],
            find_error: [{ sentence: { en: 'Not only he is a skilled negotiator, but he is also a great team leader.', vi: 'Anh ấy không chỉ là một nhà đàm phán giỏi mà còn là một trưởng nhóm tuyệt vời.' }, error_word: 'he is', correct_word: 'is he' }]
        }
    },
    {
        id: 'FT-ADV-S-02',
        name_vi: 'Câu điều kiện hỗn hợp',
        name_en: 'Mixed Conditionals',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'If the team had invested in better technology, they would not be facing these issues now.',
        practice: {
            drag_drop: [{ sentence_parts: [{ en: 'If I had taken your advice,', vi: 'Nếu tôi đã nghe lời khuyên của bạn,' }, { en: 'I would be', vi: 'thì bây giờ tôi đã' }, { en: 'in a better position now.', vi: 'ở một vị thế tốt hơn.' }], correct_order: ['If I had taken your advice,', 'I would be', 'in a better position now.']}]
        }
    },
    {
        id: 'FT-ADV-S-03',
        name_vi: 'Câu phức hợp',
        name_en: 'Compound-Complex Sentences',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'Although the market is challenging, our team has performed well, and we are optimistic about the future.',
        practice: {
            choose_phrase: [{ sentence: { en: '____ he was tired, he finished the report, ____ he sent it to the manager.', vi: '____ anh ấy mệt, anh ấy đã hoàn thành báo cáo, ____ anh ấy đã gửi nó cho quản lý.' }, correct_phrase: 'Although / and', options: ['Because / but', 'Although / and', 'If / so'] }]
        }
    },
    // Category: Thì (Tenses)
    {
        id: 'FT-ADV-T-01',
        name_vi: 'Quá khứ hoàn thành',
        name_en: 'Past Perfect',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'By the time the new CEO joined, the previous manager had already implemented the changes.',
        practice: {
            fill_blank: [{ sentence: { en: 'The team ____ on the project for months before it was cancelled.', vi: 'Đội đã ____ dự án trong nhiều tháng trước khi nó bị hủy.' }, missing_word: 'had worked', options: ['worked', 'has worked', 'had worked'] }]
        }
    },
    {
        id: 'FT-ADV-T-02',
        name_vi: 'Tương lai hoàn thành',
        name_en: 'Future Perfect',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'By the end of this quarter, we will have launched three new products.',
        practice: {
            drag_drop: [{ sentence_parts: [{ en: 'They will have finished', vi: 'Họ sẽ đã hoàn thành' }, { en: 'the construction', vi: 'việc xây dựng' }, { en: 'by next year.', vi: 'trước năm sau.' }], correct_order: ['They will have finished', 'the construction', 'by next year.']}]
        }
    }
];
