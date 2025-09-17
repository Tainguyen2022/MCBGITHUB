import { FoundationTopic } from '../types';

export const foundationTopics67: FoundationTopic[] = [
    // ===================
    // LEVEL: EASY (Cơ bản) - 25 topics
    // ===================
    
    // Category: Cấu trúc câu (8 topics)
    {
        id: 'FT-EASY-S-01',
        name_vi: 'Câu đơn (S-V-O)',
        name_en: 'Simple Sentence (S-V-O)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The marketing team developed a new strategy.',
        practice: {
            reorder: [
                { words: [{ en: 'The team', vi: 'Đội' }, { en: 'developed', vi: 'đã phát triển' }, { en: 'a new strategy.', vi: 'một chiến lược mới.' }], answer: 'The team developed a new strategy.' },
                { words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'wrote', vi: 'đã viết' }, { en: 'a detailed report.', vi: 'một báo cáo chi tiết.' }], answer: 'She wrote a detailed report.' }
            ],
            fill_blank: [
                { sentence: { en: 'She ____ a detailed report.', vi: 'Cô ấy ____ một báo cáo chi tiết.' }, missing_word: 'wrote', options: ['wrote', 'writes', 'writing', 'written'] }
            ]
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
            fill_blank: [
                { sentence: { en: 'There ____ several issues to discuss.', vi: 'Có ____ vài vấn đề cần thảo luận.' }, missing_word: 'are', options: ['is', 'are', 'be'] }
            ]
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
            find_error: [
                { sentence: { en: 'These products is popular.', vi: 'Những sản phẩm này thì phổ biến.' }, error_word: 'is', correct_word: 'are' }
            ]
        }
    },
    {
        id: 'FT-EASY-S-04',
        name_vi: 'Câu với "have/has"',
        name_en: 'Sentences with "have/has"',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The company has many talented employees.',
        practice: {
            fill_blank: [
                { sentence: { en: 'She ____ three years of experience.', vi: 'Cô ấy ____ ba năm kinh nghiệm.' }, missing_word: 'has', options: ['have', 'has', 'having'] }
            ]
        }
    },
    {
        id: 'FT-EASY-S-05',
        name_vi: 'Câu phủ định đơn giản',
        name_en: 'Simple Negative Sentences',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'He does not work on weekends.',
        practice: {
            find_error: [
                { sentence: { en: 'She do not like coffee.', vi: 'Cô ấy không thích cà phê.' }, error_word: 'do not', correct_word: 'does not' }
            ]
        }
    },
    {
        id: 'FT-EASY-S-06',
        name_vi: 'Câu hỏi Yes/No đơn giản',
        name_en: 'Simple Yes/No Questions',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'Do you work in the marketing department?',
        practice: {
            reorder: [
                { words: [{ en: 'Do you', vi: 'Bạn có' }, { en: 'work', vi: 'làm việc' }, { en: 'here?', vi: 'ở đây không?' }], answer: 'Do you work here?' }
            ]
        }
    },
    {
        id: 'FT-EASY-S-07',
        name_vi: 'Câu mệnh lệnh',
        name_en: 'Imperative Sentences',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'Please submit your report by Friday.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ the door when you leave.', vi: '____ cửa khi bạn đi.' }, missing_word: 'Close', options: ['Close', 'Closes', 'Closing'] }
            ]
        }
    },
    {
        id: 'FT-EASY-S-08',
        name_vi: 'Câu với "It is"',
        name_en: 'Sentences with "It is"',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'It is important to meet deadlines.',
        practice: {
            fill_blank: [
                { sentence: { en: 'It ____ necessary to check the data.', vi: '____ cần thiết để kiểm tra dữ liệu.' }, missing_word: 'is', options: ['is', 'are', 'be'] }
            ]
        }
    },

    // Category: Thì (Tenses) (6 topics)
    {
        id: 'FT-EASY-T-01',
        name_vi: 'Hiện tại đơn',
        name_en: 'Present Simple',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'Our company provides excellent customer service.',
        practice: {
            find_error: [
                { sentence: { en: 'He always finish his work on time.', vi: 'Anh ấy luôn hoàn thành công việc đúng giờ.' }, error_word: 'finish', correct_word: 'finishes' }
            ]
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
            fill_blank: [
                { sentence: { en: 'I am ____ a report for the manager.', vi: 'Tôi đang ____ một báo cáo cho quản lý.' }, missing_word: 'writing', options: ['write', 'writing', 'wrote'] }
            ]
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
            fill_blank: [
                { sentence: { en: 'We ____ the project last month.', vi: 'Chúng tôi ____ dự án vào tháng trước.' }, missing_word: 'completed', options: ['complete', 'completed', 'completes'] }
            ]
        }
    },
    {
        id: 'FT-EASY-T-04',
        name_vi: 'Tương lai đơn với "will"',
        name_en: 'Future Simple with "will"',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'We will launch the product next month.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The meeting ____ start at 9 AM.', vi: 'Cuộc họp ____ bắt đầu lúc 9 giờ sáng.' }, missing_word: 'will', options: ['will', 'is', 'was'] }
            ]
        }
    },
    {
        id: 'FT-EASY-T-05',
        name_vi: 'Tương lai gần với "be going to"',
        name_en: 'Near Future with "be going to"',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'She is going to present the results tomorrow.',
        practice: {
            reorder: [
                { words: [{ en: 'We are going to', vi: 'Chúng ta sẽ' }, { en: 'hire', vi: 'tuyển dụng' }, { en: 'new staff.', vi: 'nhân viên mới.' }], answer: 'We are going to hire new staff.' }
            ]
        }
    },
    {
        id: 'FT-EASY-T-06',
        name_vi: 'Quá khứ tiếp diễn cơ bản',
        name_en: 'Basic Past Continuous',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'I was working when you called.',
        practice: {
            fill_blank: [
                { sentence: { en: 'They ____ discussing the budget yesterday.', vi: 'Họ ____ thảo luận về ngân sách hôm qua.' }, missing_word: 'were', options: ['was', 'were', 'are'] }
            ]
        }
    },

    // Category: Từ vựng (4 topics)
    {
        id: 'FT-EASY-V-01',
        name_vi: 'Từ vựng văn phòng cơ bản',
        name_en: 'Basic Office Vocabulary',
        level: 'easy',
        category: 'Từ vựng',
        sentence: 'The manager reviewed the monthly report.',
        practice: {
            fill_blank: [
                { sentence: { en: 'Please send the ____ to all team members.', vi: 'Hãy gửi ____ cho tất cả thành viên nhóm.' }, missing_word: 'email', options: ['email', 'letter', 'message'] }
            ]
        }
    },
    {
        id: 'FT-EASY-V-02',
        name_vi: 'Động từ hành động cơ bản',
        name_en: 'Basic Action Verbs',
        level: 'easy',
        category: 'Từ vựng',
        sentence: 'She creates excellent presentations.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We need to ____ the data carefully.', vi: 'Chúng ta cần ____ dữ liệu cẩn thận.' }, missing_word: 'analyze', options: ['analyze', 'create', 'send'] }
            ]
        }
    },
    {
        id: 'FT-EASY-V-03',
        name_vi: 'Tính từ mô tả cơ bản',
        name_en: 'Basic Descriptive Adjectives',
        level: 'easy',
        category: 'Từ vựng',
        sentence: 'The new software is very efficient.',
        practice: {
            fill_blank: [
                { sentence: { en: 'This solution is quite ____.', vi: 'Giải pháp này khá ____.' }, missing_word: 'effective', options: ['effective', 'difficult', 'expensive'] }
            ]
        }
    },
    {
        id: 'FT-EASY-V-04',
        name_vi: 'Từ vựng thời gian',
        name_en: 'Time Vocabulary',
        level: 'easy',
        category: 'Từ vựng',
        sentence: 'The deadline is next Friday.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The meeting is scheduled for ____.', vi: 'Cuộc họp được lên lịch vào ____.' }, missing_word: 'tomorrow', options: ['tomorrow', 'yesterday', 'today'] }
            ]
        }
    },

    // Category: Giới từ (3 topics)
    {
        id: 'FT-EASY-P-01',
        name_vi: 'Giới từ thời gian (in, on, at)',
        name_en: 'Time Prepositions (in, on, at)',
        level: 'easy',
        category: 'Giới từ',
        sentence: 'The meeting is at 3 PM on Monday.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We work ____ the morning.', vi: 'Chúng tôi làm việc ____ buổi sáng.' }, missing_word: 'in', options: ['in', 'on', 'at'] }
            ]
        }
    },
    {
        id: 'FT-EASY-P-02',
        name_vi: 'Giới từ nơi chốn (in, on, at)',
        name_en: 'Place Prepositions (in, on, at)',
        level: 'easy',
        category: 'Giới từ',
        sentence: 'She works at the main office.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The files are ____ the desk.', vi: 'Các tập tin ở ____ bàn làm việc.' }, missing_word: 'on', options: ['in', 'on', 'at'] }
            ]
        }
    },
    {
        id: 'FT-EASY-P-03',
        name_vi: 'Giới từ chỉ hướng (to, from)',
        name_en: 'Direction Prepositions (to, from)',
        level: 'easy',
        category: 'Giới từ',
        sentence: 'He travels from home to the office.',
        practice: {
            fill_blank: [
                { sentence: { en: 'Please send this ____ the client.', vi: 'Hãy gửi cái này ____ khách hàng.' }, missing_word: 'to', options: ['to', 'from', 'at'] }
            ]
        }
    },

    // Category: Mạo từ (2 topics)
    {
        id: 'FT-EASY-A-01',
        name_vi: 'Mạo từ a/an',
        name_en: 'Articles a/an',
        level: 'easy',
        category: 'Mạo từ',
        sentence: 'She is an excellent manager.',
        practice: {
            fill_blank: [
                { sentence: { en: 'He has ____ important meeting today.', vi: 'Anh ấy có ____ cuộc họp quan trọng hôm nay.' }, missing_word: 'an', options: ['a', 'an', 'the'] }
            ]
        }
    },
    {
        id: 'FT-EASY-A-02',
        name_vi: 'Mạo từ "the"',
        name_en: 'Article "the"',
        level: 'easy',
        category: 'Mạo từ',
        sentence: 'The project was completed successfully.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ manager approved the budget.', vi: '____ quản lý đã phê duyệt ngân sách.' }, missing_word: 'The', options: ['A', 'An', 'The'] }
            ]
        }
    },

    // Category: Đại từ (2 topics)
    {
        id: 'FT-EASY-PR-01',
        name_vi: 'Đại từ nhân xưng (I, you, he, she)',
        name_en: 'Personal Pronouns (I, you, he, she)',
        level: 'easy',
        category: 'Đại từ',
        sentence: 'She completed the task, and he reviewed it.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ are working on the presentation.', vi: '____ đang làm việc trên bài thuyết trình.' }, missing_word: 'We', options: ['We', 'Us', 'Our'] }
            ]
        }
    },
    {
        id: 'FT-EASY-PR-02',
        name_vi: 'Đại từ sở hữu (my, your, his, her)',
        name_en: 'Possessive Pronouns (my, your, his, her)',
        level: 'easy',
        category: 'Đại từ',
        sentence: 'This is my office, and that is her desk.',
        practice: {
            fill_blank: [
                { sentence: { en: 'Where is ____ computer?', vi: '____ máy tính của bạn ở đâu?' }, missing_word: 'your', options: ['you', 'your', 'yours'] }
            ]
        }
    },

    // ===================
    // LEVEL: MEDIUM (Trung bình) - 22 topics  
    // ===================

    // Category: Cấu trúc câu (8 topics)
    {
        id: 'FT-MED-S-01',
        name_vi: 'Mệnh đề quan hệ',
        name_en: 'Relative Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'The employee who received the award is very dedicated.',
        practice: {
            fill_blank: [
                { sentence: { en: 'This is the report ____ I submitted yesterday.', vi: 'Đây là báo cáo ____ tôi đã nộp hôm qua.' }, missing_word: 'that', options: ['who', 'that', 'whose'] }
            ]
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
            find_error: [
                { sentence: { en: 'The email were sent this morning.', vi: 'Email đã được gửi sáng nay.' }, error_word: 'were', correct_word: 'was' }
            ]
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
            fill_blank: [
                { sentence: { en: 'He worked hard, ____ he did not get the promotion.', vi: 'Anh ấy đã làm việc chăm chỉ, ____ anh ấy không được thăng chức.' }, missing_word: 'but', options: ['and', 'so', 'but'] }
            ]
        }
    },
    {
        id: 'FT-MED-S-04',
        name_vi: 'Câu phức với liên từ phụ thuộc',
        name_en: 'Complex Sentences with Subordinating Conjunctions',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'Although the deadline is tight, we will complete the project.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ it was raining, they continued working.', vi: '____ trời mưa, họ vẫn tiếp tục làm việc.' }, missing_word: 'Although', options: ['Although', 'Because', 'If'] }
            ]
        }
    },
    {
        id: 'FT-MED-S-05',
        name_vi: 'Câu với gerund và infinitive',
        name_en: 'Sentences with Gerunds and Infinitives',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'She enjoys working with international clients.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We decided ____ the meeting.', vi: 'Chúng tôi quyết định ____ cuộc họp.' }, missing_word: 'to postpone', options: ['postponing', 'to postpone', 'postpone'] }
            ]
        }
    },
    {
        id: 'FT-MED-S-06',
        name_vi: 'Câu điều kiện loại 1',
        name_en: 'First Conditional',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'If we work hard, we will succeed.',
        practice: {
            fill_blank: [
                { sentence: { en: 'If the weather is good, we ____ have the meeting outdoors.', vi: 'Nếu thời tiết đẹp, chúng ta ____ họp ngoài trời.' }, missing_word: 'will', options: ['will', 'would', 'can'] }
            ]
        }
    },
    {
        id: 'FT-MED-S-07',
        name_vi: 'Câu với modal verbs',
        name_en: 'Sentences with Modal Verbs',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'You should review the document before signing.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We ____ finish this by tomorrow.', vi: 'Chúng ta ____ hoàn thành việc này trước ngày mai.' }, missing_word: 'must', options: ['must', 'can', 'may'] }
            ]
        }
    },
    {
        id: 'FT-MED-S-08',
        name_vi: 'Câu với cụm từ',
        name_en: 'Sentences with Phrases',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'In order to improve efficiency, we implemented new software.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ the meeting, please prepare your notes.', vi: '____ cuộc họp, hãy chuẩn bị ghi chú của bạn.' }, missing_word: 'Before', options: ['Before', 'After', 'During'] }
            ]
        }
    },

    // Category: Thì (Tenses) (6 topics)
    {
        id: 'FT-MED-T-01',
        name_vi: 'Hiện tại hoàn thành',
        name_en: 'Present Perfect',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'Our team has successfully completed the first phase.',
        practice: {
            fill_blank: [
                { sentence: { en: 'I have not seen the final version ____.', vi: 'Tôi vẫn chưa xem phiên bản cuối cùng ____.' }, missing_word: 'yet', options: ['already', 'just', 'yet'] }
            ]
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
            fill_blank: [
                { sentence: { en: 'While she ____, her colleague prepared the slides.', vi: 'Trong khi cô ấy ____, đồng nghiệp của cô đã chuẩn bị slide.' }, missing_word: 'was writing the report', options: ['wrote the report', 'was writing the report', 'writes the report'] }
            ]
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
            fill_blank: [
                { sentence: { en: 'Look at the schedule! We ____ miss the deadline.', vi: 'Nhìn lịch trình kìa! Chúng ta ____ trễ hạn chót mất.' }, missing_word: 'are going to', options: ['will', 'are going to', 'will be'] }
            ]
        }
    },
    {
        id: 'FT-MED-T-04',
        name_vi: 'Hiện tại hoàn thành tiếp diễn',
        name_en: 'Present Perfect Continuous',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'She has been working on this project for three months.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We ____ for the results since last week.', vi: 'Chúng tôi ____ kết quả từ tuần trước.' }, missing_word: 'have been waiting', options: ['have waited', 'have been waiting', 'are waiting'] }
            ]
        }
    },
    {
        id: 'FT-MED-T-05',
        name_vi: 'Quá khứ hoàn thành cơ bản',
        name_en: 'Basic Past Perfect',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'When I arrived, the meeting had already started.',
        practice: {
            fill_blank: [
                { sentence: { en: 'By the time we got there, they ____ left.', vi: 'Khi chúng tôi đến đó, họ ____ rời đi rồi.' }, missing_word: 'had already', options: ['already', 'had already', 'have already'] }
            ]
        }
    },
    {
        id: 'FT-MED-T-06',
        name_vi: 'Tương lai tiếp diễn',
        name_en: 'Future Continuous',
        level: 'medium',
        category: 'Thì (Tenses)',
        sentence: 'This time tomorrow, I will be presenting to the board.',
        practice: {
            fill_blank: [
                { sentence: { en: 'At 3 PM, we ____ the client meeting.', vi: 'Lúc 3 giờ chiều, chúng ta ____ cuộc họp với khách hàng.' }, missing_word: 'will be having', options: ['will have', 'will be having', 'are having'] }
            ]
        }
    },

    // Category: Từ vựng (3 topics)
    {
        id: 'FT-MED-V-01',
        name_vi: 'Từ vựng kinh doanh trung bình',
        name_en: 'Intermediate Business Vocabulary',
        level: 'medium',
        category: 'Từ vựng',
        sentence: 'The quarterly revenue exceeded our expectations.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We need to ____ our market share.', vi: 'Chúng ta cần ____ thị phần của mình.' }, missing_word: 'increase', options: ['increase', 'decrease', 'maintain'] }
            ]
        }
    },
    {
        id: 'FT-MED-V-02',
        name_vi: 'Phrasal verbs phổ biến',
        name_en: 'Common Phrasal Verbs',
        level: 'medium',
        category: 'Từ vựng',
        sentence: 'We need to look into this issue immediately.',
        practice: {
            fill_blank: [
                { sentence: { en: 'Please ____ the proposal before the meeting.', vi: 'Hãy ____ đề xuất trước cuộc họp.' }, missing_word: 'go over', options: ['go over', 'go out', 'go up'] }
            ]
        }
    },
    {
        id: 'FT-MED-V-03',
        name_vi: 'Collocations phổ biến',
        name_en: 'Common Collocations',
        level: 'medium',
        category: 'Từ vựng',
        sentence: 'We made a significant progress on the project.',
        practice: {
            find_error: [
                { sentence: { en: 'She did a mistake in the calculation.', vi: 'Cô ấy đã làm sai trong phép tính.' }, error_word: 'did a mistake', correct_word: 'made a mistake' }
            ]
        }
    },

    // Category: Giới từ (2 topics)
    {
        id: 'FT-MED-P-01',
        name_vi: 'Giới từ phức tạp (by, for, with)',
        name_en: 'Complex Prepositions (by, for, with)',
        level: 'medium',
        category: 'Giới từ',
        sentence: 'The report was prepared by the research team for the board.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We completed the task ____ working together.', vi: 'Chúng tôi hoàn thành nhiệm vụ ____ làm việc cùng nhau.' }, missing_word: 'by', options: ['by', 'for', 'with'] }
            ]
        }
    },
    {
        id: 'FT-MED-P-02',
        name_vi: 'Giới từ trong cụm từ cố định',
        name_en: 'Prepositions in Fixed Phrases',
        level: 'medium',
        category: 'Giới từ',
        sentence: 'She is interested in learning new technologies.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We are responsible ____ delivering quality results.', vi: 'Chúng tôi chịu trách nhiệm ____ cung cấp kết quả chất lượng.' }, missing_word: 'for', options: ['for', 'of', 'to'] }
            ]
        }
    },

    // Category: Tính từ & Trạng từ (2 topics)
    {
        id: 'FT-MED-ADJ-01',
        name_vi: 'So sánh tính từ',
        name_en: 'Comparative Adjectives',
        level: 'medium',
        category: 'Tính từ & Trạng từ',
        sentence: 'This solution is more effective than the previous one.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The new system is ____ than the old one.', vi: 'Hệ thống mới ____ hệ thống cũ.' }, missing_word: 'better', options: ['good', 'better', 'best'] }
            ]
        }
    },
    {
        id: 'FT-MED-ADJ-02',
        name_vi: 'Trạng từ tần suất và cách thức',
        name_en: 'Adverbs of Frequency and Manner',
        level: 'medium',
        category: 'Tính từ & Trạng từ',
        sentence: 'She always completes her tasks efficiently.',
        practice: {
            fill_blank: [
                { sentence: { en: 'He ____ arrives on time for meetings.', vi: 'Anh ấy ____ đến đúng giờ cho các cuộc họp.' }, missing_word: 'usually', options: ['usual', 'usually', 'use'] }
            ]
        }
    },

    // Category: Câu hỏi (1 topic)
    {
        id: 'FT-MED-Q-01',
        name_vi: 'Câu hỏi Wh- questions',
        name_en: 'Wh- Questions',
        level: 'medium',
        category: 'Câu hỏi',
        sentence: 'What time does the meeting start?',
        practice: {
            reorder: [
                { words: [{ en: 'When', vi: 'Khi nào' }, { en: 'will you', vi: 'bạn sẽ' }, { en: 'finish the project?', vi: 'hoàn thành dự án?' }], answer: 'When will you finish the project?' }
            ]
        }
    },

    // ===================
    // LEVEL: ADVANCED (Nâng cao) - 20 topics
    // ===================

    // Category: Cấu trúc câu (7 topics)
    {
        id: 'FT-ADV-S-01',
        name_vi: 'Câu đảo ngữ',
        name_en: 'Inversion',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'Rarely have we seen such a rapid growth in sales.',
        practice: {
            find_error: [
                { sentence: { en: 'Not only he is a skilled negotiator, but he is also a great team leader.', vi: 'Anh ấy không chỉ là một nhà đàm phán giỏi mà còn là một trưởng nhóm tuyệt vời.' }, error_word: 'he is', correct_word: 'is he' }
            ]
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
            fill_blank: [
                { sentence: { en: 'If I ____ about the meeting, I would be there now.', vi: 'Nếu tôi ____ về cuộc họp, tôi sẽ có mặt ở đó bây giờ.' }, missing_word: 'had known', options: ['had known', 'knew', 'know'] }
            ]
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
            fill_blank: [
                { sentence: { en: '____ he was tired, he finished the report, ____ he sent it to the manager.', vi: '____ anh ấy mệt, anh ấy đã hoàn thành báo cáo, ____ anh ấy đã gửi nó cho quản lý.' }, missing_word: 'Although / and', options: ['Because / but', 'Although / and', 'If / so'] }
            ]
        }
    },
    {
        id: 'FT-ADV-S-04',
        name_vi: 'Câu điều kiện loại 2 và 3',
        name_en: 'Second and Third Conditionals',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'If I were the manager, I would implement new policies.',
        practice: {
            fill_blank: [
                { sentence: { en: 'If they ____ harder, they would have succeeded.', vi: 'Nếu họ ____ chăm chỉ hơn, họ đã thành công rồi.' }, missing_word: 'had worked', options: ['worked', 'had worked', 'work'] }
            ]
        }
    },
    {
        id: 'FT-ADV-S-05',
        name_vi: 'Câu với subjunctive mood',
        name_en: 'Subjunctive Mood',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'I suggest that he be promoted to senior manager.',
        practice: {
            fill_blank: [
                { sentence: { en: 'It is important that she ____ on time.', vi: 'Điều quan trọng là cô ấy ____ đúng giờ.' }, missing_word: 'be', options: ['is', 'be', 'was'] }
            ]
        }
    },
    {
        id: 'FT-ADV-S-06',
        name_vi: 'Câu với cleft structures',
        name_en: 'Cleft Structures',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'What we need is better communication.',
        practice: {
            reorder: [
                { words: [{ en: 'What concerns me', vi: 'Điều làm tôi lo lắng' }, { en: 'is', vi: 'là' }, { en: 'the deadline.', vi: 'thời hạn.' }], answer: 'What concerns me is the deadline.' }
            ]
        }
    },
    {
        id: 'FT-ADV-S-07',
        name_vi: 'Câu với nominal clauses',
        name_en: 'Nominal Clauses',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'Whether we succeed depends on our teamwork.',
        practice: {
            fill_blank: [
                { sentence: { en: '____ he said was completely accurate.', vi: '____ anh ấy nói hoàn toàn chính xác.' }, missing_word: 'What', options: ['What', 'That', 'Which'] }
            ]
        }
    },

    // Category: Thì (Tenses) (4 topics)
    {
        id: 'FT-ADV-T-01',
        name_vi: 'Quá khứ hoàn thành',
        name_en: 'Past Perfect',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'By the time the new CEO joined, the previous manager had already implemented the changes.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The team ____ on the project for months before it was cancelled.', vi: 'Đội đã ____ dự án trong nhiều tháng trước khi nó bị hủy.' }, missing_word: 'had worked', options: ['worked', 'has worked', 'had worked'] }
            ]
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
            fill_blank: [
                { sentence: { en: 'By next month, we ____ the new system.', vi: 'Đến tháng tới, chúng ta ____ hệ thống mới.' }, missing_word: 'will have installed', options: ['will install', 'will have installed', 'install'] }
            ]
        }
    },
    {
        id: 'FT-ADV-T-03',
        name_vi: 'Quá khứ hoàn thành tiếp diễn',
        name_en: 'Past Perfect Continuous',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'She had been working there for five years before she got promoted.',
        practice: {
            fill_blank: [
                { sentence: { en: 'They ____ the issue for weeks before finding a solution.', vi: 'Họ ____ vấn đề này trong nhiều tuần trước khi tìm ra giải pháp.' }, missing_word: 'had been discussing', options: ['discussed', 'had discussed', 'had been discussing'] }
            ]
        }
    },
    {
        id: 'FT-ADV-T-04',
        name_vi: 'Tương lai hoàn thành tiếp diễn',
        name_en: 'Future Perfect Continuous',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'By December, I will have been working here for ten years.',
        practice: {
            fill_blank: [
                { sentence: { en: 'By the end of this year, we ____ this project for two years.', vi: 'Đến cuối năm nay, chúng ta ____ dự án này được hai năm.' }, missing_word: 'will have been developing', options: ['will develop', 'will have developed', 'will have been developing'] }
            ]
        }
    },

    // Category: Từ vựng (3 topics)
    {
        id: 'FT-ADV-V-01',
        name_vi: 'Từ vựng kinh doanh nâng cao',
        name_en: 'Advanced Business Vocabulary',
        level: 'advanced',
        category: 'Từ vựng',
        sentence: 'The company\'s strategic initiative yielded substantial returns.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We need to ____ our competitive advantage.', vi: 'Chúng ta cần ____ lợi thế cạnh tranh của mình.' }, missing_word: 'leverage', options: ['leverage', 'use', 'apply'] }
            ]
        }
    },
    {
        id: 'FT-ADV-V-02',
        name_vi: 'Phrasal verbs nâng cao',
        name_en: 'Advanced Phrasal Verbs',
        level: 'advanced',
        category: 'Từ vựng',
        sentence: 'The negotiations fell through due to disagreements.',
        practice: {
            fill_blank: [
                { sentence: { en: 'We need to ____ this opportunity before it\'s too late.', vi: 'Chúng ta cần ____ cơ hội này trước khi quá muộn.' }, missing_word: 'capitalize on', options: ['capitalize on', 'look into', 'put off'] }
            ]
        }
    },
    {
        id: 'FT-ADV-V-03',
        name_vi: 'Idioms trong kinh doanh',
        name_en: 'Business Idioms',
        level: 'advanced',
        category: 'Từ vựng',
        sentence: 'We need to think outside the box to solve this problem.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The project is finally ____.', vi: 'Dự án cuối cùng đã ____.' }, missing_word: 'on track', options: ['on track', 'off track', 'in track'] }
            ]
        }
    },

    // Category: Ngữ pháp nâng cao (3 topics)
    {
        id: 'FT-ADV-G-01',
        name_vi: 'Reported speech phức tạp',
        name_en: 'Complex Reported Speech',
        level: 'advanced',
        category: 'Ngữ pháp nâng cao',
        sentence: 'She said that she had been working on the proposal all week.',
        practice: {
            fill_blank: [
                { sentence: { en: 'He told me that he ____ the meeting the next day.', vi: 'Anh ấy nói với tôi rằng anh ấy ____ cuộc họp ngày hôm sau.' }, missing_word: 'would attend', options: ['will attend', 'would attend', 'attends'] }
            ]
        }
    },
    {
        id: 'FT-ADV-G-02',
        name_vi: 'Modal verbs nâng cao',
        name_en: 'Advanced Modal Verbs',
        level: 'advanced',
        category: 'Ngữ pháp nâng cao',
        sentence: 'You ought to have informed me about the changes.',
        practice: {
            fill_blank: [
                { sentence: { en: 'She ____ have completed the task by now.', vi: 'Cô ấy ____ đã hoàn thành nhiệm vụ rồi.' }, missing_word: 'should', options: ['should', 'could', 'would'] }
            ]
        }
    },
    {
        id: 'FT-ADV-G-03',
        name_vi: 'Câu với wish và if only',
        name_en: 'Wish and If Only Structures',
        level: 'advanced',
        category: 'Ngữ pháp nâng cao',
        sentence: 'I wish I had known about this opportunity earlier.',
        practice: {
            fill_blank: [
                { sentence: { en: 'If only we ____ more time for the project.', vi: 'Giá như chúng ta ____ nhiều thời gian hơn cho dự án.' }, missing_word: 'had', options: ['have', 'had', 'will have'] }
            ]
        }
    },

    // Category: Tính từ & Trạng từ (2 topics)
    {
        id: 'FT-ADV-ADJ-01',
        name_vi: 'So sánh nâng cao',
        name_en: 'Advanced Comparisons',
        level: 'advanced',
        category: 'Tính từ & Trạng từ',
        sentence: 'The more we invest in training, the better our results become.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The ____ we work, the ____ we achieve.', vi: '____ chúng ta làm việc, ____ chúng ta đạt được.' }, missing_word: 'harder / more', options: ['hard / much', 'harder / more', 'hardest / most'] }
            ]
        }
    },
    {
        id: 'FT-ADV-ADJ-02',
        name_vi: 'Cấu trúc với so/such',
        name_en: 'So/Such Structures',
        level: 'advanced',
        category: 'Tính từ & Trạng từ',
        sentence: 'It was such a successful project that we received recognition.',
        practice: {
            fill_blank: [
                { sentence: { en: 'The presentation was ____ good that everyone applauded.', vi: 'Bài thuyết trình ____ hay đến nỗi mọi người đều vỗ tay.' }, missing_word: 'so', options: ['so', 'such', 'very'] }
            ]
        }
    },

    // Category: Câu hỏi (1 topic)
    {
        id: 'FT-ADV-Q-01',
        name_vi: 'Câu hỏi gián tiếp và tag questions',
        name_en: 'Indirect Questions and Tag Questions',
        level: 'advanced',
        category: 'Câu hỏi',
        sentence: 'Could you tell me when the meeting will start?',
        practice: {
            fill_blank: [
                { sentence: { en: 'You\'ve finished the report, ____?', vi: 'Bạn đã hoàn thành báo cáo, ____?' }, missing_word: 'haven\'t you', options: ['haven\'t you', 'have you', 'don\'t you'] }
            ]
        }
    }
];
