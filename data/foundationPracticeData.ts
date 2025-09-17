import { FoundationTopic } from '../types';

export const foundationPracticeData: FoundationTopic[] = [
    // ========================================
    // LEVEL CƠ BẢN (BASIC LEVEL) - SƠ CẤP
    // ========================================
    
    // --- CẤU TRÚC CÂU CƠ BẢN ---
    {
        id: 'FT-EASY-S-01',
        name_vi: 'Câu đơn SVO',
        name_en: 'Simple SVO Sentence',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The students study English every day.',
        practice: {
            reorder: [
                { words: [{ en: 'The team', vi: 'Đội' }, { en: 'developed', vi: 'đã phát triển' }, { en: 'a new strategy.', vi: 'một chiến lược mới.' }], answer: 'The team developed a new strategy.' },
                { words: [{ en: 'Students', vi: 'Sinh viên' }, { en: 'study', vi: 'học' }, { en: 'English grammar.', vi: 'ngữ pháp tiếng Anh.' }], answer: 'Students study English grammar.' },
                { words: [{ en: 'The company', vi: 'Công ty' }, { en: 'launched', vi: 'ra mắt' }, { en: 'a new product.', vi: 'sản phẩm mới.' }], answer: 'The company launched a new product.' }
            ],
            fill_blank: [
                { sentence: { en: 'She ____ a detailed report.', vi: 'Cô ấy ____ một báo cáo chi tiết.' }, missing_word: 'wrote', options: ['wrote', 'is writing', 'will write'] },
                { sentence: { en: 'The manager ____ the meeting yesterday.', vi: 'Quản lý ____ cuộc họp hôm qua.' }, missing_word: 'attended', options: ['attended', 'attends', 'will attend'] },
                { sentence: { en: 'We ____ our homework every day.', vi: 'Chúng tôi ____ bài tập về nhà mỗi ngày.' }, missing_word: 'do', options: ['do', 'did', 'will do'] }
            ],
            find_error: [
                { sentence: { en: 'The students studies hard for their exams.', vi: 'Các sinh viên học chăm chỉ cho kỳ thi.' }, error_word: 'studies', correct_word: 'study' },
                { sentence: { en: 'She write emails to her clients every morning.', vi: 'Cô ấy viết email cho khách hàng mỗi sáng.' }, error_word: 'write', correct_word: 'writes' }
            ],
            choose_phrase: [
                { sentence: { en: 'The teacher ____ the lesson clearly.', vi: 'Giáo viên ____ bài học một cách rõ ràng.' }, correct_phrase: 'explained', options: ['explained', 'explaining', 'explains'] },
                { sentence: { en: 'They ____ a new house last year.', vi: 'Họ ____ một ngôi nhà mới năm ngoái.' }, correct_phrase: 'bought', options: ['bought', 'buy', 'buying'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'subject', vi: 'chủ ngữ' },
                        { en: 'verb', vi: 'động từ' },
                        { en: 'object', vi: 'tân ngữ' },
                        { en: 'sentence', vi: 'câu' }
                    ],
                    col_b: [
                        { en: 'who or what does the action', vi: 'ai hoặc cái gì thực hiện hành động' },
                        { en: 'the action word', vi: 'từ chỉ hành động' },
                        { en: 'receives the action', vi: 'nhận hành động' },
                        { en: 'complete thought with subject and verb', vi: 'ý tưởng hoàn chỉnh có chủ ngữ và động từ' }
                    ],
                    correct_pairs: [
                        { key: 'subject', value: 'who or what does the action' },
                        { key: 'verb', value: 'the action word' },
                        { key: 'object', value: 'receives the action' },
                        { key: 'sentence', value: 'complete thought with subject and verb' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The students', vi: 'Các sinh viên' },
                        { en: 'completed', vi: 'hoàn thành' },
                        { en: 'their assignments', vi: 'bài tập của họ' },
                        { en: 'on time.', vi: 'đúng hạn.' }
                    ],
                    correct_order: ['The students', 'completed', 'their assignments', 'on time.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-S-02',
        name_vi: 'Câu SV (Nội động từ)',
        name_en: 'SV Sentence (Intransitive Verb)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The meeting ended at 5 PM.',
        practice: {
            reorder: [
                { words: [{ en: 'The meeting', vi: 'Cuộc họp' }, { en: 'ended', vi: 'kết thúc' }, { en: 'at 5 PM.', vi: 'lúc 5 giờ chiều.' }], answer: 'The meeting ended at 5 PM.' },
                { words: [{ en: 'The birds', vi: 'Những con chim' }, { en: 'sing', vi: 'hát' }, { en: 'beautifully.', vi: 'hay.' }], answer: 'The birds sing beautifully.' },
                { words: [{ en: 'Children', vi: 'Trẻ em' }, { en: 'play', vi: 'chơi' }, { en: 'in the park.', vi: 'trong công viên.' }], answer: 'Children play in the park.' }
            ],
            fill_blank: [
                { sentence: { en: 'The sun ____ brightly.', vi: 'Mặt trời ____ sáng chói.' }, missing_word: 'shines', options: ['shines', 'shine', 'shining'] },
                { sentence: { en: 'The baby ____ peacefully.', vi: 'Em bé ____ yên bình.' }, missing_word: 'sleeps', options: ['sleeps', 'sleep', 'sleeping'] },
                { sentence: { en: 'The flowers ____ in spring.', vi: 'Những bông hoa ____ vào mùa xuân.' }, missing_word: 'bloom', options: ['bloom', 'blooms', 'blooming'] }
            ],
            find_error: [
                { sentence: { en: 'The dog run fast in the yard.', vi: 'Con chó chạy nhanh trong sân.' }, error_word: 'run', correct_word: 'runs' },
                { sentence: { en: 'She arrive at school early every day.', vi: 'Cô ấy đến trường sớm mỗi ngày.' }, error_word: 'arrive', correct_word: 'arrives' }
            ],
            choose_phrase: [
                { sentence: { en: 'The train ____ at 9 AM.', vi: 'Chuyến tàu ____ lúc 9 giờ sáng.' }, correct_phrase: 'arrives', options: ['arrives', 'arrive', 'arriving'] },
                { sentence: { en: 'The students ____ quietly during the exam.', vi: 'Các sinh viên ____ yên lặng trong kỳ thi.' }, correct_phrase: 'work', options: ['work', 'works', 'working'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'intransitive verb', vi: 'nội động từ' },
                        { en: 'subject', vi: 'chủ ngữ' },
                        { en: 'adverb', vi: 'trạng từ' },
                        { en: 'complete', vi: 'hoàn chỉnh' }
                    ],
                    col_b: [
                        { en: 'verb that does not need an object', vi: 'động từ không cần tân ngữ' },
                        { en: 'who or what performs the action', vi: 'ai hoặc cái gì thực hiện hành động' },
                        { en: 'describes how the action is done', vi: 'mô tả cách thực hiện hành động' },
                        { en: 'having all necessary parts', vi: 'có tất cả các phần cần thiết' }
                    ],
                    correct_pairs: [
                        { key: 'intransitive verb', value: 'verb that does not need an object' },
                        { key: 'subject', value: 'who or what performs the action' },
                        { key: 'adverb', value: 'describes how the action is done' },
                        { key: 'complete', value: 'having all necessary parts' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The children', vi: 'Những đứa trẻ' },
                        { en: 'laughed', vi: 'cười' },
                        { en: 'happily', vi: 'vui vẻ' },
                        { en: 'together.', vi: 'cùng nhau.' }
                    ],
                    correct_order: ['The children', 'laughed', 'happily', 'together.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-S-03',
        name_vi: 'Câu SVC với be (Linking: be + Adj/N)',
        name_en: 'SVC with be (Linking: be + Adj/N)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The new design is very modern.',
        practice: {
            reorder: [
                { words: [{ en: 'The design', vi: 'Thiết kế' }, { en: 'is', vi: 'thì' }, { en: 'very modern.', vi: 'rất hiện đại.' }], answer: 'The new design is very modern.' },
                { words: [{ en: 'The meeting', vi: 'Cuộc họp' }, { en: 'was', vi: 'đã' }, { en: 'very productive.', vi: 'rất hiệu quả.' }], answer: 'The meeting was very productive.' },
                { words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'is', vi: 'là' }, { en: 'a talented designer.', vi: 'một nhà thiết kế tài năng.' }], answer: 'She is a talented designer.' }
            ],
            fill_blank: [
                { sentence: { en: 'The weather ____ beautiful today.', vi: 'Thời tiết ____ đẹp hôm nay.' }, missing_word: 'is', options: ['is', 'are', 'was'] },
                { sentence: { en: 'These books ____ very interesting.', vi: 'Những cuốn sách này ____ rất thú vị.' }, missing_word: 'are', options: ['are', 'is', 'were'] },
                { sentence: { en: 'The students ____ happy with their results.', vi: 'Các sinh viên ____ hài lòng với kết quả.' }, missing_word: 'are', options: ['are', 'is', 'was'] }
            ],
            find_error: [
                { sentence: { en: 'These products is popular.', vi: 'Những sản phẩm này thì phổ biến.' }, error_word: 'is', correct_word: 'are' },
                { sentence: { en: 'The team are very dedicated.', vi: 'Đội ngũ rất tận tâm.' }, error_word: 'are', correct_word: 'is' }
            ],
            choose_phrase: [
                { sentence: { en: 'The presentation ____ very informative.', vi: 'Bài thuyết trình ____ rất có tính thông tin.' }, correct_phrase: 'was', options: ['was', 'were', 'is'] },
                { sentence: { en: 'Our company ____ successful this year.', vi: 'Công ty chúng tôi ____ thành công năm nay.' }, correct_phrase: 'is', options: ['is', 'are', 'was'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'linking verb', vi: 'động từ nối' },
                        { en: 'be', vi: 'be' },
                        { en: 'adjective', vi: 'tính từ' },
                        { en: 'noun', vi: 'danh từ' }
                    ],
                    col_b: [
                        { en: 'connects subject to complement', vi: 'nối chủ ngữ với bổ ngữ' },
                        { en: 'most common linking verb', vi: 'động từ nối phổ biến nhất' },
                        { en: 'describes qualities', vi: 'mô tả tính chất' },
                        { en: 'names or identifies', vi: 'đặt tên hoặc xác định' }
                    ],
                    correct_pairs: [
                        { key: 'linking verb', value: 'connects subject to complement' },
                        { key: 'be', value: 'most common linking verb' },
                        { key: 'adjective', value: 'describes qualities' },
                        { key: 'noun', value: 'names or identifies' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The new policy', vi: 'Chính sách mới' },
                        { en: 'is', vi: 'là' },
                        { en: 'very effective', vi: 'rất hiệu quả' },
                        { en: 'and popular.', vi: 'và phổ biến.' }
                    ],
                    correct_order: ['The new policy', 'is', 'very effective', 'and popular.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-S-04',
        name_vi: 'Câu SVC với động từ nối (seem, become)',
        name_en: 'SVC with Linking Verbs (seem, become)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The project seems successful.',
        practice: {
            reorder: [
                { words: [{ en: 'The project', vi: 'Dự án' }, { en: 'seems', vi: 'có vẻ' }, { en: 'successful.', vi: 'thành công.' }], answer: 'The project seems successful.' },
                { words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'became', vi: 'trở thành' }, { en: 'a manager', vi: 'một quản lý' }, { en: 'last year.', vi: 'năm ngoái.' }], answer: 'She became a manager last year.' },
                { words: [{ en: 'The weather', vi: 'Thời tiết' }, { en: 'appears', vi: 'có vẻ' }, { en: 'to be', vi: 'sẽ' }, { en: 'improving.', vi: 'cải thiện.' }], answer: 'The weather appears to be improving.' }
            ],
            fill_blank: [
                { sentence: { en: 'She ____ tired after work.', vi: 'Cô ấy ____ mệt mỏi sau giờ làm.' }, missing_word: 'becomes', options: ['becomes', 'is', 'has'] },
                { sentence: { en: 'The situation ____ more complicated.', vi: 'Tình hình ____ phức tạp hơn.' }, missing_word: 'seems', options: ['seems', 'is', 'becomes'] },
                { sentence: { en: 'He ____ confident about the presentation.', vi: 'Anh ấy ____ tự tin về bài thuyết trình.' }, missing_word: 'appears', options: ['appears', 'seems', 'becomes'] }
            ],
            find_error: [
                { sentence: { en: 'The food smell delicious.', vi: 'Thức ăn có mùi thơm ngon.' }, error_word: 'smell', correct_word: 'smells' },
                { sentence: { en: 'She become tired after the long meeting.', vi: 'Cô ấy trở nên mệt mỏi sau cuộc họp dài.' }, error_word: 'become', correct_word: 'became' }
            ],
            choose_phrase: [
                { sentence: { en: 'The solution ____ effective for our problem.', vi: 'Giải pháp ____ hiệu quả cho vấn đề của chúng ta.' }, correct_phrase: 'seems', options: ['seems', 'looks', 'appears'] },
                { sentence: { en: 'The team ____ more confident after training.', vi: 'Đội ngũ ____ tự tin hơn sau đào tạo.' }, correct_phrase: 'became', options: ['became', 'seems', 'appears'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'seem', vi: 'có vẻ' },
                        { en: 'become', vi: 'trở thành' },
                        { en: 'appear', vi: 'xuất hiện/có vẻ' },
                        { en: 'linking verb', vi: 'động từ nối' }
                    ],
                    col_b: [
                        { en: 'gives impression', vi: 'tạo ấn tượng' },
                        { en: 'shows change of state', vi: 'thể hiện sự thay đổi trạng thái' },
                        { en: 'looks like or seems', vi: 'trông giống như hoặc có vẻ' },
                        { en: 'connects subject to description', vi: 'nối chủ ngữ với mô tả' }
                    ],
                    correct_pairs: [
                        { key: 'seem', value: 'gives impression' },
                        { key: 'become', value: 'shows change of state' },
                        { key: 'appear', value: 'looks like or seems' },
                        { key: 'linking verb', value: 'connects subject to description' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The proposal', vi: 'Đề xuất' },
                        { en: 'seems', vi: 'có vẻ' },
                        { en: 'quite reasonable', vi: 'khá hợp lý' },
                        { en: 'to everyone.', vi: 'với mọi người.' }
                    ],
                    correct_order: ['The proposal', 'seems', 'quite reasonable', 'to everyone.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-S-05',
        name_vi: 'Câu SVO (Ngoại Động Từ)',
        name_en: 'SVO Sentence (Transitive Verb)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'I wrote a comprehensive report.',
        practice: {
            reorder: [{ words: [{ en: 'I', vi: 'Tôi' }, { en: 'wrote', vi: 'đã viết' }, { en: 'a comprehensive report.', vi: 'một báo cáo toàn diện.' }], answer: 'I wrote a comprehensive report.' }],
            fill_blank: [{ sentence: { en: 'They ____ the meeting room.', vi: 'Họ ____ phòng họp.' }, missing_word: 'booked', options: ['booked', 'is', 'happy'] }]
        }
    },
    {
        id: 'FT-EASY-S-06',
        name_vi: 'Câu SVOO (2 bổ ngữ)',
        name_en: 'SVOO Sentence (Two Objects)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'She gave me the documents.',
        practice: {
            reorder: [{ words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'gave', vi: 'đã đưa' }, { en: 'me', vi: 'cho tôi' }, { en: 'the documents.', vi: 'các tài liệu.' }], answer: 'She gave me the documents.' }],
            fill_blank: [{ sentence: { en: 'He ____ us ____ information.', vi: 'Anh ấy ____ chúng tôi ____ thông tin.' }, missing_word: 'provided', options: ['provided', 'gave', 'told'] }]
        }
    },
    {
        id: 'FT-EASY-S-07',
        name_vi: 'Câu There is/There are (có)',
        name_en: 'There is/There are (Existence)',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'There is a meeting in the main conference room.',
        practice: {
            reorder: [{ words: [{ en: 'There is', vi: 'Có' }, { en: 'a meeting', vi: 'một cuộc họp' }, { en: 'in the conference room.', vi: 'trong phòng họp.' }], answer: 'There is a meeting in the conference room.' }],
            fill_blank: [{ sentence: { en: 'There ____ several issues to discuss.', vi: 'Có ____ vài vấn đề cần thảo luận.' }, missing_word: 'are', options: ['is', 'are', 'be'] }]
        }
    },
    {
        id: 'FT-EASY-S-08',
        name_vi: 'Câu sở hữu với have/has',
        name_en: 'Possession with have/has',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The company has excellent facilities.',
        practice: {
            reorder: [{ words: [{ en: 'The company', vi: 'Công ty' }, { en: 'has', vi: 'có' }, { en: 'excellent facilities.', vi: 'cơ sở vật chất tuyệt vời.' }], answer: 'The company has excellent facilities.' }],
            fill_blank: [{ sentence: { en: 'She ____ a lot of experience.', vi: 'Cô ấy ____ rất nhiều kinh nghiệm.' }, missing_word: 'has', options: ['has', 'have', 'is'] }]
        }
    },
    {
        id: 'FT-EASY-S-09',
        name_vi: 'Câu mệnh lệnh (Imperative)',
        name_en: 'Imperative Sentence',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'Please submit your report by Friday.',
        practice: {
            reorder: [{ words: [{ en: 'Please', vi: 'Vui lòng' }, { en: 'submit', vi: 'nộp' }, { en: 'your report', vi: 'báo cáo của bạn' }, { en: 'by Friday.', vi: 'trước thứ Sáu.' }], answer: 'Please submit your report by Friday.' }],
            fill_blank: [{ sentence: { en: '____ the door, please.', vi: '____ cửa, vui lòng.' }, missing_word: 'Close', options: ['Close', 'Opens', 'Is'] }]
        }
    },
    {
        id: 'FT-EASY-S-10',
        name_vi: 'Câu phủ định cơ bản',
        name_en: 'Basic Negative Sentence',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'I do not agree with this proposal.',
        practice: {
            reorder: [{ words: [{ en: 'I', vi: 'Tôi' }, { en: 'do not', vi: 'không' }, { en: 'agree', vi: 'đồng ý' }, { en: 'with this proposal.', vi: 'với đề xuất này.' }], answer: 'I do not agree with this proposal.' }],
            fill_blank: [{ sentence: { en: 'She ____ not ____ the meeting.', vi: 'Cô ấy ____ không ____ cuộc họp.' }, missing_word: 'did', options: ['did', 'does', 'is'] }]
        }
    },
    {
        id: 'FT-EASY-S-11',
        name_vi: 'Câu hỏi cơ bản',
        name_en: 'Basic Question',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'What time is the meeting?',
        practice: {
            reorder: [{ words: [{ en: 'What time', vi: 'Mấy giờ' }, { en: 'is', vi: 'thì' }, { en: 'the meeting?', vi: 'cuộc họp?' }], answer: 'What time is the meeting?' }],
            fill_blank: [{ sentence: { en: '____ did you arrive?', vi: '____ bạn đến?' }, missing_word: 'When', options: ['When', 'What', 'Where'] }]
        }
    },
    {
        id: 'FT-EASY-S-12',
        name_vi: 'Câu ghép cơ bản với and/but/or',
        name_en: 'Basic Compound Sentence with and/but/or',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'The project is successful, but it needs more funding.',
        practice: {
            reorder: [{ words: [{ en: 'The project', vi: 'Dự án' }, { en: 'is successful,', vi: 'thành công,' }, { en: 'but', vi: 'nhưng' }, { en: 'it needs more funding.', vi: 'nó cần thêm kinh phí.' }], answer: 'The project is successful, but it needs more funding.' }],
            fill_blank: [{ sentence: { en: 'I like the idea, ____ I have concerns.', vi: 'Tôi thích ý tưởng, ____ tôi có lo ngại.' }, missing_word: 'but', options: ['but', 'and', 'or'] }]
        }
    },
    {
        id: 'FT-EASY-S-13',
        name_vi: 'Câu mục đích với to-V cơ bản',
        name_en: 'Basic Purpose with to-V',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'I came here to discuss the project.',
        practice: {
            reorder: [
                { words: [{ en: 'I', vi: 'Tôi' }, { en: 'came here', vi: 'đến đây' }, { en: 'to discuss', vi: 'để thảo luận' }, { en: 'the project.', vi: 'dự án.' }], answer: 'I came here to discuss the project.' },
                { words: [{ en: 'She', vi: 'Cô ấy' }, { en: 'studies', vi: 'học' }, { en: 'to improve', vi: 'để cải thiện' }, { en: 'her skills.', vi: 'kỹ năng của mình.' }], answer: 'She studies to improve her skills.' },
                { words: [{ en: 'We', vi: 'Chúng tôi' }, { en: 'exercise', vi: 'tập thể dục' }, { en: 'to stay', vi: 'để giữ' }, { en: 'healthy.', vi: 'sức khỏe.' }], answer: 'We exercise to stay healthy.' }
            ],
            fill_blank: [
                { sentence: { en: 'She works hard ____ succeed.', vi: 'Cô ấy làm việc chăm chỉ ____ thành công.' }, missing_word: 'to', options: ['to', 'for', 'with'] },
                { sentence: { en: 'He went to the library ____ study.', vi: 'Anh ấy đến thư viện ____ học.' }, missing_word: 'to', options: ['to', 'for', 'in'] },
                { sentence: { en: 'They save money ____ buy a house.', vi: 'Họ tiết kiệm tiền ____ mua nhà.' }, missing_word: 'to', options: ['to', 'for', 'with'] }
            ],
            find_error: [
                { sentence: { en: 'I came here for discuss the project.', vi: 'Tôi đến đây để thảo luận dự án.' }, error_word: 'for', correct_word: 'to' },
                { sentence: { en: 'She studies hard for succeed in her exams.', vi: 'Cô ấy học chăm chỉ để thành công trong kỳ thi.' }, error_word: 'for', correct_word: 'to' }
            ],
            choose_phrase: [
                { sentence: { en: 'We came early ____ get good seats.', vi: 'Chúng tôi đến sớm ____ có chỗ ngồi tốt.' }, correct_phrase: 'to', options: ['to', 'for', 'in order'] },
                { sentence: { en: 'He practices daily ____ improve his performance.', vi: 'Anh ấy luyện tập hàng ngày ____ cải thiện hiệu suất.' }, correct_phrase: 'to', options: ['to', 'for', 'so'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'purpose', vi: 'mục đích' },
                        { en: 'infinitive', vi: 'nguyên mẫu' },
                        { en: 'intention', vi: 'ý định' },
                        { en: 'goal', vi: 'mục tiêu' }
                    ],
                    col_b: [
                        { en: 'reason for doing something', vi: 'lý do làm điều gì đó' },
                        { en: 'to + base verb', vi: 'to + động từ nguyên mẫu' },
                        { en: 'plan to do something', vi: 'kế hoạch làm điều gì đó' },
                        { en: 'what you want to achieve', vi: 'điều bạn muốn đạt được' }
                    ],
                    correct_pairs: [
                        { key: 'purpose', value: 'reason for doing something' },
                        { key: 'infinitive', value: 'to + base verb' },
                        { key: 'intention', value: 'plan to do something' },
                        { key: 'goal', value: 'what you want to achieve' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'They worked', vi: 'Họ làm việc' },
                        { en: 'overtime', vi: 'tăng ca' },
                        { en: 'to finish', vi: 'để hoàn thành' },
                        { en: 'the project.', vi: 'dự án.' }
                    ],
                    correct_order: ['They worked', 'overtime', 'to finish', 'the project.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-S-14',
        name_vi: 'Câu so sánh bằng as...as',
        name_en: 'Comparison with as...as',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'This solution is as effective as the previous one.',
        practice: {
            reorder: [{ words: [{ en: 'This solution', vi: 'Giải pháp này' }, { en: 'is as effective', vi: 'hiệu quả như' }, { en: 'as the previous one.', vi: 'như cái trước đó.' }], answer: 'This solution is as effective as the previous one.' }],
            fill_blank: [{ sentence: { en: 'She is ____ smart ____ her sister.', vi: 'Cô ấy ____ thông minh ____ chị gái.' }, missing_word: 'as', options: ['as', 'more', 'than'] }]
        }
    },
    {
        id: 'FT-EASY-S-15',
        name_vi: 'Câu liệt kê đơn giản',
        name_en: 'Simple Listing',
        level: 'easy',
        category: 'Cấu trúc câu',
        sentence: 'We need pens, papers, and computers.',
        practice: {
            reorder: [{ words: [{ en: 'We need', vi: 'Chúng tôi cần' }, { en: 'pens,', vi: 'bút,' }, { en: 'papers,', vi: 'giấy,' }, { en: 'and computers.', vi: 'và máy tính.' }], answer: 'We need pens, papers, and computers.' }],
            fill_blank: [{ sentence: { en: 'The team includes managers, developers, ____ designers.', vi: 'Đội ngũ bao gồm quản lý, lập trình viên, ____ nhà thiết kế.' }, missing_word: 'and', options: ['and', 'or', 'but'] }]
        }
    },
    
    // --- THÌ (TENSES) CƠ BẢN ---
    {
        id: 'FT-EASY-T-01',
        name_vi: 'Hiện tại đơn',
        name_en: 'Present Simple',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'Our company provides excellent customer service.',
        practice: {
            reorder: [
                { words: [{ en: 'Our company', vi: 'Công ty chúng tôi' }, { en: 'provides', vi: 'cung cấp' }, { en: 'excellent customer service.', vi: 'dịch vụ khách hàng tuyệt vời.' }], answer: 'Our company provides excellent customer service.' },
                { words: [{ en: 'Students', vi: 'Sinh viên' }, { en: 'study', vi: 'học' }, { en: 'English', vi: 'tiếng Anh' }, { en: 'every day.', vi: 'mỗi ngày.' }], answer: 'Students study English every day.' },
                { words: [{ en: 'The sun', vi: 'Mặt trời' }, { en: 'rises', vi: 'mọc' }, { en: 'in the east.', vi: 'ở phía đông.' }], answer: 'The sun rises in the east.' }
            ],
            fill_blank: [
                { sentence: { en: 'She ____ to work every day.', vi: 'Cô ấy ____ đi làm mỗi ngày.' }, missing_word: 'goes', options: ['goes', 'is going', 'went'] },
                { sentence: { en: 'Water ____ at 100 degrees Celsius.', vi: 'Nước ____ ở 100 độ C.' }, missing_word: 'boils', options: ['boils', 'boil', 'boiling'] },
                { sentence: { en: 'They ____ football every weekend.', vi: 'Họ ____ bóng đá mỗi cuối tuần.' }, missing_word: 'play', options: ['play', 'plays', 'playing'] }
            ],
            find_error: [
                { sentence: { en: 'She go to school by bus every morning.', vi: 'Cô ấy đi học bằng xe buýt mỗi sáng.' }, error_word: 'go', correct_word: 'goes' },
                { sentence: { en: 'The teacher explain the lesson clearly.', vi: 'Giáo viên giải thích bài học rõ ràng.' }, error_word: 'explain', correct_word: 'explains' }
            ],
            choose_phrase: [
                { sentence: { en: 'He ____ English very well.', vi: 'Anh ấy ____ tiếng Anh rất giỏi.' }, correct_phrase: 'speaks', options: ['speaks', 'speak', 'speaking'] },
                { sentence: { en: 'We ____ coffee every morning.', vi: 'Chúng tôi ____ cà phê mỗi sáng.' }, correct_phrase: 'drink', options: ['drink', 'drinks', 'drinking'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'present simple', vi: 'hiện tại đơn' },
                        { en: 'habit', vi: 'thói quen' },
                        { en: 'fact', vi: 'sự thật' },
                        { en: 'routine', vi: 'thói quen hàng ngày' }
                    ],
                    col_b: [
                        { en: 'tense for general truths and habits', vi: 'thì cho sự thật chung và thói quen' },
                        { en: 'something done regularly', vi: 'điều gì đó được làm thường xuyên' },
                        { en: 'something that is always true', vi: 'điều gì đó luôn đúng' },
                        { en: 'regular daily activities', vi: 'hoạt động hàng ngày thường xuyên' }
                    ],
                    correct_pairs: [
                        { key: 'present simple', value: 'tense for general truths and habits' },
                        { key: 'habit', value: 'something done regularly' },
                        { key: 'fact', value: 'something that is always true' },
                        { key: 'routine', value: 'regular daily activities' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'My sister', vi: 'Chị gái tôi' },
                        { en: 'works', vi: 'làm việc' },
                        { en: 'in a hospital', vi: 'ở bệnh viện' },
                        { en: 'every day.', vi: 'mỗi ngày.' }
                    ],
                    correct_order: ['My sister', 'works', 'in a hospital', 'every day.']
                }
            ]
        }
    },
    {
        id: 'FT-EASY-T-02',
        name_vi: 'Hiện tại tiếp diễn',
        name_en: 'Present Continuous',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'I am working on the project right now.',
        practice: {
            reorder: [{ words: [{ en: 'I', vi: 'Tôi' }, { en: 'am working', vi: 'đang làm việc' }, { en: 'on the project', vi: 'về dự án' }, { en: 'right now.', vi: 'ngay bây giờ.' }], answer: 'I am working on the project right now.' }],
            fill_blank: [{ sentence: { en: 'They ____ a meeting now.', vi: 'Họ ____ một cuộc họp bây giờ.' }, missing_word: 'are having', options: ['are having', 'have', 'had'] }]
        }
    },
    {
        id: 'FT-EASY-T-03',
        name_vi: 'Quá khứ đơn',
        name_en: 'Past Simple',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'We completed the project last month.',
        practice: {
            reorder: [{ words: [{ en: 'We', vi: 'Chúng tôi' }, { en: 'completed', vi: 'đã hoàn thành' }, { en: 'the project', vi: 'dự án' }, { en: 'last month.', vi: 'tháng trước.' }], answer: 'We completed the project last month.' }],
            fill_blank: [{ sentence: { en: 'She ____ the report yesterday.', vi: 'Cô ấy ____ báo cáo hôm qua.' }, missing_word: 'finished', options: ['finished', 'finishes', 'is finishing'] }]
        }
    },
    {
        id: 'FT-EASY-T-04',
        name_vi: 'Tương lai đơn - will',
        name_en: 'Future Simple - will',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'I will send you the report tomorrow.',
        practice: {
            reorder: [{ words: [{ en: 'I', vi: 'Tôi' }, { en: 'will send', vi: 'sẽ gửi' }, { en: 'you the report', vi: 'bạn báo cáo' }, { en: 'tomorrow.', vi: 'ngày mai.' }], answer: 'I will send you the report tomorrow.' }],
            fill_blank: [{ sentence: { en: 'We ____ the meeting next week.', vi: 'Chúng tôi ____ cuộc họp tuần tới.' }, missing_word: 'will have', options: ['will have', 'have', 'had'] }]
        }
    },
    {
        id: 'FT-EASY-T-05',
        name_vi: 'Tương lai gần - be going to',
        name_en: 'Near Future - be going to',
        level: 'easy',
        category: 'Thì (Tenses)',
        sentence: 'We are going to launch the product next month.',
        practice: {
            reorder: [{ words: [{ en: 'We', vi: 'Chúng tôi' }, { en: 'are going to', vi: 'sẽ' }, { en: 'launch', vi: 'ra mắt' }, { en: 'the product next month.', vi: 'sản phẩm tháng tới.' }], answer: 'We are going to launch the product next month.' }],
            fill_blank: [{ sentence: { en: 'She ____ to attend the conference.', vi: 'Cô ấy ____ tham dự hội nghị.' }, missing_word: 'is going', options: ['is going', 'will go', 'goes'] }]
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

    // ========================================
    // LEVEL TRUNG BÌNH (INTERMEDIATE LEVEL)
    // ========================================
    
    // --- CẤU TRÚC CÂU TRUNG BÌNH ---
    {
        id: 'FT-MED-S-01',
        name_vi: 'Câu ghép với liên từ tương liên',
        name_en: 'Compound Sentences with Correlative Conjunctions',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'Both the manager and the employees are satisfied with the new policy.',
        practice: {
            reorder: [
                { words: [{ en: 'Both the manager', vi: 'Cả quản lý' }, { en: 'and the employees', vi: 'và nhân viên' }, { en: 'are satisfied', vi: 'đều hài lòng' }, { en: 'with the policy.', vi: 'với chính sách.' }], answer: 'Both the manager and the employees are satisfied with the policy.' },
                { words: [{ en: 'Either you', vi: 'Hoặc bạn' }, { en: 'or I', vi: 'hoặc tôi' }, { en: 'will attend', vi: 'sẽ tham dự' }, { en: 'the meeting.', vi: 'cuộc họp.' }], answer: 'Either you or I will attend the meeting.' },
                { words: [{ en: 'Neither the students', vi: 'Cả sinh viên' }, { en: 'nor the teacher', vi: 'lẫn giáo viên' }, { en: 'were prepared', vi: 'đều không chuẩn bị' }, { en: 'for the exam.', vi: 'cho kỳ thi.' }], answer: 'Neither the students nor the teacher were prepared for the exam.' }
            ],
            fill_blank: [
                { sentence: { en: 'Not only ____ she intelligent, but she is also hardworking.', vi: 'Không chỉ ____ thông minh mà cô ấy còn chăm chỉ.' }, missing_word: 'is', options: ['is', 'was', 'are'] },
                { sentence: { en: '____ the presentation was informative ____ it was engaging.', vi: '____ bài thuyết trình có tính thông tin ____ nó còn hấp dẫn.' }, missing_word: 'Both', options: ['Both', 'Either', 'Neither'] },
                { sentence: { en: 'She can ____ speak English ____ write it fluently.', vi: 'Cô ấy có thể ____ nói tiếng Anh ____ viết nó một cách trôi chảy.' }, missing_word: 'both', options: ['both', 'either', 'neither'] }
            ],
            find_error: [
                { sentence: { en: 'Both my brother or my sister will help me.', vi: 'Cả anh trai hoặc chị gái tôi sẽ giúp tôi.' }, error_word: 'or', correct_word: 'and' },
                { sentence: { en: 'Either John and Mary will come to the party.', vi: 'Hoặc John và Mary sẽ đến bữa tiệc.' }, error_word: 'and', correct_word: 'or' }
            ],
            choose_phrase: [
                { sentence: { en: '____ the weather is good ____ we will go hiking.', vi: '____ thời tiết tốt ____ chúng ta sẽ đi bộ đường dài.' }, correct_phrase: 'If', options: ['If', 'Both', 'Either'] },
                { sentence: { en: 'She is ____ talented ____ experienced.', vi: 'Cô ấy ____ tài năng ____ có kinh nghiệm.' }, correct_phrase: 'both', options: ['both', 'either', 'neither'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'both...and', vi: 'cả...và' },
                        { en: 'either...or', vi: 'hoặc...hoặc' },
                        { en: 'neither...nor', vi: 'không...cũng không' },
                        { en: 'not only...but also', vi: 'không chỉ...mà còn' }
                    ],
                    col_b: [
                        { en: 'includes two things', vi: 'bao gồm hai thứ' },
                        { en: 'choice between two options', vi: 'lựa chọn giữa hai phương án' },
                        { en: 'excludes both things', vi: 'loại trừ cả hai thứ' },
                        { en: 'adds emphasis to second part', vi: 'nhấn mạnh phần thứ hai' }
                    ],
                    correct_pairs: [
                        { key: 'both...and', value: 'includes two things' },
                        { key: 'either...or', value: 'choice between two options' },
                        { key: 'neither...nor', value: 'excludes both things' },
                        { key: 'not only...but also', value: 'adds emphasis to second part' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Not only', vi: 'Không chỉ' },
                        { en: 'did she pass', vi: 'cô ấy đậu' },
                        { en: 'but she also', vi: 'mà cô ấy còn' },
                        { en: 'got the highest score.', vi: 'đạt điểm cao nhất.' }
                    ],
                    correct_order: ['Not only', 'did she pass', 'but she also', 'got the highest score.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-02',
        name_vi: 'Câu phức với mệnh đề danh từ',
        name_en: 'Complex Sentences with Noun Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'What she said during the meeting was very important.',
        practice: {
            reorder: [
                { words: [{ en: 'What she said', vi: 'Điều cô ấy nói' }, { en: 'during the meeting', vi: 'trong cuộc họp' }, { en: 'was very', vi: 'rất' }, { en: 'important.', vi: 'quan trọng.' }], answer: 'What she said during the meeting was very important.' },
                { words: [{ en: 'I believe', vi: 'Tôi tin' }, { en: 'that this project', vi: 'rằng dự án này' }, { en: 'will succeed.', vi: 'sẽ thành công.' }], answer: 'I believe that this project will succeed.' },
                { words: [{ en: 'Whether we go', vi: 'Liệu chúng ta có đi' }, { en: 'or stay', vi: 'hay ở lại' }, { en: 'depends on', vi: 'phụ thuộc vào' }, { en: 'the weather.', vi: 'thời tiết.' }], answer: 'Whether we go or stay depends on the weather.' }
            ],
            fill_blank: [
                { sentence: { en: 'I know ____ you are feeling right now.', vi: 'Tôi biết ____ bạn đang cảm thấy bây giờ.' }, missing_word: 'how', options: ['how', 'what', 'that'] },
                { sentence: { en: '____ he will arrive is still uncertain.', vi: '____ anh ấy sẽ đến vẫn còn không chắc chắn.' }, missing_word: 'When', options: ['When', 'That', 'What'] },
                { sentence: { en: 'The question is ____ we can finish on time.', vi: 'Câu hỏi là ____ chúng ta có thể hoàn thành đúng hạn.' }, missing_word: 'whether', options: ['whether', 'that', 'what'] }
            ],
            find_error: [
                { sentence: { en: 'I wonder that she will come to the party.', vi: 'Tôi tự hỏi liệu cô ấy có đến bữa tiệc.' }, error_word: 'that', correct_word: 'whether' },
                { sentence: { en: 'What does he want it is unclear.', vi: 'Anh ấy muốn gì thì không rõ.' }, error_word: 'it', correct_word: 'is' }
            ],
            choose_phrase: [
                { sentence: { en: 'I understand ____ you are concerned.', vi: 'Tôi hiểu ____ bạn lo lắng.' }, correct_phrase: 'why', options: ['why', 'that', 'what'] },
                { sentence: { en: '____ matters most is your safety.', vi: '____ quan trọng nhất là sự an toàn của bạn.' }, correct_phrase: 'What', options: ['What', 'That', 'Which'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'noun clause', vi: 'mệnh đề danh từ' },
                        { en: 'subject clause', vi: 'mệnh đề chủ ngữ' },
                        { en: 'object clause', vi: 'mệnh đề tân ngữ' },
                        { en: 'complement clause', vi: 'mệnh đề bổ ngữ' }
                    ],
                    col_b: [
                        { en: 'acts as a noun in sentence', vi: 'đóng vai trò như danh từ trong câu' },
                        { en: 'functions as subject', vi: 'hoạt động như chủ ngữ' },
                        { en: 'functions as object', vi: 'hoạt động như tân ngữ' },
                        { en: 'completes the meaning', vi: 'hoàn thành ý nghĩa' }
                    ],
                    correct_pairs: [
                        { key: 'noun clause', value: 'acts as a noun in sentence' },
                        { key: 'subject clause', value: 'functions as subject' },
                        { key: 'object clause', value: 'functions as object' },
                        { key: 'complement clause', value: 'completes the meaning' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'That she won', vi: 'Việc cô ấy thắng' },
                        { en: 'the competition', vi: 'cuộc thi' },
                        { en: 'surprised', vi: 'làm ngạc nhiên' },
                        { en: 'everyone.', vi: 'mọi người.' }
                    ],
                    correct_order: ['That she won', 'the competition', 'surprised', 'everyone.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-03',
        name_vi: 'Câu phức với mệnh đề quan hệ',
        name_en: 'Complex Sentences with Relative Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'The employee who received the award is very dedicated.',
        practice: {
            reorder: [
                { words: [{ en: 'The employee', vi: 'Người nhân viên' }, { en: 'who received the award', vi: 'người đã nhận giải thưởng' }, { en: 'is very dedicated.', vi: 'rất tận tâm.' }], answer: 'The employee who received the award is very dedicated.' },
                { words: [{ en: 'The book', vi: 'Cuốn sách' }, { en: 'which you recommended', vi: 'mà bạn giới thiệu' }, { en: 'was excellent.', vi: 'rất tuyệt vời.' }], answer: 'The book which you recommended was excellent.' },
                { words: [{ en: 'The woman', vi: 'Người phụ nữ' }, { en: 'whose car', vi: 'mà xe của bà ấy' }, { en: 'was stolen', vi: 'bị đánh cắp' }, { en: 'called the police.', vi: 'đã gọi cảnh sát.' }], answer: 'The woman whose car was stolen called the police.' }
            ],
            fill_blank: [
                { sentence: { en: 'This is the report ____ I submitted yesterday.', vi: 'Đây là báo cáo ____ tôi đã nộp hôm qua.' }, missing_word: 'that', options: ['who', 'that', 'whose'] },
                { sentence: { en: 'The person ____ you met is my colleague.', vi: 'Người ____ bạn gặp là đồng nghiệp của tôi.' }, missing_word: 'whom', options: ['whom', 'which', 'whose'] },
                { sentence: { en: 'The company ____ products are popular is expanding.', vi: 'Công ty ____ sản phẩm nổi tiếng đang mở rộng.' }, missing_word: 'whose', options: ['whose', 'which', 'that'] }
            ],
            find_error: [
                { sentence: { en: 'The man which lives next door is a doctor.', vi: 'Người đàn ông sống bên cạnh là bác sĩ.' }, error_word: 'which', correct_word: 'who' },
                { sentence: { en: 'The car who I bought is very reliable.', vi: 'Chiếc xe tôi mua rất đáng tin cậy.' }, error_word: 'who', correct_word: 'that' }
            ],
            choose_phrase: [
                { sentence: { en: 'The student ____ won the scholarship is very smart.', vi: 'Học sinh ____ thắng học bổng rất thông minh.' }, correct_phrase: 'who', options: ['who', 'which', 'whose'] },
                { sentence: { en: 'The house ____ roof was damaged needs repair.', vi: 'Ngôi nhà ____ mái bị hư hỏng cần sửa chữa.' }, correct_phrase: 'whose', options: ['whose', 'which', 'that'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'who', vi: 'người mà' },
                        { en: 'which', vi: 'cái mà' },
                        { en: 'that', vi: 'mà' },
                        { en: 'whose', vi: 'của người mà' }
                    ],
                    col_b: [
                        { en: 'refers to people as subject/object', vi: 'chỉ người làm chủ ngữ/tân ngữ' },
                        { en: 'refers to things', vi: 'chỉ vật' },
                        { en: 'refers to people or things', vi: 'chỉ người hoặc vật' },
                        { en: 'shows possession', vi: 'thể hiện sở hữu' }
                    ],
                    correct_pairs: [
                        { key: 'who', value: 'refers to people as subject/object' },
                        { key: 'which', value: 'refers to things' },
                        { key: 'that', value: 'refers to people or things' },
                        { key: 'whose', value: 'shows possession' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The project', vi: 'Dự án' },
                        { en: 'that we completed', vi: 'mà chúng tôi hoàn thành' },
                        { en: 'last month', vi: 'tháng trước' },
                        { en: 'was successful.', vi: 'đã thành công.' }
                    ],
                    correct_order: ['The project', 'that we completed', 'last month', 'was successful.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-04',
        name_vi: 'Câu phức với mệnh đề trạng ngữ thời gian',
        name_en: 'Complex Sentences with Time Adverbial Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'When the meeting ended, everyone felt satisfied with the results.',
        practice: {
            reorder: [
                { words: [{ en: 'When the meeting ended,', vi: 'Khi cuộc họp kết thúc,' }, { en: 'everyone felt', vi: 'mọi người cảm thấy' }, { en: 'satisfied', vi: 'hài lòng' }, { en: 'with the results.', vi: 'với kết quả.' }], answer: 'When the meeting ended, everyone felt satisfied with the results.' },
                { words: [{ en: 'Before she left,', vi: 'Trước khi cô ấy rời đi,' }, { en: 'she completed', vi: 'cô ấy đã hoàn thành' }, { en: 'all her tasks.', vi: 'tất cả nhiệm vụ.' }], answer: 'Before she left, she completed all her tasks.' },
                { words: [{ en: 'After we finished', vi: 'Sau khi chúng tôi hoàn thành' }, { en: 'the project,', vi: 'dự án,' }, { en: 'we celebrated', vi: 'chúng tôi ăn mừng' }, { en: 'the success.', vi: 'thành công.' }], answer: 'After we finished the project, we celebrated the success.' }
            ],
            fill_blank: [
                { sentence: { en: '____ the presentation starts, please turn off your phones.', vi: '____ bài thuyết trình bắt đầu, vui lòng tắt điện thoại.' }, missing_word: 'Before', options: ['Before', 'After', 'During'] },
                { sentence: { en: 'We will discuss the budget ____ the meeting ends.', vi: 'Chúng ta sẽ thảo luận ngân sách ____ cuộc họp kết thúc.' }, missing_word: 'after', options: ['after', 'before', 'while'] },
                { sentence: { en: '____ she was studying, her phone kept ringing.', vi: '____ cô ấy đang học, điện thoại cứ reo.' }, missing_word: 'While', options: ['While', 'When', 'Before'] }
            ],
            find_error: [
                { sentence: { en: 'When the project will be completed, we will celebrate.', vi: 'Khi dự án sẽ được hoàn thành, chúng ta sẽ ăn mừng.' }, error_word: 'will be', correct_word: 'is' },
                { sentence: { en: 'Before you will leave, please submit your report.', vi: 'Trước khi bạn sẽ rời đi, vui lòng nộp báo cáo.' }, error_word: 'will leave', correct_word: 'leave' }
            ],
            choose_phrase: [
                { sentence: { en: '____ it started raining, we went inside.', vi: '____ trời bắt đầu mưa, chúng tôi vào trong.' }, correct_phrase: 'As soon as', options: ['As soon as', 'Before', 'Until'] },
                { sentence: { en: 'I will wait ____ you finish your work.', vi: 'Tôi sẽ đợi ____ bạn hoàn thành công việc.' }, correct_phrase: 'until', options: ['until', 'before', 'after'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'when', vi: 'khi' },
                        { en: 'before', vi: 'trước khi' },
                        { en: 'after', vi: 'sau khi' },
                        { en: 'while', vi: 'trong khi' }
                    ],
                    col_b: [
                        { en: 'at the time that', vi: 'vào thời điểm mà' },
                        { en: 'earlier than', vi: 'sớm hơn' },
                        { en: 'later than', vi: 'muộn hơn' },
                        { en: 'during the time that', vi: 'trong thời gian mà' }
                    ],
                    correct_pairs: [
                        { key: 'when', value: 'at the time that' },
                        { key: 'before', value: 'earlier than' },
                        { key: 'after', value: 'later than' },
                        { key: 'while', value: 'during the time that' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'As soon as', vi: 'Ngay khi' },
                        { en: 'the alarm rang,', vi: 'chuông báo thức reo,' },
                        { en: 'everyone evacuated', vi: 'mọi người sơ tán' },
                        { en: 'the building.', vi: 'tòa nhà.' }
                    ],
                    correct_order: ['As soon as', 'the alarm rang,', 'everyone evacuated', 'the building.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-05',
        name_vi: 'Câu phức với mệnh đề nguyên nhân',
        name_en: 'Complex Sentences with Causal Clauses',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'Because the weather was bad, we postponed the outdoor event.',
        practice: {
            reorder: [
                { words: [{ en: 'Because the weather', vi: 'Vì thời tiết' }, { en: 'was bad,', vi: 'xấu,' }, { en: 'we postponed', vi: 'chúng tôi hoãn' }, { en: 'the outdoor event.', vi: 'sự kiện ngoài trời.' }], answer: 'Because the weather was bad, we postponed the outdoor event.' },
                { words: [{ en: 'Since she has', vi: 'Vì cô ấy có' }, { en: 'experience,', vi: 'kinh nghiệm,' }, { en: 'she was chosen', vi: 'cô ấy được chọn' }, { en: 'for the position.', vi: 'cho vị trí này.' }], answer: 'Since she has experience, she was chosen for the position.' },
                { words: [{ en: 'As the deadline', vi: 'Vì thời hạn' }, { en: 'is approaching,', vi: 'đang đến gần,' }, { en: 'we need to', vi: 'chúng ta cần' }, { en: 'work faster.', vi: 'làm việc nhanh hơn.' }], answer: 'As the deadline is approaching, we need to work faster.' }
            ],
            fill_blank: [
                { sentence: { en: '____ it was raining, we stayed indoors.', vi: '____ trời mưa, chúng tôi ở trong nhà.' }, missing_word: 'Because', options: ['Because', 'Although', 'If'] },
                { sentence: { en: '____ he was tired, he continued working.', vi: '____ anh ấy mệt, anh ấy tiếp tục làm việc.' }, missing_word: 'Since', options: ['Since', 'Although', 'Unless'] },
                { sentence: { en: 'The meeting was cancelled ____ the presenter was sick.', vi: 'Cuộc họp bị hủy ____ người thuyết trình bị ốm.' }, missing_word: 'because', options: ['because', 'although', 'unless'] }
            ],
            find_error: [
                { sentence: { en: 'Because of he was late, the meeting was delayed.', vi: 'Vì anh ấy đến muộn, cuộc họp bị trễ.' }, error_word: 'Because of', correct_word: 'Because' },
                { sentence: { en: 'Since that she is experienced, she got the job.', vi: 'Vì cô ấy có kinh nghiệm, cô ấy có được việc.' }, error_word: 'Since that', correct_word: 'Since' }
            ],
            choose_phrase: [
                { sentence: { en: '____ the traffic was heavy, we arrived late.', vi: '____ giao thông đông đúc, chúng tôi đến muộn.' }, correct_phrase: 'Due to the fact that', options: ['Due to the fact that', 'Due to', 'Because of'] },
                { sentence: { en: 'The project failed ____ poor planning.', vi: 'Dự án thất bại ____ kế hoạch kém.' }, correct_phrase: 'because of', options: ['because of', 'because', 'since'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'because', vi: 'vì' },
                        { en: 'since', vi: 'vì/từ khi' },
                        { en: 'as', vi: 'vì/khi' },
                        { en: 'due to', vi: 'do/vì' }
                    ],
                    col_b: [
                        { en: 'direct cause and effect', vi: 'nguyên nhân và kết quả trực tiếp' },
                        { en: 'known reason', vi: 'lý do đã biết' },
                        { en: 'simultaneous reason', vi: 'lý do đồng thời' },
                        { en: 'followed by noun phrase', vi: 'theo sau bởi cụm danh từ' }
                    ],
                    correct_pairs: [
                        { key: 'because', value: 'direct cause and effect' },
                        { key: 'since', value: 'known reason' },
                        { key: 'as', value: 'simultaneous reason' },
                        { key: 'due to', value: 'followed by noun phrase' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Due to', vi: 'Do' },
                        { en: 'the heavy rain,', vi: 'mưa lớn,' },
                        { en: 'the event', vi: 'sự kiện' },
                        { en: 'was cancelled.', vi: 'đã bị hủy.' }
                    ],
                    correct_order: ['Due to', 'the heavy rain,', 'the event', 'was cancelled.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-06',
        name_vi: 'Câu mục đích (so that)',
        name_en: 'Purpose Clauses (so that)',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'We arrived early so that we could get good seats.',
        practice: {
            reorder: [
                { words: [{ en: 'We arrived early', vi: 'Chúng tôi đến sớm' }, { en: 'so that', vi: 'để mà' }, { en: 'we could get', vi: 'chúng tôi có thể có' }, { en: 'good seats.', vi: 'chỗ ngồi tốt.' }], answer: 'We arrived early so that we could get good seats.' },
                { words: [{ en: 'She speaks slowly', vi: 'Cô ấy nói chậm' }, { en: 'so that', vi: 'để mà' }, { en: 'everyone can', vi: 'mọi người có thể' }, { en: 'understand.', vi: 'hiểu.' }], answer: 'She speaks slowly so that everyone can understand.' },
                { words: [{ en: 'They saved money', vi: 'Họ tiết kiệm tiền' }, { en: 'so that', vi: 'để mà' }, { en: 'they could buy', vi: 'họ có thể mua' }, { en: 'a new house.', vi: 'một ngôi nhà mới.' }], answer: 'They saved money so that they could buy a new house.' }
            ],
            fill_blank: [
                { sentence: { en: 'He studied hard ____ he could pass the exam.', vi: 'Anh ấy học chăm chỉ ____ anh ấy có thể đậu kỳ thi.' }, missing_word: 'so that', options: ['so that', 'because', 'although'] },
                { sentence: { en: 'We left early ____ we would not be late.', vi: 'Chúng tôi rời đi sớm ____ chúng tôi sẽ không muộn.' }, missing_word: 'so that', options: ['so that', 'because', 'when'] },
                { sentence: { en: 'She wrote notes ____ she could remember the important points.', vi: 'Cô ấy ghi chú ____ cô ấy có thể nhớ những điểm quan trọng.' }, missing_word: 'so that', options: ['so that', 'because', 'since'] }
            ],
            find_error: [
                { sentence: { en: 'We arrived early so we could get good seats.', vi: 'Chúng tôi đến sớm để có thể có chỗ ngồi tốt.' }, error_word: 'so', correct_word: 'so that' },
                { sentence: { en: 'She speaks slowly so that everyone will understand.', vi: 'Cô ấy nói chậm để mọi người sẽ hiểu.' }, error_word: 'will', correct_word: 'can' }
            ],
            choose_phrase: [
                { sentence: { en: 'They worked overtime ____ finish the project on time.', vi: 'Họ làm thêm giờ ____ hoàn thành dự án đúng hạn.' }, correct_phrase: 'so that they could', options: ['so that they could', 'so they could', 'in order to'] },
                { sentence: { en: 'I explained the process clearly ____ avoid confusion.', vi: 'Tôi giải thích quy trình rõ ràng ____ tránh nhầm lẫn.' }, correct_phrase: 'so that we could', options: ['so that we could', 'so we could', 'to'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'so that', vi: 'để mà' },
                        { en: 'in order that', vi: 'để cho' },
                        { en: 'purpose clause', vi: 'mệnh đề mục đích' },
                        { en: 'modal verb', vi: 'động từ khuyết thiếu' }
                    ],
                    col_b: [
                        { en: 'expresses purpose or intention', vi: 'thể hiện mục đích hoặc ý định' },
                        { en: 'formal purpose conjunction', vi: 'liên từ mục đích trang trọng' },
                        { en: 'explains why action is done', vi: 'giải thích tại sao hành động được thực hiện' },
                        { en: 'often follows so that', vi: 'thường theo sau so that' }
                    ],
                    correct_pairs: [
                        { key: 'so that', value: 'expresses purpose or intention' },
                        { key: 'in order that', value: 'formal purpose conjunction' },
                        { key: 'purpose clause', value: 'explains why action is done' },
                        { key: 'modal verb', value: 'often follows so that' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The company', vi: 'Công ty' },
                        { en: 'invested in training', vi: 'đầu tư vào đào tạo' },
                        { en: 'so that employees', vi: 'để mà nhân viên' },
                        { en: 'could improve their skills.', vi: 'có thể cải thiện kỹ năng.' }
                    ],
                    correct_order: ['The company', 'invested in training', 'so that employees', 'could improve their skills.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-07',
        name_vi: 'Câu kết quả (so...that)',
        name_en: 'Result Clauses (so...that)',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'The presentation was so engaging that everyone stayed until the end.',
        practice: {
            reorder: [
                { words: [{ en: 'The presentation', vi: 'Bài thuyết trình' }, { en: 'was so engaging', vi: 'hấp dẫn đến nỗi' }, { en: 'that everyone', vi: 'mà mọi người' }, { en: 'stayed until the end.', vi: 'ở lại đến cuối.' }], answer: 'The presentation was so engaging that everyone stayed until the end.' },
                { words: [{ en: 'The project', vi: 'Dự án' }, { en: 'was so complex', vi: 'phức tạp đến nỗi' }, { en: 'that it required', vi: 'mà nó cần' }, { en: 'extra resources.', vi: 'thêm tài nguyên.' }], answer: 'The project was so complex that it required extra resources.' },
                { words: [{ en: 'She worked', vi: 'Cô ấy làm việc' }, { en: 'so efficiently', vi: 'hiệu quả đến nỗi' }, { en: 'that she finished', vi: 'mà cô ấy hoàn thành' }, { en: 'ahead of schedule.', vi: 'trước thời hạn.' }], answer: 'She worked so efficiently that she finished ahead of schedule.' }
            ],
            fill_blank: [
                { sentence: { en: 'The music was ____ loud that we could not concentrate.', vi: 'Nhạc ____ to mà chúng tôi không thể tập trung.' }, missing_word: 'so', options: ['so', 'such', 'very'] },
                { sentence: { en: 'It was ____ a difficult exam that many students failed.', vi: 'Đó là một kỳ thi ____ khó mà nhiều sinh viên trượt.' }, missing_word: 'such', options: ['such', 'so', 'very'] },
                { sentence: { en: 'The weather was so bad ____ the flight was cancelled.', vi: 'Thời tiết xấu đến nỗi ____ chuyến bay bị hủy.' }, missing_word: 'that', options: ['that', 'so', 'because'] }
            ],
            find_error: [
                { sentence: { en: 'The exam was so difficult so many students failed.', vi: 'Kỳ thi khó đến nỗi nhiều sinh viên trượt.' }, error_word: 'so many', correct_word: 'that many' },
                { sentence: { en: 'It was such difficult that we could not solve it.', vi: 'Nó khó đến nỗi chúng tôi không thể giải quyết.' }, error_word: 'such difficult', correct_word: 'so difficult' }
            ],
            choose_phrase: [
                { sentence: { en: 'The noise was ____ loud that we could not sleep.', vi: 'Tiếng ồn ____ to mà chúng tôi không thể ngủ.' }, correct_phrase: 'so', options: ['so', 'such', 'very'] },
                { sentence: { en: 'It was ____ an interesting book that I read it twice.', vi: 'Đó là một cuốn sách ____ thú vị mà tôi đọc hai lần.' }, correct_phrase: 'such', options: ['such', 'so', 'very'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'so + adjective/adverb', vi: 'so + tính từ/trạng từ' },
                        { en: 'such + noun phrase', vi: 'such + cụm danh từ' },
                        { en: 'result clause', vi: 'mệnh đề kết quả' },
                        { en: 'consequence', vi: 'hậu quả' }
                    ],
                    col_b: [
                        { en: 'emphasizes degree or manner', vi: 'nhấn mạnh mức độ hoặc cách thức' },
                        { en: 'emphasizes noun and its qualities', vi: 'nhấn mạnh danh từ và tính chất của nó' },
                        { en: 'shows the outcome', vi: 'thể hiện kết quả' },
                        { en: 'what happens as a result', vi: 'điều gì xảy ra như một kết quả' }
                    ],
                    correct_pairs: [
                        { key: 'so + adjective/adverb', value: 'emphasizes degree or manner' },
                        { key: 'such + noun phrase', value: 'emphasizes noun and its qualities' },
                        { key: 'result clause', value: 'shows the outcome' },
                        { key: 'consequence', value: 'what happens as a result' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'The traffic', vi: 'Giao thông' },
                        { en: 'was so heavy', vi: 'đông đúc đến nỗi' },
                        { en: 'that we were', vi: 'mà chúng tôi' },
                        { en: 'two hours late.', vi: 'muộn hai tiếng.' }
                    ],
                    correct_order: ['The traffic', 'was so heavy', 'that we were', 'two hours late.']
                }
            ]
        }
    },
    {
        id: 'FT-MED-S-08',
        name_vi: 'Câu nhượng bộ (although)',
        name_en: 'Concessive Clauses (although)',
        level: 'medium',
        category: 'Cấu trúc câu',
        sentence: 'Although the project was challenging, we completed it successfully.',
        practice: {
            reorder: [
                { words: [{ en: 'Although the project', vi: 'Mặc dù dự án' }, { en: 'was challenging,', vi: 'thách thức,' }, { en: 'we completed it', vi: 'chúng tôi hoàn thành nó' }, { en: 'successfully.', vi: 'thành công.' }], answer: 'Although the project was challenging, we completed it successfully.' },
                { words: [{ en: 'Even though', vi: 'Mặc dù' }, { en: 'she was tired,', vi: 'cô ấy mệt,' }, { en: 'she continued', vi: 'cô ấy tiếp tục' }, { en: 'working.', vi: 'làm việc.' }], answer: 'Even though she was tired, she continued working.' },
                { words: [{ en: 'Despite the fact that', vi: 'Bất chấp việc' }, { en: 'it was raining,', vi: 'trời mưa,' }, { en: 'the event', vi: 'sự kiện' }, { en: 'continued.', vi: 'tiếp tục.' }], answer: 'Despite the fact that it was raining, the event continued.' }
            ],
            fill_blank: [
                { sentence: { en: '____ it was expensive, we decided to buy it.', vi: '____ nó đắt, chúng tôi quyết định mua nó.' }, missing_word: 'Although', options: ['Although', 'Because', 'If'] },
                { sentence: { en: '____ the weather was bad, we went hiking.', vi: '____ thời tiết xấu, chúng tôi vẫn đi bộ đường dài.' }, missing_word: 'Even though', options: ['Even though', 'Because', 'Since'] },
                { sentence: { en: 'The team succeeded ____ facing many obstacles.', vi: 'Đội ngũ thành công ____ đối mặt với nhiều trở ngại.' }, missing_word: 'despite', options: ['despite', 'because of', 'due to'] }
            ],
            find_error: [
                { sentence: { en: 'Although he was tired, but he continued working.', vi: 'Mặc dù anh ấy mệt, nhưng anh ấy tiếp tục làm việc.' }, error_word: 'but', correct_word: '' },
                { sentence: { en: 'Despite of the rain, we went out.', vi: 'Bất chấp mưa, chúng tôi ra ngoài.' }, error_word: 'Despite of', correct_word: 'Despite' }
            ],
            choose_phrase: [
                { sentence: { en: '____ being tired, she finished her work.', vi: '____ mệt mỏi, cô ấy hoàn thành công việc.' }, correct_phrase: 'Despite', options: ['Despite', 'Although', 'Because of'] },
                { sentence: { en: '____ the difficulties, they never gave up.', vi: '____ khó khăn, họ không bao giờ từ bỏ.' }, correct_phrase: 'In spite of', options: ['In spite of', 'Although', 'Because of'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'although', vi: 'mặc dù' },
                        { en: 'even though', vi: 'dù cho' },
                        { en: 'despite', vi: 'bất chấp' },
                        { en: 'in spite of', vi: 'bất chấp' }
                    ],
                    col_b: [
                        { en: 'introduces contrasting clause', vi: 'giới thiệu mệnh đề tương phản' },
                        { en: 'stronger form of although', vi: 'dạng mạnh hơn của although' },
                        { en: 'followed by noun/gerund', vi: 'theo sau bởi danh từ/gerund' },
                        { en: 'formal version of despite', vi: 'phiên bản trang trọng của despite' }
                    ],
                    correct_pairs: [
                        { key: 'although', value: 'introduces contrasting clause' },
                        { key: 'even though', value: 'stronger form of although' },
                        { key: 'despite', value: 'followed by noun/gerund' },
                        { key: 'in spite of', value: 'formal version of despite' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Although the budget', vi: 'Mặc dù ngân sách' },
                        { en: 'was limited,', vi: 'hạn chế,' },
                        { en: 'we achieved', vi: 'chúng tôi đạt được' },
                        { en: 'excellent results.', vi: 'kết quả xuất sắc.' }
                    ],
                    correct_order: ['Although the budget', 'was limited,', 'we achieved', 'excellent results.']
                }
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
            reorder: [
                { words: [{ en: 'Rarely have we seen', vi: 'Hiếm khi chúng tôi thấy' }, { en: 'such a rapid', vi: 'một sự tăng trưởng nhanh như vậy' }, { en: 'growth.', vi: '.' }], answer: 'Rarely have we seen such a rapid growth.' },
                { words: [{ en: 'Never before', vi: 'Chưa bao giờ trước đây' }, { en: 'has the company', vi: 'công ty' }, { en: 'achieved', vi: 'đạt được' }, { en: 'such success.', vi: 'thành công như vậy.' }], answer: 'Never before has the company achieved such success.' },
                { words: [{ en: 'Seldom do', vi: 'Hiếm khi' }, { en: 'we encounter', vi: 'chúng ta gặp' }, { en: 'such dedicated', vi: 'những nhân viên' }, { en: 'employees.', vi: 'tận tâm như vậy.' }], answer: 'Seldom do we encounter such dedicated employees.' }
            ],
            fill_blank: [
                { sentence: { en: 'Under no circumstances ____ you reveal confidential information.', vi: 'Trong mọi trường hợp ____ bạn tiết lộ thông tin bí mật.' }, missing_word: 'should', options: ['should', 'would', 'could'] },
                { sentence: { en: 'Little ____ she know about the surprise waiting for her.', vi: 'Ít ____ cô ấy biết về bất ngờ đang chờ cô ấy.' }, missing_word: 'did', options: ['did', 'does', 'do'] },
                { sentence: { en: 'Not until the deadline ____ they realize the urgency.', vi: 'Không cho đến thời hạn ____ họ nhận ra sự cấp bách.' }, missing_word: 'did', options: ['did', 'do', 'does'] }
            ],
            find_error: [
                { sentence: { en: 'Not only he is a skilled negotiator, but he is also a great team leader.', vi: 'Anh ấy không chỉ là một nhà đàm phán giỏi mà còn là một trưởng nhóm tuyệt vời.' }, error_word: 'he is', correct_word: 'is he' },
                { sentence: { en: 'Hardly she had finished when the phone rang.', vi: 'Vừa mới cô ấy hoàn thành thì điện thoại reo.' }, error_word: 'she had', correct_word: 'had she' }
            ],
            choose_phrase: [
                { sentence: { en: 'Nowhere ____ find better customer service.', vi: 'Không nơi nào ____ tìm thấy dịch vụ khách hàng tốt hơn.' }, correct_phrase: 'will you', options: ['will you', 'you will', 'do you'] },
                { sentence: { en: 'Not once ____ complain about the working conditions.', vi: 'Không một lần nào ____ phàn nàn về điều kiện làm việc.' }, correct_phrase: 'did she', options: ['did she', 'she did', 'does she'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'negative inversion', vi: 'đảo ngữ phủ định' },
                        { en: 'rarely', vi: 'hiếm khi' },
                        { en: 'never', vi: 'không bao giờ' },
                        { en: 'seldom', vi: 'ít khi' }
                    ],
                    col_b: [
                        { en: 'auxiliary verb before subject', vi: 'trợ động từ trước chủ ngữ' },
                        { en: 'not often, infrequently', vi: 'không thường xuyên' },
                        { en: 'at no time', vi: 'không lúc nào' },
                        { en: 'almost never', vi: 'hầu như không bao giờ' }
                    ],
                    correct_pairs: [
                        { key: 'negative inversion', value: 'auxiliary verb before subject' },
                        { key: 'rarely', value: 'not often, infrequently' },
                        { key: 'never', value: 'at no time' },
                        { key: 'seldom', value: 'almost never' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Only when', vi: 'Chỉ khi' },
                        { en: 'the results arrived', vi: 'kết quả đến' },
                        { en: 'did we understand', vi: 'chúng tôi mới hiểu' },
                        { en: 'the situation.', vi: 'tình hình.' }
                    ],
                    correct_order: ['Only when', 'the results arrived', 'did we understand', 'the situation.']
                }
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
    },
    
    // --- CẤU TRÚC CÂU NÂNG CAO BỔ SUNG ---
    {
        id: 'FT-ADV-S-10',
        name_vi: 'Câu điều kiện đảo',
        name_en: 'Inverted Conditionals',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'Had I known about the meeting, I would have attended.',
        practice: {
            reorder: [
                { words: [{ en: 'Had I known', vi: 'Nếu tôi biết' }, { en: 'about the meeting,', vi: 'về cuộc họp,' }, { en: 'I would have', vi: 'tôi sẽ đã' }, { en: 'attended.', vi: 'tham dự.' }], answer: 'Had I known about the meeting, I would have attended.' },
                { words: [{ en: 'Were she', vi: 'Nếu cô ấy' }, { en: 'to apply', vi: 'nộp đơn' }, { en: 'for the position,', vi: 'cho vị trí này,' }, { en: 'she would get it.', vi: 'cô ấy sẽ được nhận.' }], answer: 'Were she to apply for the position, she would get it.' }
            ],
            fill_blank: [
                { sentence: { en: '____ I been more careful, the accident would not have happened.', vi: '____ tôi cẩn thận hơn, tai nạn sẽ không xảy ra.' }, missing_word: 'Had', options: ['Had', 'If', 'Were'] },
                { sentence: { en: '____ you change your mind, let me know.', vi: '____ bạn thay đổi ý kiến, hãy cho tôi biết.' }, missing_word: 'Should', options: ['Should', 'Had', 'Were'] }
            ],
            find_error: [
                { sentence: { en: 'If I had known about the meeting, I would have attended.', vi: 'Nếu tôi biết về cuộc họp, tôi sẽ đã tham dự.' }, error_word: 'If I had', correct_word: 'Had I' }
            ],
            choose_phrase: [
                { sentence: { en: '____ the project completed on time, we would receive a bonus.', vi: '____ dự án hoàn thành đúng hạn, chúng ta sẽ nhận thưởng.' }, correct_phrase: 'Were', options: ['Were', 'Had', 'Should'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'Had + subject', vi: 'Had + chủ ngữ' },
                        { en: 'Were + subject', vi: 'Were + chủ ngữ' },
                        { en: 'Should + subject', vi: 'Should + chủ ngữ' },
                        { en: 'inverted conditional', vi: 'câu điều kiện đảo' }
                    ],
                    col_b: [
                        { en: 'past perfect conditional', vi: 'điều kiện quá khứ hoàn thành' },
                        { en: 'subjunctive conditional', vi: 'điều kiện giả định' },
                        { en: 'future possibility', vi: 'khả năng tương lai' },
                        { en: 'formal conditional without if', vi: 'câu điều kiện trang trọng không có if' }
                    ],
                    correct_pairs: [
                        { key: 'Had + subject', value: 'past perfect conditional' },
                        { key: 'Were + subject', value: 'subjunctive conditional' },
                        { key: 'Should + subject', value: 'future possibility' },
                        { key: 'inverted conditional', value: 'formal conditional without if' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Were it not', vi: 'Nếu không có' },
                        { en: 'for the rain,', vi: 'mưa,' },
                        { en: 'we would have', vi: 'chúng ta sẽ đã' },
                        { en: 'gone to the beach.', vi: 'đi biển.' }
                    ],
                    correct_order: ['Were it not', 'for the rain,', 'we would have', 'gone to the beach.']
                }
            ]
        }
    },
    {
        id: 'FT-ADV-S-11',
        name_vi: 'Câu đảo với so/such...that',
        name_en: 'Inversion with so/such...that',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'So impressive was her presentation that everyone applauded.',
        practice: {
            reorder: [
                { words: [{ en: 'So impressive', vi: 'Ấn tượng đến nỗi' }, { en: 'was her presentation', vi: 'bài thuyết trình của cô ấy' }, { en: 'that everyone', vi: 'mà mọi người' }, { en: 'applauded.', vi: 'đều vỗ tay.' }], answer: 'So impressive was her presentation that everyone applauded.' },
                { words: [{ en: 'Such was', vi: 'Như vậy là' }, { en: 'the impact', vi: 'tác động' }, { en: 'of his speech', vi: 'của bài phát biểu' }, { en: 'that policies changed.', vi: 'mà chính sách đã thay đổi.' }], answer: 'Such was the impact of his speech that policies changed.' }
            ],
            fill_blank: [
                { sentence: { en: 'So talented ____ the musician that the audience was mesmerized.', vi: 'Tài năng đến nỗi ____ nhạc sĩ mà khán giả bị mê hoặc.' }, missing_word: 'was', options: ['was', 'is', 'were'] },
                { sentence: { en: 'Such ____ the complexity that experts were baffled.', vi: 'Phức tạp đến nỗi ____ mà các chuyên gia bối rối.' }, missing_word: 'was', options: ['was', 'is', 'were'] }
            ],
            find_error: [
                { sentence: { en: 'So beautiful the sunset was that we stopped to watch.', vi: 'Đẹp đến nỗi hoàng hôn mà chúng tôi dừng lại để xem.' }, error_word: 'the sunset was', correct_word: 'was the sunset' }
            ],
            choose_phrase: [
                { sentence: { en: 'So exhausted ____ after the marathon that he collapsed.', vi: 'Kiệt sức đến nỗi ____ sau cuộc chạy marathon mà anh ấy ngã gục.' }, correct_phrase: 'was he', options: ['was he', 'he was', 'is he'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'so + adjective', vi: 'so + tính từ' },
                        { en: 'such + noun', vi: 'such + danh từ' },
                        { en: 'inversion', vi: 'đảo ngữ' },
                        { en: 'emphasis', vi: 'nhấn mạnh' }
                    ],
                    col_b: [
                        { en: 'emphasizes quality', vi: 'nhấn mạnh tính chất' },
                        { en: 'emphasizes thing/person', vi: 'nhấn mạnh sự vật/người' },
                        { en: 'formal emphasis structure', vi: 'cấu trúc nhấn mạnh trang trọng' },
                        { en: 'highlighting importance', vi: 'làm nổi bật tầm quan trọng' }
                    ],
                    correct_pairs: [
                        { key: 'so + adjective', value: 'emphasizes quality' },
                        { key: 'such + noun', value: 'emphasizes thing/person' },
                        { key: 'inversion', value: 'formal emphasis structure' },
                        { key: 'emphasis', value: 'highlighting importance' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'So intense', vi: 'Căng thẳng đến nỗi' },
                        { en: 'was the competition', vi: 'cuộc thi' },
                        { en: 'that participants', vi: 'mà thí sinh' },
                        { en: 'were nervous.', vi: 'đều lo lắng.' }
                    ],
                    correct_order: ['So intense', 'was the competition', 'that participants', 'were nervous.']
                }
            ]
        }
    },
    {
        id: 'FT-ADV-S-12',
        name_vi: 'Câu nhấn mạnh (Cleft)',
        name_en: 'Cleft Sentences',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'It was John who completed the project successfully.',
        practice: {
            reorder: [
                { words: [{ en: 'It was John', vi: 'Chính John' }, { en: 'who completed', vi: 'là người đã hoàn thành' }, { en: 'the project', vi: 'dự án' }, { en: 'successfully.', vi: 'thành công.' }], answer: 'It was John who completed the project successfully.' },
                { words: [{ en: 'It is', vi: 'Chính là' }, { en: 'his dedication', vi: 'sự tận tâm của anh ấy' }, { en: 'that impresses', vi: 'mà gây ấn tượng' }, { en: 'everyone.', vi: 'với mọi người.' }], answer: 'It is his dedication that impresses everyone.' }
            ],
            fill_blank: [
                { sentence: { en: 'It ____ the manager who made the final decision.', vi: 'Chính ____ quản lý đã đưa ra quyết định cuối cùng.' }, missing_word: 'was', options: ['was', 'is', 'were'] },
                { sentence: { en: 'It is ____ we need to focus on quality.', vi: 'Chính ____ chúng ta cần tập trung vào chất lượng.' }, missing_word: 'quality that', options: ['quality that', 'that quality', 'quality what'] }
            ],
            find_error: [
                { sentence: { en: 'It was him which solved the problem.', vi: 'Chính anh ấy đã giải quyết vấn đề.' }, error_word: 'which', correct_word: 'who' }
            ],
            choose_phrase: [
                { sentence: { en: 'It was ____ the conference that new partnerships were formed.', vi: 'Chính ____ hội nghị mà các quan hệ đối tác mới được hình thành.' }, correct_phrase: 'at', options: ['at', 'in', 'on'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'cleft sentence', vi: 'câu nhấn mạnh' },
                        { en: 'it-cleft', vi: 'nhấn mạnh với it' },
                        { en: 'focus element', vi: 'yếu tố được nhấn mạnh' },
                        { en: 'relative clause', vi: 'mệnh đề quan hệ' }
                    ],
                    col_b: [
                        { en: 'sentence split for emphasis', vi: 'câu được tách để nhấn mạnh' },
                        { en: 'starts with it + be', vi: 'bắt đầu với it + be' },
                        { en: 'part being emphasized', vi: 'phần được nhấn mạnh' },
                        { en: 'follows the focus element', vi: 'theo sau yếu tố được nhấn mạnh' }
                    ],
                    correct_pairs: [
                        { key: 'cleft sentence', value: 'sentence split for emphasis' },
                        { key: 'it-cleft', value: 'starts with it + be' },
                        { key: 'focus element', value: 'part being emphasized' },
                        { key: 'relative clause', value: 'follows the focus element' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'It was', vi: 'Chính là' },
                        { en: 'her persistence', vi: 'sự kiên trì của cô ấy' },
                        { en: 'that led to', vi: 'đã dẫn đến' },
                        { en: 'success.', vi: 'thành công.' }
                    ],
                    correct_order: ['It was', 'her persistence', 'that led to', 'success.']
                }
            ]
        }
    },
    {
        id: 'FT-ADV-S-13',
        name_vi: 'Câu giả-phân thân (Pseudo-cleft)',
        name_en: 'Pseudo-cleft Sentences',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'What we need is better communication.',
        practice: {
            reorder: [
                { words: [{ en: 'What we need', vi: 'Điều chúng ta cần' }, { en: 'is better', vi: 'là sự' }, { en: 'communication.', vi: 'giao tiếp tốt hơn.' }], answer: 'What we need is better communication.' },
                { words: [{ en: 'What she did', vi: 'Điều cô ấy làm' }, { en: 'was impressive', vi: 'thật ấn tượng' }, { en: 'to everyone.', vi: 'với mọi người.' }], answer: 'What she did was impressive to everyone.' }
            ],
            fill_blank: [
                { sentence: { en: '____ matters most is teamwork.', vi: '____ quan trọng nhất là tinh thần đội nhóm.' }, missing_word: 'What', options: ['What', 'That', 'Which'] },
                { sentence: { en: '____ impressed me was her dedication.', vi: '____ gây ấn tượng với tôi là sự tận tâm của cô ấy.' }, missing_word: 'What', options: ['What', 'That', 'Which'] }
            ],
            find_error: [
                { sentence: { en: 'That we need is better planning.', vi: 'Điều chúng ta cần là lập kế hoạch tốt hơn.' }, error_word: 'That', correct_word: 'What' }
            ],
            choose_phrase: [
                { sentence: { en: '____ they decided was to postpone the meeting.', vi: '____ họ quyết định là hoãn cuộc họp.' }, correct_phrase: 'What', options: ['What', 'That', 'Which'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'pseudo-cleft', vi: 'giả phân thân' },
                        { en: 'wh-clause', vi: 'mệnh đề wh' },
                        { en: 'focus position', vi: 'vị trí nhấn mạnh' },
                        { en: 'what-clause', vi: 'mệnh đề what' }
                    ],
                    col_b: [
                        { en: 'emphasis structure with wh-word', vi: 'cấu trúc nhấn mạnh với từ wh' },
                        { en: 'starts with question word', vi: 'bắt đầu với từ hỏi' },
                        { en: 'after the main verb be', vi: 'sau động từ be chính' },
                        { en: 'most common pseudo-cleft', vi: 'giả phân thân phổ biến nhất' }
                    ],
                    correct_pairs: [
                        { key: 'pseudo-cleft', value: 'emphasis structure with wh-word' },
                        { key: 'wh-clause', value: 'starts with question word' },
                        { key: 'focus position', value: 'after the main verb be' },
                        { key: 'what-clause', value: 'most common pseudo-cleft' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'What surprised', vi: 'Điều làm ngạc nhiên' },
                        { en: 'everyone', vi: 'mọi người' },
                        { en: 'was her', vi: 'là sự' },
                        { en: 'quick recovery.', vi: 'phục hồi nhanh chóng của cô ấy.' }
                    ],
                    correct_order: ['What surprised', 'everyone', 'was her', 'quick recovery.']
                }
            ]
        }
    },
    {
        id: 'FT-ADV-S-14',
        name_vi: 'Câu nhấn mạnh bằng do',
        name_en: 'Emphatic do',
        level: 'advanced',
        category: 'Cấu trúc câu',
        sentence: 'I do believe that this strategy will work.',
        practice: {
            reorder: [
                { words: [{ en: 'I do believe', vi: 'Tôi thực sự tin' }, { en: 'that this strategy', vi: 'rằng chiến lược này' }, { en: 'will work.', vi: 'sẽ hiệu quả.' }], answer: 'I do believe that this strategy will work.' },
                { words: [{ en: 'She does', vi: 'Cô ấy thực sự' }, { en: 'understand', vi: 'hiểu' }, { en: 'the importance', vi: 'tầm quan trọng' }, { en: 'of teamwork.', vi: 'của tinh thần đội nhóm.' }], answer: 'She does understand the importance of teamwork.' }
            ],
            fill_blank: [
                { sentence: { en: 'He ____ want to succeed in this project.', vi: 'Anh ấy ____ muốn thành công trong dự án này.' }, missing_word: 'does', options: ['does', 'do', 'did'] },
                { sentence: { en: 'We ____ appreciate your hard work.', vi: 'Chúng tôi ____ đánh giá cao công việc chăm chỉ của bạn.' }, missing_word: 'do', options: ['do', 'does', 'did'] }
            ],
            find_error: [
                { sentence: { en: 'I did believe that she will come to the party.', vi: 'Tôi thực sự tin rằng cô ấy sẽ đến bữa tiệc.' }, error_word: 'did', correct_word: 'do' }
            ],
            choose_phrase: [
                { sentence: { en: 'They ____ care about customer satisfaction.', vi: 'Họ ____ quan tâm đến sự hài lòng của khách hàng.' }, correct_phrase: 'do', options: ['do', 'does', 'did'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'emphatic do', vi: 'do nhấn mạnh' },
                        { en: 'do/does/did', vi: 'do/does/did' },
                        { en: 'emphasis', vi: 'nhấn mạnh' },
                        { en: 'contradiction', vi: 'phản bác' }
                    ],
                    col_b: [
                        { en: 'adds stress to main verb', vi: 'thêm trọng âm cho động từ chính' },
                        { en: 'auxiliary verbs for emphasis', vi: 'trợ động từ để nhấn mạnh' },
                        { en: 'making something stand out', vi: 'làm nổi bật điều gì đó' },
                        { en: 'opposing a negative statement', vi: 'phản đối một tuyên bố phủ định' }
                    ],
                    correct_pairs: [
                        { key: 'emphatic do', value: 'adds stress to main verb' },
                        { key: 'do/does/did', value: 'auxiliary verbs for emphasis' },
                        { key: 'emphasis', value: 'making something stand out' },
                        { key: 'contradiction', value: 'opposing a negative statement' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'You may not', vi: 'Bạn có thể không' },
                        { en: 'believe me, but', vi: 'tin tôi, nhưng' },
                        { en: 'I do care', vi: 'tôi thực sự quan tâm' },
                        { en: 'about this project.', vi: 'đến dự án này.' }
                    ],
                    correct_order: ['You may not', 'believe me, but', 'I do care', 'about this project.']
                }
            ]
        }
    },
    
    // --- THÌ (TENSES) NÂNG CAO BỔ SUNG ---
    {
        id: 'FT-ADV-T-10',
        name_vi: 'Quá khứ hoàn thành tiếp diễn',
        name_en: 'Past Perfect Continuous',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'She had been working on the project for three months before it was approved.',
        practice: {
            reorder: [
                { words: [{ en: 'She had been working', vi: 'Cô ấy đã đang làm việc' }, { en: 'on the project', vi: 'về dự án' }, { en: 'for three months', vi: 'trong ba tháng' }, { en: 'before it was approved.', vi: 'trước khi nó được phê duyệt.' }], answer: 'She had been working on the project for three months before it was approved.' },
                { words: [{ en: 'They had been', vi: 'Họ đã đang' }, { en: 'discussing', vi: 'thảo luận' }, { en: 'the proposal', vi: 'đề xuất' }, { en: 'for hours.', vi: 'trong nhiều giờ.' }], answer: 'They had been discussing the proposal for hours.' }
            ],
            fill_blank: [
                { sentence: { en: 'By the time he arrived, we ____ for two hours.', vi: 'Khi anh ấy đến, chúng tôi đã ____ trong hai tiếng.' }, missing_word: 'had been waiting', options: ['had been waiting', 'have been waiting', 'were waiting'] },
                { sentence: { en: 'She looked tired because she ____ all night.', vi: 'Cô ấy trông mệt mỏi vì cô ấy ____ suốt đêm.' }, missing_word: 'had been studying', options: ['had been studying', 'has been studying', 'was studying'] }
            ],
            find_error: [
                { sentence: { en: 'He has been working on this project before he got promoted.', vi: 'Anh ấy đã đang làm việc về dự án này trước khi được thăng chức.' }, error_word: 'has been', correct_word: 'had been' }
            ],
            choose_phrase: [
                { sentence: { en: 'When the meeting started, she ____ for the presentation for days.', vi: 'Khi cuộc họp bắt đầu, cô ấy ____ cho bài thuyết trình trong nhiều ngày.' }, correct_phrase: 'had been preparing', options: ['had been preparing', 'has been preparing', 'was preparing'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'past perfect continuous', vi: 'quá khứ hoàn thành tiếp diễn' },
                        { en: 'had been + V-ing', vi: 'had been + V-ing' },
                        { en: 'duration before past', vi: 'thời gian trước quá khứ' },
                        { en: 'completed ongoing action', vi: 'hành động liên tục đã hoàn thành' }
                    ],
                    col_b: [
                        { en: 'shows action continuing before past point', vi: 'thể hiện hành động tiếp tục trước điểm quá khứ' },
                        { en: 'structure of the tense', vi: 'cấu trúc của thì' },
                        { en: 'emphasizes length of time', vi: 'nhấn mạnh khoảng thời gian' },
                        { en: 'action finished at specific past time', vi: 'hành động kết thúc tại thời điểm quá khứ cụ thể' }
                    ],
                    correct_pairs: [
                        { key: 'past perfect continuous', value: 'shows action continuing before past point' },
                        { key: 'had been + V-ing', value: 'structure of the tense' },
                        { key: 'duration before past', value: 'emphasizes length of time' },
                        { key: 'completed ongoing action', value: 'action finished at specific past time' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'Before the deadline,', vi: 'Trước thời hạn,' },
                        { en: 'the team', vi: 'đội ngũ' },
                        { en: 'had been working', vi: 'đã đang làm việc' },
                        { en: 'overtime for weeks.', vi: 'tăng ca trong nhiều tuần.' }
                    ],
                    correct_order: ['Before the deadline,', 'the team', 'had been working', 'overtime for weeks.']
                }
            ]
        }
    },
    {
        id: 'FT-ADV-T-11',
        name_vi: 'Tương lai hoàn thành tiếp diễn',
        name_en: 'Future Perfect Continuous',
        level: 'advanced',
        category: 'Thì (Tenses)',
        sentence: 'By next year, I will have been working here for ten years.',
        practice: {
            reorder: [
                { words: [{ en: 'By next year,', vi: 'Đến năm tới,' }, { en: 'I will have been', vi: 'tôi sẽ đã đang' }, { en: 'working here', vi: 'làm việc ở đây' }, { en: 'for ten years.', vi: 'được mười năm.' }], answer: 'By next year, I will have been working here for ten years.' },
                { words: [{ en: 'By the time', vi: 'Khi' }, { en: 'she graduates,', vi: 'cô ấy tốt nghiệp,' }, { en: 'she will have been studying', vi: 'cô ấy sẽ đã đang học' }, { en: 'for four years.', vi: 'được bốn năm.' }], answer: 'By the time she graduates, she will have been studying for four years.' }
            ],
            fill_blank: [
                { sentence: { en: 'By December, we ____ this project for six months.', vi: 'Đến tháng 12, chúng tôi ____ dự án này được sáu tháng.' }, missing_word: 'will have been working on', options: ['will have been working on', 'will be working on', 'have been working on'] },
                { sentence: { en: 'Next week, I ____ in this position for exactly one year.', vi: 'Tuần tới, tôi ____ ở vị trí này đúng một năm.' }, missing_word: 'will have been working', options: ['will have been working', 'will be working', 'have been working'] }
            ],
            find_error: [
                { sentence: { en: 'By tomorrow, she will be working on this for three days.', vi: 'Đến ngày mai, cô ấy sẽ làm việc về điều này được ba ngày.' }, error_word: 'will be working', correct_word: 'will have been working' }
            ],
            choose_phrase: [
                { sentence: { en: 'By the end of this month, he ____ the project for a full year.', vi: 'Cuối tháng này, anh ấy ____ dự án được đúng một năm.' }, correct_phrase: 'will have been managing', options: ['will have been managing', 'will be managing', 'has been managing'] }
            ],
            matching: [
                {
                    col_a: [
                        { en: 'future perfect continuous', vi: 'tương lai hoàn thành tiếp diễn' },
                        { en: 'will have been + V-ing', vi: 'will have been + V-ing' },
                        { en: 'duration until future point', vi: 'thời gian đến điểm tương lai' },
                        { en: 'ongoing future completion', vi: 'hoàn thành liên tục trong tương lai' }
                    ],
                    col_b: [
                        { en: 'shows duration continuing to future point', vi: 'thể hiện thời gian tiếp tục đến điểm tương lai' },
                        { en: 'structure of the tense', vi: 'cấu trúc của thì' },
                        { en: 'emphasizes time span', vi: 'nhấn mạnh khoảng thời gian' },
                        { en: 'action continues until future moment', vi: 'hành động tiếp tục đến thời điểm tương lai' }
                    ],
                    correct_pairs: [
                        { key: 'future perfect continuous', value: 'shows duration continuing to future point' },
                        { key: 'will have been + V-ing', value: 'structure of the tense' },
                        { key: 'duration until future point', value: 'emphasizes time span' },
                        { key: 'ongoing future completion', value: 'action continues until future moment' }
                    ]
                }
            ],
            drag_drop: [
                {
                    sentence_parts: [
                        { en: 'By the time', vi: 'Khi' },
                        { en: 'the project ends,', vi: 'dự án kết thúc,' },
                        { en: 'we will have been', vi: 'chúng ta sẽ đã đang' },
                        { en: 'collaborating for months.', vi: 'hợp tác được nhiều tháng.' }
                    ],
                    correct_order: ['By the time', 'the project ends,', 'we will have been', 'collaborating for months.']
                }
            ]
        }
    }
];
