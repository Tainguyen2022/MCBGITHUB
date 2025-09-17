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
            reorder: [
                { words: [{en:"I", vi:"Em"}, {en:"take", vi:"nhận"}, {en:"full", vi:"toàn bộ"}, {en:"responsibility.", vi:"trách nhiệm."}], answer: "I take full responsibility." },
                { words: [{en:"I", vi:"Em"}, {en:"am", vi:"đang"}, {en:"writing", vi:"viết"}, {en:"to", vi:"để"}, {en:"apologize.", vi:"xin lỗi."}], answer: "I am writing to apologize." },
                { words: [{en:"I", vi:"Em"}, {en:"sincerely", vi:"chân thành"}, {en:"apologize", vi:"xin lỗi"}, {en:"for", vi:"vì"}, {en:"the", vi:"sự"}, {en:"delay.", vi:"chậm trễ."}], answer: "I sincerely apologize for the delay." },
                { words: [{en:"I", vi:"Em"}, {en:"understand", vi:"hiểu"}, {en:"the", vi:"hạn"}, {en:"deadline", vi:"chót"}, {en:"was", vi:"là"}, {en:"last", vi:"thứ"}, {en:"Friday.", vi:"Sáu."}], answer: "I understand the deadline was last Friday." },
                { words: [{en:"I", vi:"Em"}, {en:"had", vi:"đã có"}, {en:"an", vi:"một"}, {en:"unexpected", vi:"bất ngờ"}, {en:"emergency.", vi:"tình huống khẩn cấp."}], answer: "I had an unexpected emergency." }
            ],
            fill_blank: [
                // Lesson 1: Thank You Expressions
                { sentence: { en: "I just wanted to ____ thank you so much again.", vi: "Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa." }, missing_word: 'say', options: ['say', 'tell', 'speak', 'talk'] },
                { sentence: { en: "Thank you ____ much for everything.", vi: "Cảm ơn bạn ____ nhiều vì tất cả." }, missing_word: 'so', options: ['so', 'very', 'really', 'too'] },
                
                // Lesson 2: Appreciation and Gratitude
                { sentence: { en: "I really ____ your hospitality during my stay.", vi: "Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại." }, missing_word: 'appreciate', options: ['appreciate', 'apply', 'approve', 'approach'] },
                { sentence: { en: "I ____ grateful for your kindness.", vi: "Mình ____ biết ơn vì lòng tốt của bạn." }, missing_word: 'am', options: ['am', 'was', 'will be', 'have been'] },
                
                // Lesson 3: Past Experiences
                { sentence: { en: "I had a ____ time exploring the city with you.", vi: "Mình đã có một ____ tuyệt vời khi khám phá thành phố cùng bạn." }, missing_word: 'wonderful', options: ['wonderful', 'terrible', 'boring', 'difficult'] },
                { sentence: { en: "It was ____ catching up with you.", vi: "Thật ____ khi được hàn huyên với bạn." }, missing_word: 'great', options: ['great', 'bad', 'okay', 'fine'] },
                
                // Lesson 4: Future Plans
                { sentence: { en: "Let me know when you're ____ to visit my city.", vi: "Hãy cho mình biết khi nào bạn ____ đến thăm thành phố của mình." }, missing_word: 'planning', options: ['planning', 'planned', 'plans', 'plan'] },
                { sentence: { en: "I really hope you can ____ next time!", vi: "Mình thực sự hy vọng bạn có thể ____ lần sau!" }, missing_word: 'come', options: ['come', 'coming', 'came', 'comes'] },
                
                // Lesson 5: Hosting and Reciprocation
                { sentence: { en: "I can ____ you when you visit.", vi: "Mình có thể ____ bạn khi bạn đến thăm." }, missing_word: 'host', options: ['host', 'hosting', 'hosted', 'hosts'] },
                { sentence: { en: "I would love to ____ you back.", vi: "Mình rất muốn ____ bạn lại." }, missing_word: 'have', options: ['have', 'having', 'had', 'has'] }
            ],
            find_error: [
                // Lesson 1: Common Grammar Mistakes
                { sentence: { en: 'I just wanted to say thank you so much again for letting I stay.', vi: 'Mình chỉ muốn nói lời cảm ơn bạn rất nhiều một lần nữa vì đã cho mình ở lại.' }, error_word: 'I', correct_word: 'me' },
                { sentence: { en: 'Thank you so much again for let me stay with you.', vi: 'Cảm ơn bạn rất nhiều một lần nữa vì đã cho mình ở lại.' }, error_word: 'let', correct_word: 'letting' },
                
                // Lesson 2: Possessive and Articles
                { sentence: { en: 'I really appreciate you hospitality during my stay.', vi: 'Mình thực sự trân trọng lòng hiếu khách của bạn trong thời gian ở lại.' }, error_word: 'you', correct_word: 'your' },
                { sentence: { en: 'It was great catching up with you on the weekend.', vi: 'Thật tuyệt khi được hàn huyên với bạn vào cuối tuần.' }, error_word: 'on', correct_word: 'over' },
                
                // Lesson 3: Verb Tenses
                { sentence: { en: 'I had a wonderful time explore the city with you.', vi: 'Mình đã có một khoảng thời gian tuyệt vời khi khám phá thành phố cùng bạn.' }, error_word: 'explore', correct_word: 'exploring' },
                { sentence: { en: 'I really hope you can comes next time!', vi: 'Mình thực sự hy vọng bạn có thể đến lần sau!' }, error_word: 'comes', correct_word: 'come' },
                
                // Lesson 4: Prepositions and Word Order
                { sentence: { en: 'Let me know when you planning to visit my city.', vi: 'Hãy cho mình biết khi nào bạn định đến thăm thành phố của mình.' }, error_word: 'planning', correct_word: 'are planning' },
                { sentence: { en: 'I would love to host you when you will visit.', vi: 'Mình rất muốn được tiếp đãi bạn khi bạn đến thăm.' }, error_word: 'will', correct_word: '' },
                
                // Lesson 5: Formal vs Informal
                { sentence: { en: 'I am writing to thank you for your hospitality.', vi: 'Mình viết thư để cảm ơn bạn về lòng hiếu khách.' }, error_word: 'am writing', correct_word: 'just wanted to say' },
                { sentence: { en: 'I look forward to hear from you soon.', vi: 'Mình mong được nghe tin từ bạn sớm.' }, error_word: 'hear', correct_word: 'hearing' }
            ],
            choose_phrase: [
                // Lesson 1: Thank You Expressions
                { 
                    sentence: { en: 'Complete: I just wanted to ____ thank you so much again.', vi: 'Hoàn thành: Mình chỉ muốn ____ cảm ơn bạn rất nhiều một lần nữa.' }, 
                    correct_phrase: 'say',
                    options: ['say', 'tell', 'speak', 'talk']
                },
                { 
                    sentence: { en: 'Complete: Thank you ____ much for everything.', vi: 'Hoàn thành: Cảm ơn bạn ____ nhiều vì tất cả.' }, 
                    correct_phrase: 'so',
                    options: ['so', 'very', 'really', 'too']
                },
                
                // Lesson 2: Appreciation
                { 
                    sentence: { en: 'Complete: I really ____ your hospitality during my stay.', vi: 'Hoàn thành: Mình thực sự ____ lòng hiếu khách của bạn trong thời gian ở lại.' }, 
                    correct_phrase: 'appreciate',
                    options: ['appreciate', 'apply', 'approve', 'approach']
                },
                { 
                    sentence: { en: 'Complete: I ____ grateful for your kindness.', vi: 'Hoàn thành: Mình ____ biết ơn vì lòng tốt của bạn.' }, 
                    correct_phrase: 'am',
                    options: ['am', 'was', 'will be', 'have been']
                },
                
                // Lesson 3: Past Experiences
                { 
                    sentence: { en: 'Complete: I had a ____ time exploring the city with you.', vi: 'Hoàn thành: Mình đã có một ____ tuyệt vời khi khám phá thành phố cùng bạn.' }, 
                    correct_phrase: 'wonderful',
                    options: ['wonderful', 'terrible', 'boring', 'difficult']
                },
                { 
                    sentence: { en: 'Complete: It was ____ catching up with you.', vi: 'Hoàn thành: Thật ____ khi được hàn huyên với bạn.' }, 
                    correct_phrase: 'great',
                    options: ['great', 'bad', 'okay', 'fine']
                },
                
                // Lesson 4: Future Plans
                { 
                    sentence: { en: 'Complete: Let me know when you\'re ____ to visit my city.', vi: 'Hoàn thành: Hãy cho mình biết khi nào bạn ____ đến thăm thành phố của mình.' }, 
                    correct_phrase: 'planning',
                    options: ['planning', 'planned', 'plans', 'plan']
                },
                { 
                    sentence: { en: 'Complete: I really hope you can ____ next time!', vi: 'Hoàn thành: Mình thực sự hy vọng bạn có thể ____ lần sau!' }, 
                    correct_phrase: 'come',
                    options: ['come', 'coming', 'came', 'comes']
                },
                
                // Lesson 5: Hosting and Reciprocation
                { 
                    sentence: { en: 'Complete: I can ____ you when you visit.', vi: 'Hoàn thành: Mình có thể ____ bạn khi bạn đến thăm.' }, 
                    correct_phrase: 'host',
                    options: ['host', 'hosting', 'hosted', 'hosts']
                },
                { 
                    sentence: { en: 'Complete: I would love to ____ you back.', vi: 'Hoàn thành: Mình rất muốn ____ bạn lại.' }, 
                    correct_phrase: 'have',
                    options: ['have', 'having', 'had', 'has']
                }
            ],
            matching: [
                // Lesson 1: Basic Vocabulary
                {
                    col_a: [
                        { en: 'hospitality', vi: 'lòng hiếu khách' },
                        { en: 'appreciate', vi: 'trân trọng' },
                        { en: 'wonderful', vi: 'tuyệt vời' }
                    ],
                    col_b: [
                        { en: 'lòng hiếu khách', vi: 'hospitality' },
                        { en: 'trân trọng', vi: 'appreciate' },
                        { en: 'tuyệt vời', vi: 'wonderful' }
                    ],
                    correct_pairs: [
                        { key: 'hospitality', value: 'lòng hiếu khách' },
                        { key: 'appreciate', value: 'trân trọng' },
                        { key: 'wonderful', value: 'tuyệt vời' }
                    ]
                },
                
                // Lesson 2: Activities and Experiences
                {
                    col_a: [
                        { en: 'exploring', vi: 'khám phá' },
                        { en: 'catching up', vi: 'hàn huyên' },
                        { en: 'host', vi: 'tiếp đãi' }
                    ],
                    col_b: [
                        { en: 'khám phá', vi: 'exploring' },
                        { en: 'hàn huyên', vi: 'catching up' },
                        { en: 'tiếp đãi', vi: 'host' }
                    ],
                    correct_pairs: [
                        { key: 'exploring', value: 'khám phá' },
                        { key: 'catching up', value: 'hàn huyên' },
                        { key: 'host', value: 'tiếp đãi' }
                    ]
                },
                
                // Lesson 3: Time Expressions
                {
                    col_a: [
                        { en: 'last weekend', vi: 'cuối tuần trước' },
                        { en: 'next time', vi: 'lần sau' },
                        { en: 'during my stay', vi: 'trong thời gian ở lại' }
                    ],
                    col_b: [
                        { en: 'cuối tuần trước', vi: 'last weekend' },
                        { en: 'lần sau', vi: 'next time' },
                        { en: 'trong thời gian ở lại', vi: 'during my stay' }
                    ],
                    correct_pairs: [
                        { key: 'last weekend', value: 'cuối tuần trước' },
                        { key: 'next time', value: 'lần sau' },
                        { key: 'during my stay', value: 'trong thời gian ở lại' }
                    ]
                },
                
                // Lesson 4: Feelings and Emotions
                {
                    col_a: [
                        { en: 'grateful', vi: 'biết ơn' },
                        { en: 'excited', vi: 'hào hứng' },
                        { en: 'thankful', vi: 'cảm kích' }
                    ],
                    col_b: [
                        { en: 'biết ơn', vi: 'grateful' },
                        { en: 'hào hứng', vi: 'excited' },
                        { en: 'cảm kích', vi: 'thankful' }
                    ],
                    correct_pairs: [
                        { key: 'grateful', value: 'biết ơn' },
                        { key: 'excited', value: 'hào hứng' },
                        { key: 'thankful', value: 'cảm kích' }
                    ]
                },
                
                // Lesson 5: Future Plans
                {
                    col_a: [
                        { en: 'planning to visit', vi: 'định đến thăm' },
                        { en: 'looking forward', vi: 'mong đợi' },
                        { en: 'hope you can come', vi: 'hy vọng bạn có thể đến' }
                    ],
                    col_b: [
                        { en: 'định đến thăm', vi: 'planning to visit' },
                        { en: 'mong đợi', vi: 'looking forward' },
                        { en: 'hy vọng bạn có thể đến', vi: 'hope you can come' }
                    ],
                    correct_pairs: [
                        { key: 'planning to visit', value: 'định đến thăm' },
                        { key: 'looking forward', value: 'mong đợi' },
                        { key: 'hope you can come', value: 'hy vọng bạn có thể đến' }
                    ]
                }
            ],
            drag_drop: [
                // Lesson 1: Thank You Sentences
                {
                    sentence_parts: [
                        { en: 'your hospitality', vi: 'lòng hiếu khách của bạn' },
                        { en: 'I really appreciate', vi: 'Mình thực sự trân trọng' },
                        { en: 'so much.', vi: 'rất nhiều.' }
                    ],
                    correct_order: ['I really appreciate', 'your hospitality', 'so much.']
                },
                {
                    sentence_parts: [
                        { en: 'Thank you', vi: 'Cảm ơn bạn' },
                        { en: 'so much again', vi: 'rất nhiều một lần nữa' },
                        { en: 'for everything.', vi: 'vì tất cả.' }
                    ],
                    correct_order: ['Thank you', 'so much again', 'for everything.']
                },
                
                // Lesson 2: Past Experience Sentences
                {
                    sentence_parts: [
                        { en: 'a wonderful time', vi: 'một khoảng thời gian tuyệt vời' },
                        { en: 'I had', vi: 'Mình đã có' },
                        { en: 'exploring the city.', vi: 'khi khám phá thành phố.' }
                    ],
                    correct_order: ['I had', 'a wonderful time', 'exploring the city.']
                },
                {
                    sentence_parts: [
                        { en: 'It was great', vi: 'Thật tuyệt' },
                        { en: 'catching up', vi: 'khi hàn huyên' },
                        { en: 'with you.', vi: 'với bạn.' }
                    ],
                    correct_order: ['It was great', 'catching up', 'with you.']
                },
                
                // Lesson 3: Future Plans Sentences
                {
                    sentence_parts: [
                        { en: 'you can come', vi: 'bạn có thể đến' },
                        { en: 'I really hope', vi: 'Mình thực sự hy vọng' },
                        { en: 'next time!', vi: 'lần sau!' }
                    ],
                    correct_order: ['I really hope', 'you can come', 'next time!']
                },
                {
                    sentence_parts: [
                        { en: 'when you visit', vi: 'khi bạn đến thăm' },
                        { en: 'Let me know', vi: 'Hãy cho mình biết' },
                        { en: 'my city.', vi: 'thành phố của mình.' }
                    ],
                    correct_order: ['Let me know', 'when you visit', 'my city.']
                },
                
                // Lesson 4: Gratitude Sentences
                {
                    sentence_parts: [
                        { en: 'I just wanted to say', vi: 'Mình chỉ muốn nói' },
                        { en: 'thank you', vi: 'cảm ơn bạn' },
                        { en: 'so much again.', vi: 'rất nhiều một lần nữa.' }
                    ],
                    correct_order: ['I just wanted to say', 'thank you', 'so much again.']
                },
                {
                    sentence_parts: [
                        { en: 'I am grateful', vi: 'Mình biết ơn' },
                        { en: 'for your kindness', vi: 'vì lòng tốt của bạn' },
                        { en: 'and hospitality.', vi: 'và lòng hiếu khách.' }
                    ],
                    correct_order: ['I am grateful', 'for your kindness', 'and hospitality.']
                },
                
                // Lesson 5: Closing Sentences
                {
                    sentence_parts: [
                        { en: 'Looking forward', vi: 'Mong được' },
                        { en: 'to hearing from you', vi: 'nghe tin từ bạn' },
                        { en: 'soon.', vi: 'sớm.' }
                    ],
                    correct_order: ['Looking forward', 'to hearing from you', 'soon.']
                },
                {
                    sentence_parts: [
                        { en: 'Best wishes,', vi: 'Thân ái,' },
                        { en: '[Your Name]', vi: '[Tên của bạn]' }
                    ],
                    correct_order: ['Best wishes,', '[Your Name]']
                }
            ]
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
            reorder: [
                { words: [{en:"I", vi:"Em"}, {en:"take", vi:"nhận"}, {en:"full", vi:"toàn bộ"}, {en:"responsibility.", vi:"trách nhiệm."}], answer: "I take full responsibility." },
                { words: [{en:"I", vi:"Em"}, {en:"am", vi:"đang"}, {en:"writing", vi:"viết"}, {en:"to", vi:"để"}, {en:"apologize.", vi:"xin lỗi."}], answer: "I am writing to apologize." },
                { words: [{en:"I", vi:"Em"}, {en:"sincerely", vi:"chân thành"}, {en:"apologize", vi:"xin lỗi"}, {en:"for", vi:"vì"}, {en:"the", vi:"sự"}, {en:"delay.", vi:"chậm trễ."}], answer: "I sincerely apologize for the delay." },
                { words: [{en:"I", vi:"Em"}, {en:"understand", vi:"hiểu"}, {en:"the", vi:"hạn"}, {en:"deadline", vi:"chót"}, {en:"was", vi:"là"}, {en:"last", vi:"thứ"}, {en:"Friday.", vi:"Sáu."}], answer: "I understand the deadline was last Friday." },
                { words: [{en:"I", vi:"Em"}, {en:"had", vi:"đã có"}, {en:"an", vi:"một"}, {en:"unexpected", vi:"bất ngờ"}, {en:"emergency.", vi:"tình huống khẩn cấp."}], answer: "I had an unexpected emergency." }
            ],
            fill_blank: [
                { sentence: { en: "I am writing to ____ apologize for the delay.", vi: "Em viết thư để ____ xin lỗi về sự chậm trễ." }, missing_word: 'sincerely', options: ['sincerely', 'sincere', 'sincerity'] },
                { sentence: { en: "I take full ____ for not meeting the deadline.", vi: "Em chịu hoàn toàn ____ vì không tuân thủ hạn chót." }, missing_word: 'responsibility', options: ['responsibility', 'responsible', 'respond'] },
                { sentence: { en: "I had an ____ family emergency.", vi: "Em đã có một việc gia đình ____." }, missing_word: 'unexpected', options: ['unexpected', 'expected', 'expecting'] },
                { sentence: { en: "I hope you will ____ my situation.", vi: "Em hy vọng thầy sẽ ____ hoàn cảnh của em." }, missing_word: 'understand', options: ['understand', 'understanding', 'understood'] },
                { sentence: { en: "I have now ____ the assignment.", vi: "Em hiện đã ____ bài tập." }, missing_word: 'completed', options: ['completed', 'complete', 'completing'] }
            ],
            find_error: [
                { sentence: { en: 'I am writing to apologize of the delay.', vi: 'Em viết thư để xin lỗi về sự chậm trễ.' }, error_word: 'of', correct_word: 'for' },
                { sentence: { en: 'I take full responsible for the mistake.', vi: 'Em chịu hoàn toàn trách nhiệm về lỗi lầm.' }, error_word: 'responsible', correct_word: 'responsibility' },
                { sentence: { en: 'I had an unexpected family emergency that required my immediate attention.', vi: 'Em đã có một việc gia đình đột xuất cần sự có mặt ngay lập tức của em.' }, error_word: 'unexpected', correct_word: 'unexpected' },
                { sentence: { en: 'I hope you will understand my situation and still consider my submission.', vi: 'Em hy vọng thầy sẽ thông cảm cho hoàn cảnh của em và vẫn xem xét bài nộp của em.' }, error_word: 'consider', correct_word: 'consider' },
                { sentence: { en: 'I have now completed the assignment and attached it to this email.', vi: 'Em hiện đã hoàn thành bài tập và đính kèm trong email này.' }, error_word: 'attached', correct_word: 'attached' }
            ],
            choose_phrase: [
                { 
                    sentence: { en: "I am writing to ____ apologize for the delay.", vi: "Em viết thư để ____ xin lỗi về sự chậm trễ." }, 
                    correct_phrase: "sincerely", 
                    options: ["sincerely", "sincere", "sincerity"] 
                },
                { 
                    sentence: { en: "I take full ____ for not meeting the deadline.", vi: "Em chịu hoàn toàn ____ vì không tuân thủ hạn chót." }, 
                    correct_phrase: "responsibility", 
                    options: ["responsibility", "responsible", "respond"] 
                },
                { 
                    sentence: { en: "I had an ____ family emergency.", vi: "Em đã có một việc gia đình ____." }, 
                    correct_phrase: "unexpected", 
                    options: ["unexpected", "expected", "expecting"] 
                },
                { 
                    sentence: { en: "I hope you will ____ my situation.", vi: "Em hy vọng thầy sẽ ____ hoàn cảnh của em." }, 
                    correct_phrase: "understand", 
                    options: ["understand", "understanding", "understood"] 
                },
                { 
                    sentence: { en: "I have now ____ the assignment.", vi: "Em hiện đã ____ bài tập." }, 
                    correct_phrase: "completed", 
                    options: ["completed", "complete", "completing"] 
                }
            ],
            matching: [
                { 
                    col_a: [
                        { en: "sincerely apologize", vi: "chân thành xin lỗi" },
                        { en: "take full responsibility", vi: "chịu hoàn toàn trách nhiệm" },
                        { en: "unexpected emergency", vi: "tình huống khẩn cấp bất ngờ" },
                        { en: "deadline", vi: "hạn chót" },
                        { en: "assignment", vi: "bài tập" }
                    ],
                    col_b: [
                        { en: "chân thành xin lỗi", vi: "sincerely apologize" },
                        { en: "chịu hoàn toàn trách nhiệm", vi: "take full responsibility" },
                        { en: "tình huống khẩn cấp bất ngờ", vi: "unexpected emergency" },
                        { en: "hạn chót", vi: "deadline" },
                        { en: "bài tập", vi: "assignment" }
                    ],
                    correct_pairs: [
                        { key: "sincerely apologize", value: "chân thành xin lỗi" },
                        { key: "take full responsibility", value: "chịu hoàn toàn trách nhiệm" },
                        { key: "unexpected emergency", value: "tình huống khẩn cấp bất ngờ" },
                        { key: "deadline", value: "hạn chót" },
                        { key: "assignment", value: "bài tập" }
                    ]
                }
            ],
            drag_drop: [
                { 
                    parts: [
                        { en: "I am writing to", vi: "Em viết thư để" },
                        { en: "sincerely apologize", vi: "chân thành xin lỗi" },
                        { en: "for the late submission", vi: "vì việc nộp bài muộn" },
                        { en: "of my essay.", vi: "của bài luận của em." }
                    ],
                    correct_order: ["I am writing to", "sincerely apologize", "for the late submission", "of my essay."]
                },
                { 
                    parts: [
                        { en: "I take full responsibility", vi: "Em chịu hoàn toàn trách nhiệm" },
                        { en: "for not meeting", vi: "vì không tuân thủ" },
                        { en: "the deadline", vi: "hạn chót" },
                        { en: "last Friday.", vi: "thứ Sáu tuần trước." }
                    ],
                    correct_order: ["I take full responsibility", "for not meeting", "the deadline", "last Friday."]
                },
                { 
                    parts: [
                        { en: "I had an unexpected", vi: "Em đã có một" },
                        { en: "family emergency", vi: "việc gia đình đột xuất" },
                        { en: "that required", vi: "cần" },
                        { en: "my immediate attention.", vi: "sự có mặt ngay lập tức của em." }
                    ],
                    correct_order: ["I had an unexpected", "family emergency", "that required", "my immediate attention."]
                },
                { 
                    parts: [
                        { en: "I have now completed", vi: "Em hiện đã hoàn thành" },
                        { en: "the assignment", vi: "bài tập" },
                        { en: "and attached it", vi: "và đính kèm nó" },
                        { en: "to this email.", vi: "trong email này." }
                    ],
                    correct_order: ["I have now completed", "the assignment", "and attached it", "to this email."]
                },
                { 
                    parts: [
                        { en: "I hope you will", vi: "Em hy vọng thầy sẽ" },
                        { en: "understand my situation", vi: "thông cảm cho hoàn cảnh của em" },
                        { en: "and still consider", vi: "và vẫn xem xét" },
                        { en: "my submission.", vi: "bài nộp của em." }
                    ],
                    correct_order: ["I hope you will", "understand my situation", "and still consider", "my submission."]
                }
            ]
        } 
    },
    'VSTEP-T1-REQ-01': {
        sample_answer_en: "Dear Mr. Johnson,\n\nI am writing to request a letter of recommendation for my MBA application.\n\nI worked under your supervision as a Marketing Analyst at ABC Company from 2021 to 2023. I successfully led three campaigns that increased client engagement by 40%.\n\nI would be grateful if you could provide a recommendation highlighting my analytical skills. The deadline is March 15th.\n\nThank you for your consideration.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Ông Johnson,\n\nTôi viết thư để yêu cầu thư giới thiệu cho đơn ứng tuyển MBA.\n\nTôi làm việc dưới sự giám sát của ông với vai trò Chuyên viên Marketing tại ABC từ 2021-2023. Tôi dẫn dắt thành công ba chiến dịch tăng tương tác khách hàng 40%.\n\nTôi sẽ biết ơn nếu ông cung cấp thư giới thiệu nêu bật kỹ năng phân tích của tôi. Hạn nộp là 15/3.\n\nCảm ơn ông đã xem xét.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Formal greeting\n2. State purpose\n3. Provide context\n4. Highlight achievements\n5. Specific request\n6. Mention deadline\n7. Thank and close",
        sample_outline_vi: "1. Chào hỏi trang trọng\n2. Nêu mục đích\n3. Cung cấp bối cảnh\n4. Nêu bật thành tích\n5. Yêu cầu cụ thể\n6. Đề cập deadline\n7. Cảm ơn và kết thư",
        vocabulary: [
            { word: 'recommendation', ipa: '/ˌrekəmenˈdeɪʃn/', pos: 'n.', vi: 'thư giới thiệu' },
            { word: 'supervision', ipa: '/ˌsuːpəˈvɪʒn/', pos: 'n.', vi: 'sự giám sát' },
            { word: 'analytical skills', ipa: '/ˌænəˈlɪtɪkl skɪlz/', pos: 'n.', vi: 'kỹ năng phân tích' }
        ],
        practice: {
            reorder: [
                { words: [{en:"I", vi:"Tôi"}, {en:"would", vi:"sẽ"}, {en:"be", vi:"rất"}, {en:"grateful.", vi:"biết ơn."}], answer: "I would be grateful." },
                { words: [{en:"I", vi:"Tôi"}, {en:"am", vi:"đang"}, {en:"writing", vi:"viết"}, {en:"to", vi:"để"}, {en:"request", vi:"yêu cầu"}, {en:"a", vi:"một"}, {en:"letter.", vi:"thư."}], answer: "I am writing to request a letter." }
            ],
            fill_blank: [
                { sentence: { en: "I am writing to ____ a letter of recommendation.", vi: "Tôi viết thư để ____ thư giới thiệu." }, missing_word: 'request', options: ['request', 'require', 'receive'] },
                { sentence: { en: "I worked under your ____ as a Marketing Analyst.", vi: "Tôi làm việc dưới sự ____ của ông với vai trò Chuyên viên Marketing." }, missing_word: 'supervision', options: ['supervision', 'supervise', 'supervisor'] }
            ],
            find_error: [
                { sentence: { en: 'I am writing to request a letter of recommendation for my MBA application.', vi: 'Tôi viết thư để yêu cầu thư giới thiệu cho đơn ứng tuyển MBA.' }, error_word: 'recommendation', correct_word: 'recommendation' },
                { sentence: { en: 'I would be grateful if you could provide a recommendation highlighting my analytical skill.', vi: 'Tôi sẽ biết ơn nếu ông cung cấp thư giới thiệu nêu bật kỹ năng phân tích của tôi.' }, error_word: 'skill', correct_word: 'skills' }
            ],
            choose_phrase: [
                { 
                    sentence: { en: "I am writing to ____ a letter of recommendation.", vi: "Tôi viết thư để ____ thư giới thiệu." }, 
                    correct_phrase: "request", 
                    options: ["request", "require", "receive"] 
                },
                { 
                    sentence: { en: "I would be ____ if you could provide a recommendation.", vi: "Tôi sẽ ____ nếu ông cung cấp thư giới thiệu." }, 
                    correct_phrase: "grateful", 
                    options: ["grateful", "great", "grate"] 
                }
            ],
            matching: [
                { 
                    col_a: [{en:"recommendation", vi:"thư giới thiệu"}, {en:"supervision", vi:"sự giám sát"}], 
                    col_b: [{en:"thư giới thiệu", vi:"recommendation"}, {en:"sự giám sát", vi:"supervision"}],
                    correct_pairs: [
                        { key: "recommendation", value: "thư giới thiệu" },
                        { key: "supervision", value: "sự giám sát" }
                    ]
                }
            ],
            drag_drop: [
                { 
                    sentence_parts: [
                        { en: "I am writing to request", vi: "Tôi viết thư để yêu cầu" },
                        { en: "a letter of recommendation", vi: "thư giới thiệu" },
                        { en: "for my MBA application.", vi: "cho đơn ứng tuyển MBA." }
                    ],
                    correct_order: ["I am writing to request", "a letter of recommendation", "for my MBA application."]
                }
            ]
        }
    },
    'VSTEP-T1-CMP-01': {
        sample_answer_en: "Dear Customer Service Manager,\n\nI am writing to express my dissatisfaction with a laptop I purchased from your store on January 15th (Order #12345).\n\nThe laptop stopped working after only three days. The screen goes black randomly, and the battery does not hold a charge. This is clearly a manufacturing defect.\n\nI would like a full refund as the product is not fit for purpose. I have attached the receipt and photos.\n\nI look forward to your prompt response.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Quản lý Chăm sóc Khách hàng,\n\nTôi viết thư để bày tỏ sự không hài lòng về laptop tôi mua từ cửa hàng ngày 15/1 (Đơn #12345).\n\nLaptop ngừng hoạt động chỉ sau ba ngày. Màn hình tối đen ngẫu nhiên và pin không giữ được điện. Đây rõ ràng là lỗi sản xuất.\n\nTôi muốn được hoàn tiền đầy đủ vì sản phẩm không phù hợp. Tôi đã đính kèm hóa đơn và ảnh.\n\nTôi mong nhận được phản hồi nhanh chóng.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Formal greeting\n2. State complaint\n3. Purchase details\n4. Describe problem\n5. Request refund\n6. Mention documents\n7. Professional closing",
        sample_outline_vi: "1. Chào trang trọng\n2. Nêu khiếu nại\n3. Chi tiết mua hàng\n4. Mô tả vấn đề\n5. Yêu cầu hoàn tiền\n6. Đề cập tài liệu\n7. Kết thư chuyên nghiệp",
        vocabulary: [
            { word: 'dissatisfaction', ipa: '/ˌdɪssætɪsˈfækʃn/', pos: 'n.', vi: 'sự không hài lòng' },
            { word: 'manufacturing defect', ipa: '/ˌmænjʊˈfæktʃərɪŋ ˈdiːfekt/', pos: 'n.', vi: 'lỗi sản xuất' },
            { word: 'full refund', ipa: '/fʊl ˈriːfʌnd/', pos: 'n.', vi: 'hoàn tiền đầy đủ' }
        ],
        practice: {
            reorder: [
                { words: [{en:"I", vi:"Tôi"}, {en:"am", vi:"đang"}, {en:"writing", vi:"viết"}, {en:"to", vi:"để"}, {en:"complain", vi:"phàn nàn"}, {en:"about", vi:"về"}, {en:"the", vi:"sản phẩm"}, {en:"product.", vi:"lỗi."}], answer: "I am writing to complain about the product." },
                { words: [{en:"I", vi:"Tôi"}, {en:"would", vi:"muốn"}, {en:"like", vi:"được"}, {en:"a", vi:"một"}, {en:"full", vi:"hoàn tiền"}, {en:"refund.", vi:"đầy đủ."}], answer: "I would like a full refund." }
            ],
            fill_blank: [
                { sentence: { en: "I would like a ____ refund.", vi: "Tôi muốn được ____ tiền đầy đủ." }, missing_word: 'full', options: ['full', 'partial', 'quick'] },
                { sentence: { en: "This is clearly a manufacturing ____.", vi: "Đây rõ ràng là ____ sản xuất." }, missing_word: 'defect', options: ['defect', 'effect', 'affect'] }
            ],
            find_error: [
                { sentence: { en: 'I am writing to complain of the faulty product.', vi: 'Tôi viết để phàn nàn về sản phẩm lỗi.' }, error_word: 'of', correct_word: 'about' },
                { sentence: { en: 'I would like a full refund as the product is not fit for purpose.', vi: 'Tôi muốn được hoàn tiền đầy đủ vì sản phẩm không phù hợp.' }, error_word: 'purpose', correct_word: 'purpose' }
            ],
            choose_phrase: [
                { 
                    sentence: { en: "I am writing to express my ____ with the product.", vi: "Tôi viết thư để bày tỏ ____ về sản phẩm." }, 
                    correct_phrase: "dissatisfaction", 
                    options: ["dissatisfaction", "satisfaction", "satisfied"] 
                },
                { 
                    sentence: { en: "I would like a ____ refund.", vi: "Tôi muốn được ____ tiền đầy đủ." }, 
                    correct_phrase: "full", 
                    options: ["full", "partial", "quick"] 
                }
            ],
            matching: [
                { 
                    col_a: [{en:"dissatisfaction", vi:"sự không hài lòng"}, {en:"refund", vi:"hoàn tiền"}], 
                    col_b: [{en:"sự không hài lòng", vi:"dissatisfaction"}, {en:"hoàn tiền", vi:"refund"}],
                    correct_pairs: [
                        { key: "dissatisfaction", value: "sự không hài lòng" },
                        { key: "refund", value: "hoàn tiền" }
                    ]
                }
            ],
            drag_drop: [
                { 
                    sentence_parts: [
                        { en: "I am writing to express", vi: "Tôi viết thư để bày tỏ" },
                        { en: "my dissatisfaction", vi: "sự không hài lòng" },
                        { en: "with a laptop.", vi: "về laptop." }
                    ],
                    correct_order: ["I am writing to express", "my dissatisfaction", "with a laptop."]
                }
            ]
        }
    },
    // Additional complaint scenarios (5 total)
    'VSTEP-T1-CMP-02': {
        sample_answer_en: "Dear Customer Service,\n\nI am writing to complain about a delayed delivery for my order #56789. It was promised by September 5 but arrived a week late.\n\nThis delay caused inconvenience to my work. I would like an expedited delivery fee refund.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Bộ phận CSKH,\n\nTôi viết thư để phàn nàn về giao hàng trễ cho đơn #56789. Đơn hứa giao ngày 5/9 nhưng đến muộn một tuần.\n\nSự chậm trễ này gây bất tiện cho công việc của tôi. Tôi muốn được hoàn phí giao hàng nhanh.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Greeting 2. State delay 3. Promised date 4. Impact 5. Request fee refund 6. Closing",
        sample_outline_vi: "1. Chào 2. Nêu chậm trễ 3. Ngày hứa 4. Ảnh hưởng 5. Yêu cầu hoàn phí 6. Kết",
        vocabulary: [
            { word: 'delayed delivery', ipa: '', pos: 'n.', vi: 'giao hàng trễ' },
            { word: 'refund', ipa: '', pos: 'n.', vi: 'hoàn tiền' }
        ],
        practice: {
            reorder: [
                { words: [{en:"I",vi:"Tôi"},{en:"am",vi:"đang"},{en:"writing",vi:"viết"},{en:"to",vi:"để"},{en:"complain",vi:"phàn nàn"},{en:"about",vi:"về"},{en:"a",vi:"việc"},{en:"delayed",vi:"giao"},{en:"delivery.",vi:"trễ."}], answer: "I am writing to complain about a delayed delivery." },
                { words: [{en:"Please",vi:"Vui lòng"},{en:"refund",vi:"hoàn"},{en:"the",vi:"phí"},{en:"delivery",vi:"giao hàng"},{en:"fee.",vi:"giúp tôi."}], answer: "Please refund the delivery fee." }
            ]
        }
    },
    'VSTEP-T1-CMP-03': {
        sample_answer_en: "Dear Manager,\n\nI experienced poor customer service at your store on September 20 at 5 PM. The staff was unhelpful and rude.\n\nI would like an official apology and staff retraining to prevent this from happening again.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Quản lý,\n\nTôi gặp dịch vụ khách hàng kém tại cửa hàng vào 20/9 lúc 17h. Nhân viên không hỗ trợ và thô lỗ.\n\nTôi mong nhận được lời xin lỗi chính thức và đào tạo lại nhân viên để tránh tái diễn.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Greeting 2. Date/time 3. Description 4. Request apology 5. Training 6. Closing",
        sample_outline_vi: "1. Chào 2. Ngày/giờ 3. Mô tả 4. Xin lỗi 5. Đào tạo lại 6. Kết",
        vocabulary: [
            { word: 'poor service', ipa: '', pos: 'n.', vi: 'dịch vụ kém' },
            { word: 'apology', ipa: '', pos: 'n.', vi: 'lời xin lỗi' }
        ],
        practice: {
            reorder: [
                { words: [{en:"I",vi:"Tôi"},{en:"am",vi:"đang"},{en:"writing",vi:"viết"},{en:"to",vi:"để"},{en:"complain",vi:"phàn nàn"},{en:"about",vi:"về"},{en:"poor",vi:"dịch vụ"},{en:"service.",vi:"kém."}], answer: "I am writing to complain about poor service." },
                { words: [{en:"I",vi:"Tôi"},{en:"would",vi:"muốn"},{en:"like",vi:"có"},{en:"an",vi:"một"},{en:"official",vi:"lời"},{en:"apology.",vi:"xin lỗi chính thức."}], answer: "I would like an official apology." }
            ]
        }
    },
    'VSTEP-T1-CMP-04': {
        sample_answer_en: "Dear Billing Department,\n\nThere is an incorrect charge on my invoice. I was billed for items I did not purchase.\n\nPlease issue a corrected invoice and refund the overcharge.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Bộ phận Hóa đơn,\n\nCó khoản phí sai trên hóa đơn của tôi. Tôi bị tính tiền cho mặt hàng không mua.\n\nVui lòng xuất hóa đơn điều chỉnh và hoàn khoản thu thừa.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Greeting 2. Describe wrong billing 3. Evidence 4. Request correction & refund",
        sample_outline_vi: "1. Chào 2. Mô tả sai hóa đơn 3. Bằng chứng 4. Yêu cầu điều chỉnh & hoàn tiền",
        vocabulary: [
            { word: 'overcharge', ipa: '', pos: 'n.', vi: 'thu thừa' },
            { word: 'corrected invoice', ipa: '', pos: 'n.', vi: 'hóa đơn điều chỉnh' }
        ],
        practice: {
            reorder: [
                { words: [{en:"There",vi:"Có"},{en:"is",vi:"một"},{en:"an",vi:"khoản"},{en:"incorrect",vi:"phí"},{en:"charge",vi:"sai"},{en:"on",vi:"trên"},{en:"my",vi:"hóa đơn"},{en:"invoice.",vi:"của tôi."}], answer: "There is an incorrect charge on my invoice." },
                { words: [{en:"Please",vi:"Vui lòng"},{en:"issue",vi:"xuất"},{en:"a",vi:"một"},{en:"corrected",vi:"hóa đơn"},{en:"invoice.",vi:"điều chỉnh."}], answer: "Please issue a corrected invoice." }
            ]
        }
    },
    'VSTEP-T1-CMP-05': {
        sample_answer_en: "Dear Support Team,\n\nThe item I received arrived damaged with scratches and dents.\n\nI would like a replacement at no extra cost and instructions for returning the damaged item.\n\nSincerely,\n[Your Name]",
        sample_answer_vi: "Kính gửi Bộ phận Hỗ trợ,\n\nMón hàng tôi nhận bị hư hỏng, có vết trầy xước và móp méo.\n\nTôi muốn được đổi sản phẩm miễn phí và hướng dẫn trả hàng lỗi.\n\nTrân trọng,\n[Tên của bạn]",
        sample_outline_en: "1. Greeting 2. Describe damage 3. Evidence 4. Request replacement 5. Return steps",
        sample_outline_vi: "1. Chào 2. Mô tả hư hỏng 3. Bằng chứng 4. Yêu cầu đổi hàng 5. Cách trả hàng",
        vocabulary: [
            { word: 'damaged item', ipa: '', pos: 'n.', vi: 'hàng hư hỏng' },
            { word: 'replacement', ipa: '', pos: 'n.', vi: 'đổi hàng' }
        ],
        practice: {
            reorder: [
                { words: [{en:"The",vi:"Món"},{en:"item",vi:"hàng"},{en:"arrived",vi:"đến"},{en:"damaged.",vi:"bị hư hỏng."}], answer: "The item arrived damaged." },
                { words: [{en:"I",vi:"Tôi"},{en:"would",vi:"muốn"},{en:"like",vi:"được"},{en:"a",vi:"một"},{en:"replacement.",vi:"sản phẩm thay thế."}], answer: "I would like a replacement." }
            ]
        }
    },
    'VSTEP-T1-INV-01': {
        sample_answer_en: "Hi Sarah,\n\nI hope you're doing well! I'm writing to invite you to my birthday party next Saturday, March 20th at 7 PM.\n\nWe're having it at my place (123 Main Street). There will be food, drinks, music, and lots of fun! I'd love to celebrate with you.\n\nPlease let me know if you can make it by Thursday. I really hope you can come!\n\nLooking forward to seeing you,\n[Your Name]",
        sample_answer_vi: "Chào Sarah,\n\nMình hy vọng bạn đang khỏe! Mình viết thư để mời bạn đến tiệc sinh nhật của mình thứ Bảy tới, 20/3 lúc 7 giờ tối.\n\nChúng mình sẽ tổ chức tại nhà mình (123 Đường Chính). Sẽ có đồ ăn, nước uống, nhạc và rất nhiều niềm vui! Mình rất muốn được ăn mừng cùng bạn.\n\nHãy cho mình biết nếu bạn có thể đến trước thứ Năm. Mình thực sự hy vọng bạn có thể đến!\n\nMong được gặp bạn,\n[Tên của bạn]",
        sample_outline_en: "1. Informal greeting\n2. State purpose (invitation)\n3. Event details (date, time, place)\n4. What to expect (food, drinks, fun)\n5. Personal touch (want to celebrate together)\n6. RSVP request\n7. Enthusiastic closing",
        sample_outline_vi: "1. Chào hỏi thân mật\n2. Nêu mục đích (lời mời)\n3. Chi tiết sự kiện (ngày, giờ, địa điểm)\n4. Những gì sẽ có (đồ ăn, nước uống, vui vẻ)\n5. Cá nhân hóa (muốn ăn mừng cùng nhau)\n6. Yêu cầu xác nhận\n7. Kết thư nhiệt tình",
        vocabulary: [
            { word: 'invite', ipa: '/ɪnˈvaɪt/', pos: 'v.', vi: 'mời' },
            { word: 'celebrate', ipa: '/ˈseləbreɪt/', pos: 'v.', vi: 'ăn mừng, kỷ niệm' },
            { word: 'RSVP', ipa: '/ˌɑːr es viː ˈpiː/', pos: 'n.', vi: 'xin xác nhận tham dự' }
        ],
        practice: {
            reorder: [
                { words: [{en:"I'm", vi:"Mình"}, {en:"writing", vi:"đang viết"}, {en:"to", vi:"để"}, {en:"invite", vi:"mời"}, {en:"you.", vi:"bạn."}], answer: "I'm writing to invite you." },
                { words: [{en:"I", vi:"Mình"}, {en:"hope", vi:"hy vọng"}, {en:"you", vi:"bạn"}, {en:"can", vi:"có thể"}, {en:"come.", vi:"đến."}], answer: "I hope you can come." }
            ],
            fill_blank: [
                { sentence: { en: "I'm writing to ____ you to my birthday party.", vi: "Mình viết thư để ____ bạn đến tiệc sinh nhật của mình." }, missing_word: 'invite', options: ['invite', 'invitation', 'inviting'] },
                { sentence: { en: "I'd love to ____ with you.", vi: "Mình rất muốn được ____ cùng bạn." }, missing_word: 'celebrate', options: ['celebrate', 'celebration', 'celebrating'] }
            ],
            find_error: [
                { sentence: { en: 'I hope your doing well!', vi: 'Mình hy vọng bạn đang khỏe!' }, error_word: 'your', correct_word: "you're" },
                { sentence: { en: 'Please let me know if you can make it by Thursday.', vi: 'Hãy cho mình biết nếu bạn có thể đến trước thứ Năm.' }, error_word: 'Thursday', correct_word: 'Thursday' }
            ],
            choose_phrase: [
                { 
                    sentence: { en: "I'm writing to ____ you to my birthday party.", vi: "Mình viết thư để ____ bạn đến tiệc sinh nhật của mình." }, 
                    correct_phrase: "invite", 
                    options: ["invite", "invitation", "inviting"] 
                },
                { 
                    sentence: { en: "I'd love to ____ with you.", vi: "Mình rất muốn được ____ cùng bạn." }, 
                    correct_phrase: "celebrate", 
                    options: ["celebrate", "celebration", "celebrating"] 
                }
            ],
            matching: [
                { 
                    col_a: [{en:"invite", vi:"mời"}, {en:"celebrate", vi:"ăn mừng"}], 
                    col_b: [{en:"mời", vi:"invite"}, {en:"ăn mừng", vi:"celebrate"}],
                    correct_pairs: [
                        { key: "invite", value: "mời" },
                        { key: "celebrate", value: "ăn mừng" }
                    ]
                }
            ],
            drag_drop: [
                { 
                    sentence_parts: [
                        { en: "I'm writing to", vi: "Mình viết thư để" },
                        { en: "invite you", vi: "mời bạn" },
                        { en: "to my birthday party next Saturday.", vi: "đến tiệc sinh nhật thứ Bảy tới." }
                    ],
                    correct_order: ["I'm writing to", "invite you", "to my birthday party next Saturday."]
                }
            ]
        }
    },
    'VSTEP-T1-ADV-01': { /* Placeholder content */ },
    'VSTEP-T1-APP-01': { /* Placeholder content */ }
};
